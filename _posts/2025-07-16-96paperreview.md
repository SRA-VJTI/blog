---
layout : post
title :  Computer Architects From 1996 Look At The Future - Review
tags :
     - Computer Architecture
     - Memory Systems
     - Hardware
description :
 Five architects predict the future - what did they predict and were they right?
---
-- [Mayuresh Surve](https://github.com/amimayo), [Shasvat Prabhu](https://github.com/shashvatprabhu)


# Computer Architects From 1996 Look At The Future : Review

## Introduction

In this special issue from August 1996, SAFARI ETHZ, the prestigious research group of ETH Zurich had asked renowned computer science/architecture and digital design and processor researchers for opinions on the evolution of the microprocessor in the upcoming future. The contents of this paper contain the articles by five computer architects - Gordon Bell, Richard Sites, William Dally, David Ditzel and Yale Patt - in which they talk about
how future computer/processor systems will work and behave, how different they would be from current designs and what technical limitations would future architects have to overcome to build a high-performance processor, while predicting what may come ahead and what technical limitations would future architects have to overcome to build a high-performance processor, while predicting what may come ahead. For anyone like us building subsystems like caches, these insights are important.


## Problems In 1996

By 1996, processors were rapidly developing. However, these astounding progress was being adversely affected by several problems. These emerging issues as discussed by the architects were :

1. Memory was the ultimate bottleneck in processor performance. CPUs were quicker than ever but such a performance was arguable when in practicality, they were spending the majority of their time waiting for data from the memory due to smaller memory bandwidth and slower transfer rates.

2. Instruction Sets were bloated and antiquated, lacking support for efficient methods such as parallelism, but were still used extensively due to the industry's over-dependence on such ISAs, namely x86.

3. Meaningful applications were not been developed in accordance to the accelerated growth in hardware. Hardware was becoming increasingly complex while software was not able to make most of it.

4. Uniprocessor development was being sidelined due to growing approval for multi-core processors.


## Predictions By Architects

#### Gordon Bell :

Bell traces the history of computing from the invention of stored program computers and transistors in the year 1947, all the way up-to the development of the microprocessor in 1971. He believed that the future for hardware development looked bright. If the processing power continues to double every 1.5 years as stated by Moore’s law, it is only a matter of time until we have computers 10 billion times more powerful. Similarly, magnetic storage density and fiber optic transmission rates are doubling every 18 months. He even predicts that whilst the simple structure of a home computer may not change beyond any particular need, parallelism in instruction execution would become more common to improve performance leading to faster problem-solving rates. Crucially, Bell envisions that in the future, anything bitable will be in the “cyberspace” with the introduction of hardware and gesture interfaces and neural simulation. He anticipates that robots would become a norm in home and office spaces and that telepresence would rightly become the “addiction” of the next generation.

He mentions that the world wide web has stimulated the growth of other computer classes, such as network computers, tele-computers and television computers which are combined with phones and televisions respectively. Scalable computing, using an arbitrary number of computers and high speed network to operate as one is likely to replace traditional computers. This approach is SNAP, for scalable networks and platforms. The underlying parallelism is a problem that has escaped for several decades.

He predicts that nearly zero-cost communicating computers will be everywhere from our phones to light switches, they will eventually be the eyes and ears for the blind and deaf and a high speed digital subscriber link that permits high speed data to go via fibre optic cables (due to increase in transfer rates with more bits/second annually at 1.6x per year) while radio links will empower anywhere computing. However, he also seems to suggest that despite massive hardware upgrades, none of it will matter as much without the development of useful and meaningful applications which would be equally important.

#### Richard Sites :

Richard Sites cites his experience from the development of the Alpha architecture design in the year 1988 when they had estimated a compounded performance improvement of 32% per year over the 25 year lifetime, i.e. a total of 1000x - 10x from clock improvements, 10x from multiple instruction issues and 10x from multi-processors. However in reality, the CPU clock speed was ahead of the estimates with a 2.5x improvement, followed by issue width with a 2x improvement and on-chip multiprocessing behind at only 1x improvement.

He further emphasizes on how processors are miles ahead of memory systems. Every 3 out of 4 cycles retired zero instruction in the 200MHz Pentium Pro and 400 MHz 21164 Alpha systems. Most were spent waiting for memory. Increasing the width of the instruction issue only makes the memory bottleneck worse. Memory bandwidth is clearly not able to keep up with the clock speeds and issue width. 

He thus predicts that in the future, memory subsystem design - of caches, better buses, and other subsystems - will become a more important factor in processor design and that evolution of processors will be stalled without a solution to the memory bottleneck.

#### William Dally :

William Dally expresses his concern over the limitations in Instruction Level Parallelism (ILP). He suggests an increase in parallelism and also advocates for multiple levels of parallelism as found in MIT M-Machine with each approach or level depending upon the granularity of the computation (VLIW>Microthreads>Conventional).

The number of devices and wiring per chip increases by 60% per year while clock rates increase at only 15% per year, thus a 30% increase in parallelism is required to maintain the 50% annual increase in processor performance. He advocates adopting explicitly parallel instruction sets and soft ABIs to exchange binary application programs, that will be easier to translate, emulate and run by various architectures while still maintaining parallelism.  Switching to a soft ABI makes economical sense as it supports a wide range of hardware architectures and operating systems without testing and distribution cost. Also benefiting the hardware vendors by reducing the compatibility constraints and verification efforts.

He also mentions that to achieve adequate performance over this interface, processors will be integrated on the same chip as memory, these chips will communicate with each other over high bandwidth point to point links. Most importantly, he opines that future computers will be “memory-centric” dependent upon memory capacity, latency and bandwidth where memory serves as the significant issue as mentioned earlier by Sites.

#### David Ditzel :

Ditzel talks about the dominance of Intel’s x86 architecture in the microprocessor industry due to its unwavering preeminence in the market due to its software count and compatibility and not due to technical or performative superiority.  He proposes the idea that despite x86’s dominance, the market will not sit idle and battles will instead emerge in newer places. However with all the traditional upgrades in microprocessors being exhausted, architects will be forced to try some radical techniques. He suggests that upcoming battles will be :

- DRAM vs Microprocessors
- Multimedia Accelerators vs Microprocessors
- New Instruction Sets vs Compatibility, Single Chip Multiprocessors vs Uniprocessors
- 32-Bit vs 64-Bit Low vs High Performance
- Wires vs Gate

While factors such as x86 and CMOS Dominance, ILP Limits and Recompiled Benchmarks (that such performance metrics are misleading and instead should be replaced by real-world metrics) will moderate technical direction in future computers. He finally predicts that Intel is poised to become the world’s largest full-fledged computer company.

#### Yale Patt :

Yale Patt argues that instead of complicated multiple processor units/VLIW , a single uniprocessor will be a much better option to implement, not only for a moderate range of transistors but can also be scaled simultaneously as the number of transistors increase and reach a billion.

At 1 billion transistors, the system can have multiple levels of cache with L3 caches large enough that the processor would not stall due to memory bandwidth.However,he also points out that newer algorithms will have to be developed to take advantage of such a design.Issue width will be wider and pipelines will be deeper with more transistors in the branch predictor chewing up the 1 billion transistor budget.

He predicts such a uniprocessor will have wider issue widths, faster cycles, more transistors contributed to branch prediction increasing its accuracy, executed by deeper pipelines.

## Were The Predictions True ?

Bell had correctly guessed the ongoing rise in processor power and performance and although exaggerated, his predictions about the faster rates and parallelism in modern computers remains true. He also correctly foresaw the rise of scalable computing through cloud platforms such as AWS, introduction of robots in industries, and the idea of “cyberspace” with gesture-controlled services and upgrades in fibre-optic communication.

Sites has correctly predicted an increase in CPU clock speeds, hindered only by slower memory systems. He also correctly predicted the development and use of multithreaded software. His prediction of a growing importance for memory design is accurate and incredibly significant to keep in mind when designing memory subsystems.

Dally correctly foretold the stagnancy in ILP and legacy instruction sets and the increase in parallelism in modern computers. He also realised System-On-Chip (SoC) accurately, involving the integration of CPU/GPU and Memory onto a single chip that is in great use today. His opinion regarding the onset of memory-centric computers is also true in modern times.

Although Ditzel accurately predicted x86 supremacy in the market, this was only true until the emergence of ARM that posed serious competition. Ditzel correctly predicted that battery life would drive computer design (low vs high performance), the absence of major changes in IS and ubiquity of multi-core chips.

Though Patt predicted the push by tech giants for more powerful single-core processors, the industry seems to have transitioned to multi-core processors due to power and ILP limits. However, his importance for branch prediction and caches still remains true as these systems remain crucial for any modern processor.

## Which Problems Persist ?

The major bottleneck as said earlier, is memory. Memory is not able to keep up with the pace of processor performative progress . While processors have become fast at executing instructions, DRAM access latency has not significantly improved causing stalls. The ubiquity of parallelism in modern machines had put incredible load on the memory systems. Slower inefficient memory also affects performance in AI/ML/Video processing. In short, as Richard Sites mentioned :

" It's memory, stupid !"

## Going Forward

Therefore, in the upcoming years, memory will be the center of improvement in computer systems. Newer architectures will not only focus on speeding up processors but also on  advanced, coherent and well-organized memory systems. Thus, learning such systems such as memory organization and hierarchy and caches - which are effective in increased memory performance by providing data at faster rates - will be essential.

## What We Are Doing ?

With such an emphasis on improving memory systems, we will be learning the fundamentals of computer architecture. We aim to build two cache subsystems for a pipelined RISC-V CPU Core as a project to implement the concepts . Thus, we will understand how to create better memory systems for computers.

### Resources :

[Stupid Architects Look At Future By Safari ETHZ August 1996](https://safari.ethz.ch/architecture/fall2021/lib/exe/fetch.php?media=stupid_architects_look_to_future.pdf)


