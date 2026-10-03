---
layout: post
title: Why or what even is CXL?
tags:
  - computer architecture
  - cxl
description: Understanding Compute Express Link (CXL) and why it matters for modern systems
---
-- [Shri Vishakh Devanand](https://5iri.me)

Everyone working on modern AI eventually hits the HBM wall. A 70B-parameter model stored in bfloat16 is already ~140 GB before optimizer states and activation checkpoints; even eight 80 GB H100s have to shard weights, replay activations, or spill tensors back to host memory. CXL entered the datacenter conversation because it lets those GPUs, CPUs, and specialized accelerators tap into coherent pools of cheaper DDR or storage-class memory without rewriting the entire training stack.

Compute Express Link (CXL) is an open industry standard for high-speed, coherent interconnects between CPUs and devices such as accelerators, memory expansion modules, and smart NICs. It builds on the physical and electrical layer of PCI Express but adds protocols and memory coherence models that let devices and processors share memory more efficiently and with lower software complexity.

## Why CXL matters

1. **AI-scale memory sharing:** Model weights, KV caches, and optimizer states can live in shared pools instead of being replicated per GPU, so you can train or serve models larger than on-package HBM allows while keeping latency predictable.
2. **Memory disaggregation and pooling:** CXL enables systems to attach large pools of memory that can be accessed coherently by CPUs and accelerators, reducing dataset duplication and allowing memory to scale independently of CPU sockets.
3. **Lower software complexity:** By providing hardware-managed coherence (via CXL.cache and CXL.mem), devices can access host memory with simpler drivers and fewer explicit copies; frameworks see CXL-attached memory as another NUMA node instead of a bespoke PCIe device.
4. **Improved accelerator efficiency:** ML accelerators, FPGAs, and other devices benefit from lower-latency access to shared weights and datasets without expensive DMA choreography, which translates directly to higher utilization for GPU clusters.

## CXL architecture (high level)

CXL defines three protocol subtypes on top of the PCIe physical layer:

- **CXL.io** — Standard PCIe-style I/O and device configuration.
- **CXL.cache** — Cache-coherent access where an accelerator can cache host memory lines while maintaining coherence with CPU caches.
- **CXL.mem** — Allows devices to expose or consume memory regions as addressable memory with coherence semantics (useful for memory expanders and pooling).

Different device types pick the model that fits their needs: accelerators often use CXL.cache for tight, low-latency access; memory expanders or pooled memory use CXL.mem.

## Advantages in depth

CXL's design unlocks several powerful capabilities that traditional PCIe-only interconnects cannot match:

1. **True cache coherence across heterogeneous devices**  
   Unlike plain PCIe, CXL.cache lets accelerators cache host memory lines while the CPU's coherence protocol keeps everything in sync. This eliminates explicit flush/invalidate sequences and dramatically simplifies driver logic. For LLM inference, that means shared tokenizer tables, embeddings, or KV caches stay consistent across GPUs and CPUs without explicit synchronization.

2. **Memory tiering without application changes**  
   With CXL.mem, an OS can expose attached CXL memory as another NUMA (Non-Uniform Memory Access) node. Applications gain access to expanded capacity without code modifications; the kernel and hardware handle data placement and migration transparently. PyTorch or JAX simply allocates larger tensors, and OS policies place colder activations or optimizer states on the CXL tier.

3. **Composable and disaggregated infrastructure**  
   Datacenters can provision memory pools independently of compute, enabling pay-as-you-grow memory scaling and higher overall utilization. Memory can be dynamically assigned to workloads that need it most, so the same rack can run retrieval-augmented inference in the morning and long-context training at night without swapping hardware.

4. **Lower total cost of ownership (TCO)**  
   Because memory can be shared and pooled, organizations can avoid over-provisioning DRAM on every server. Combined with longer memory lifespans (memory outlasts CPUs), TCO for memory-heavy workloads drops. AI teams can stop buying GPU nodes just to gain extra host RAM for embeddings or vector stores.

5. **Reduced data movement and copy overhead**  
   Coherent shared memory means accelerators and CPUs can operate on the same buffers. This cuts PCIe DMA traffic, lowers latency, and frees CPU cycles previously spent marshalling data. For generative AI, that translates to lower token latency because preprocessing, decoding, and post-processing touch the same tensor buffers.

6. **Simplified programming models**  
   Developers can treat CXL-attached memory almost like local RAM. Pointer-based data structures, memory-mapped files, and standard allocation APIs work without device-specific APIs or bounce buffers. Framework authors can start by exposing `torch.cuda.CXLMemory` or NUMA-aware allocators instead of reinventing host-to-device staging buffers.

## How CXL actually works

### Protocol stack

CXL reuses the PCIe 5.0/6.0 physical lanes, link training, and flow control, but layers three coherency-aware protocols on top. `CXL.io` mirrors PCIe config space so the OS can enumerate devices. `CXL.cache` lets a device participate in the host's MESI-like coherence protocol, keeping accelerator caches in sync with CPU caches. `CXL.mem` defines load/store transactions for memory exposed by a device or consumed from the host, allowing memory expanders to appear as part of the system's physical address space.

<figure class="diagram" style="text-align: center;">
  <picture>
    <source srcset="{{ '/assets/posts/cxl/cxl-protocol-stack-dark.svg' | relative_url }}" media="(prefers-color-scheme: dark)" />
    <img src="{{ '/assets/posts/cxl/cxl-protocol-stack.svg' | relative_url }}" alt="Layered view of PCIe physical layer with CXL.io, CXL.cache, and CXL.mem" style="" />
  </picture>
  <figcaption style="text-align: center; margin-top: 0.5em;">PCIe physical lanes form the base, while CXL.io, CXL.cache, and CXL.mem stack above to add discovery, coherence, and pooled memory semantics.</figcaption>
</figure>

### Memory semantics and tiering

When a CXL.mem device registers regions with the host, firmware publishes ACPI CEDT/HMAT tables describing size, latency, and bandwidth. Linux maps those ranges as another NUMA node, so `malloc`, `numactl`, or kernel memory tiering policies can place pages on the far tier transparently. Because the CPU issues ordinary load/store operations, applications do not need DMA engines or bounce buffers to use the pooled memory.

<figure class="diagram" style="text-align: center;">
  <picture>
    <source srcset="{{ '/assets/posts/cxl/memory-tiering-heatmap-dark.svg' | relative_url }}" media="(prefers-color-scheme: dark)" />
    <img src="{{ '/assets/posts/cxl/memory-tiering-heatmap.svg' | relative_url }}" alt="HBM, local DDR5, and CXL memory tiers with latency annotations" style="max-width: 100%; height: auto; margin: 0 auto; display: block;" />
  </picture>
  <figcaption style="text-align: center; margin-top: 0.5em;">HBM, local DDR5, and CXL.mem NUMA nodes form a latency-aware pyramid so operating systems can place hot, warm, and cold AI tensors appropriately.</figcaption>
</figure>

### Coherent accelerators

Accelerators using CXL.cache maintain a tag directory for host cache lines. Writes made by the device send invalidations to the CPU's coherence agent; likewise, CPU writes trigger snoops to the accelerator, ensuring tokenizer tables, KV caches, or embeddings stay coherent across GPUs and CPUs. That coherence eliminates explicit flush/invalidate sequences that normally complicate GPU driver code.

<figure class="diagram" style="text-align: center;">
  <picture>
    <source srcset="{{ '/assets/posts/cxl/cxl-coherence-flow-dark.svg' | relative_url }}" media="(prefers-color-scheme: dark)" />
    <img src="{{ '/assets/posts/cxl/cxl-coherence-flow.svg' | relative_url }}" alt="CPU cache and accelerator cache exchanging snoop requests via CXL" style="max-width: 100%; height: auto; margin: 0 auto; display: block;" />
  </picture>
  <figcaption style="text-align: center; margin-top: 0.5em;">Bidirectional snoops keep accelerator caches and CPU caches coherent so shared embeddings and KV caches stay consistent.</figcaption>
</figure>

### Disaggregation and pooling

CXL 2.0 added switching so multiple hosts can share a pool of memory sleds. A rack-level switch accepts Fabric Manager commands to carve memory regions per host, effectively letting schedulers assign 256 GB or several terabytes of pooled DDR to a job without power-cycling servers. Because the pool is byte-addressable and coherent, GPUs across different hosts can operate on the same shared dataset.

<figure class="diagram" style="text-align: center;">
  <picture>
    <source srcset="{{ '/assets/posts/cxl/cxl-pooled-topology-dark.svg' | relative_url }}" media="(prefers-color-scheme: dark)" />
    <img src="{{ '/assets/posts/cxl/cxl-pooled-topology.svg' | relative_url }}" alt="CXL switch connecting multiple hosts to memory sleds" style="max-width: 100%; height: auto; margin: 0 auto; display: block;" />
  </picture>
  <figcaption style="text-align: center; margin-top: 0.5em;">Multiple hosts fan into a shared CXL switch, which exposes disaggregated memory sleds that the fabric manager slices per workload.</figcaption>
</figure>

### Latency and bandwidth profile

Typical PCIe 5.0 x8 CXL links deliver ~32 GB/s per direction with roughly 80–100 ns more latency than local DDR. That is slower than on-package HBM but dramatically faster than NVMe or network storage, so frameworks can keep activations in HBM, warm tensors in local DDR, and colder parameters or KV caches on the CXL tier while preserving sub-microsecond access times.

<figure class="diagram" style="text-align: center;">
  <picture>
    <source srcset="{{ '/assets/posts/cxl/cxl-latency-bandwidth-dark.svg' | relative_url }}" media="(prefers-color-scheme: dark)" />
    <img src="{{ '/assets/posts/cxl/cxl-latency-bandwidth.svg' | relative_url }}" alt="Latency bars and bandwidth line for HBM, DDR5, CXL, NVMe, and network storage" style="max-width: 100%; height: auto; margin: 0 auto; display: block;" />
  </picture>
  <figcaption style="text-align: center; margin-top: 0.5em;">Compared to NVMe or network storage, CXL memory adds modest latency versus DDR yet preserves significantly higher throughput than storage tiers.</figcaption>
</figure>

### Reliability and security

CXL devices inherit PCIe link-level CRC plus support ECC, patrol scrubbing, and poison handling for attached memory. CXL 3.0 adds Integrity and Data Encryption (IDE) over the fabric so pooled memory shared across tenants is protected in flight. When a device detects an error, it can poison a line and notify the host to quarantine or migrate workloads rather than crashing the node.

<figure class="diagram" style="text-align: center;">
  <picture>
    <source srcset="{{ '/assets/posts/cxl/cxl-ras-dark.svg' | relative_url }}" media="(prefers-color-scheme: dark)" />
    <img src="{{ '/assets/posts/cxl/cxl-ras.svg' | relative_url }}" alt="CXL fabric protected by ECC, poison handling, and IDE encryption" style="max-width: 100%; height: auto; margin: 0 auto; display: block;" />
  </picture>
  <figcaption style="text-align: center; margin-top: 0.5em;">ECC, poison-handling, and IDE encryption feed into the fabric so operators can scrub errors and migrate workloads before failures cascade.</figcaption>
</figure>

### Software flow from firmware to frameworks

1. BIOS enables CXL downstream ports and publishes capability tables so the OS can discover devices.
2. The Linux `cxl` subsystem enumerates devices, binds `cxl_mem` or `cxl_pci` drivers, and exposes regions via `memremap_pages`, `pmem`, or `dax`.
3. Memory tiering (AutoNUMA, `numactl`, or `memtier`) places pages on appropriate NUMA nodes; container schedulers use cpusets to keep latency-sensitive workloads near the switch.
4. Frameworks such as PyTorch, DeepSpeed, or JAX plug into NUMA hints or unified memory APIs to allocate tensors directly on the CXL tier or to migrate less-active tensors out of HBM.

<figure class="diagram" style="text-align: center;">
  <picture>
    <source srcset="{{ '/assets/posts/cxl/cxl-software-flow-dark.svg' | relative_url }}" media="(prefers-color-scheme: dark)" />
    <img src="{{ '/assets/posts/cxl/cxl-software-flow.svg' | relative_url }}" alt="Software stack from BIOS to Linux CXL drivers to frameworks" style="max-width: 100%; height: auto; margin: 0 auto; display: block;" />
  </picture>
  <figcaption style="text-align: center; margin-top: 0.5em;">Firmware publishes topology tables, Linux surfaces `cxl_mem` regions, memory tiering enforces policies, and AI frameworks consume the resulting NUMA hints.</figcaption>
</figure>

### Concrete AI workflows already benefiting

- **LLM inference:** Store KV caches or embeddings in pooled memory and bring only hot rows into HBM, reducing per-replica memory footprints and improving token latency.
- **Training with sharded optimizers:** ZeRO or Ulysses shards optimizer states; the coldest shards can live on CXL memory because they are accessed less frequently than activations.
- **Mixture-of-experts and retrieval-augmented systems:** Keep inactive expert weights or vector indices in pooled memory; fetch them over CXL when a routing decision selects a new expert while coherence keeps CPU control planes consistent.

<figure class="diagram" style="text-align: center;">
  <picture>
    <source srcset="{{ '/assets/posts/cxl/cxl-ai-workflows-dark.svg' | relative_url }}" media="(prefers-color-scheme: dark)" />
    <img src="{{ '/assets/posts/cxl/cxl-ai-workflows.svg' | relative_url }}" alt="GPU nodes drawing KV caches, optimizer states, and MoE experts from a shared CXL memory pool" style="max-width: 100%; height: auto; margin: 0 auto; display: block;" />
  </picture>
  <figcaption style="text-align: center; margin-top: 0.5em;">GPU clusters fetch KV caches, optimizer shards, and MoE experts from one pooled memory tier instead of replicating data per node.</figcaption>
</figure>

## Yet-to-explore topics and open research

CXL is still maturing, and several areas remain active research or early-stage deployment challenges:

1. **Latency-optimized switching fabrics**  
  CXL switches introduce additional hops. Designing low-latency, high-radix CXL switches that scale to rack or pod level is an ongoing hardware challenge.

2. **Memory pooling protocols and allocation policies**  
  How should an orchestrator decide which host or VM gets which slice of a shared memory pool? Policies for fairness, QoS, and dynamic rebalancing are still being defined.

3. **Security and isolation in shared memory**  
  Ensuring that one tenant cannot observe or corrupt another tenant's data in pooled memory requires robust hardware (encryption, access control) and software (memory tagging, attestation). Standards and best practices are evolving.

4. **Failure domains and resilience**  
  When memory is disaggregated, a CXL device or switch failure can affect multiple hosts. Research into graceful degradation, hot-swap, and redundancy schemes is ongoing.

5. **Software ecosystem maturity**  
  Linux kernel support for CXL is progressing rapidly, but hypervisors, container runtimes, and user-space libraries are catching up. Optimizing NUMA policies, page migration, and memory tiering for CXL topologies is an active area.

6. **Persistent memory over CXL**  
  Combining CXL with non-volatile memory (e.g., CXL-attached storage-class memory) opens new possibilities for fast, byte-addressable persistence, but also raises questions about crash consistency, wear leveling, and software abstractions.

7. **Benchmarking and performance modeling**  
  Standardized benchmarks and simulation frameworks for CXL topologies are still emerging. Accurate models help architects plan deployments and set realistic expectations.

8. **CXL 3.x and beyond**  
  Future CXL revisions promise features like fabric-attached memory, improved switching, and enhanced security. Tracking and preparing for these capabilities is an ongoing effort.

### AI-specific research gaps

- **MoE-aware schedulers:** Mixture-of-experts and retrieval-augmented training need policies that decide which expert weights sit in HBM versus CXL pools, and how to migrate them without stalling tokens.
- **Deterministic execution:** When tensors spill across hosts, frameworks must guarantee determinism for reproducibility and debugging; we still need best practices for checkpointing and replay over a CXL fabric.
- **Telemetry and QoS:** AI workloads are bursty, so operators require fine-grained telemetry (cache hit rates, congestion) and QoS controls to keep inference SLAs predictable while sharing pooled memory.

## Adoption and ecosystem

CXL has strong industry support through the CXL Consortium. Major CPU, accelerator, and server vendors are shipping platforms with CXL support, and the ecosystem of memory expanders and device vendors is growing.

## Practical considerations

1. **Topology and placement:** CXL device latency depends on attachment point and switching; place latency-sensitive devices close to the host.
2. **Compatibility:** CXL devices present `CXL.io` so basic PCIe functionality remains, but full coherence requires firmware and OS support.
3. **Security:** IOMMU and access controls are essential when pooling memory across tenants.

## Outlook

CXL is a foundational enabler for disaggregated, heterogeneous datacenter architectures. As software, firmware, and hardware support matures, expect CXL to make memory and accelerator resources more flexible, easier to manage, and more efficient for large-scale workloads.

Further reading: the CXL Consortium and platform vendor documentation provide technical specifications and implementation guidance.

## Quick checklist for AI teams evaluating CXL

- **Platform readiness:** Verify that your CPU platform (e.g., Intel Sapphire Rapids, AMD Genoa) exposes the required CXL.mem/cache features in firmware and that your accelerators support peer-to-peer transfers over CXL.
- **OS and kernel level:** Run a kernel with the latest CXL subsystem (>= 6.5) plus vendor patches, and enable memory-tiering policies that PyTorch/DeepSpeed can hook into.
- **Framework integration:** Prototype with libraries that understand heterogeneous memory (PyTorch `torch.cuda.memory.set_per_process_memory_fraction`, DeepSpeed Ulysses, JAX sharding) and map their allocators onto CXL NUMA nodes.
- **NUMA and scheduler policy:** Decide how SLURM/Kubernetes place jobs relative to pooled memory and set up control groups or cpuset rules so latency-sensitive inference sits closer to switches.
- **Telemetry and failover:** Add monitoring for CXL bandwidth, switch health, and fabric errors; plan how to evict or migrate workloads when a memory expander fails so that AI services degrade gracefully.
