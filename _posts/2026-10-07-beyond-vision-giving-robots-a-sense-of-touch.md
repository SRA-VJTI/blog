---
layout: post
title: "Beyond Vision: Giving Robots a Sense of Touch"
tags: tactile-sensing robot-learning imitation-learning FlexiTac
description: "Exploring visuo-tactile manipulation with tactile sensors and robot learning policies."
---

- [Aryan Kakad](https://github.com/Aryankakad)
- [Mahi Zade](https://github.com/zademahi238)

# Beyond Vision: Giving Robots a Sense of Touch


**Project Website:** [Mission Mimosa](https://zademahi238.github.io/mission-mimosa/#/)


## Introduction

Most robotic manipulation systems today rely almost entirely on vision and kinematics. While this works for rigid tasks, closed-loop control hits a wall when a robot actually needs to grasp, slip, or adjust to an object dynamically. Without tactile feedback, the system is essentially numb.

Mission Mimosa bridges this gap by building a robust framework for visuo-tactile manipulation.

Through this project, we are integrating custom high-resolution tactile sensors, specifically the FlexiTac arrays directly into robotic end-effectors. Rather than relying on vision alone, we capture continuous pressure data across a 512-taxel grid during teleoperation. This tactile data is synchronized with RGB camera feeds and processed through convolutional encoders to extract dense spatial pressure features.

To make the robot truly contact-aware, we fuse these distinct visual and tactile signals using bidirectional cross-attention mechanisms. The camera tells the touch signal what the robot is holding, and the touch signal tells the camera exactly where and how hard the contact is.

This unified visuo-tactile data then serves as the conditioning input for advanced action generation architectures, including Diffusion, ACT, and SmolVLA.

## FlexiTac: Sensing Through Flexible Circuits

Flexitac is a low-cost, three layer (**FPC-Velostat-FPC**) tactile sensor which is based on the principle of **piezoresistance**. It consists of a readout board made out of simple electronic components communicating with the host PC at 100Hz.

It consists of two FPC with vertical and horizontal alignment of electrodes each. Velostat(a piezoresistive material)is sandwiched between these two FPC’s which results in a **16x32 matrix** whose elements are known as **taxels**. When pressure is applied to the sensor, the Velostat's resistance changes at the point of contact. Each of the **512 taxels** is mapped to its (row, column) position in the matrix, so every taxel holds its own pressure value. However, the current Flexitac supports a 12x32 matrix. Together, these values form a complete pressure image known as the **heatmap.**

The heatmap converts the 12x32 tactile array of raw taxels into a **2D pressure image.** Each of the **512 taxels** is displayed as a taxel at its position in the tactile array. Also the colour gradient shows how hard that particular region is pressed.

The footprint of any object appears as a 2D image on the visualizer so you can predict the shape and size of the grasped object. Also the mapping keeps updating simultaneously so that we can track the changing contacts live.

## Mapping Taxels into a Tactile Map

<img src="{{ '/assets/posts/beyond-vision/tactile.png' | relative_url }}" alt="FlexiTac Tactile Heatmap and Sensor">

## Mechanical Response

When the sensor is pressed, the applied force is distributed across individual taxels. For a taxel at row $i$ and column $j$, the resulting pressure depends on how much force is applied and the area over which it acts:

$$
\mathbf{P_{ij} = \frac{F_{ij}}{A_{ij}}}
$$

where $P_{ij}$ is the resulting pressure, $F_{ij}$ is the applied normal force, and $A_{ij}$ is the effective contact area of the taxel.

This pressure changes the microscopic contact between the conductive material and the electrode. For an ideal contact, the conductance scales linearly:

$$
\mathbf{C_x = k_x P_x}
$$

Here, $C_x$ is the contact conductance, $P_x$ the applied pressure, and $k_x$ the contact sensitivity constant. As pressure increases, conductance increases and resistance decreases, since:

$$
R = \frac{1}{C}
$$

However, for real FlexiTac-like sensors, contact mechanics result in a nonlinear, sublinear response:

$$
\mathbf{C_x = k_x P_x^m}
$$

$m$ is the nonlinearity exponent. For real sensors, $\mathbf{m<1}$ at lower loads, causing the response to curve rather than remain perfectly linear.

## Electrical Readout

The total electrical resistance of a single taxel is modeled as multiple paths working together:

$$
\mathbf{R_{taxel} = R_{in} + R_{out} + R_{gap}}
$$

where **$R_{gap}$** is the internal resistance of the conductive piezoresistive material bridging the gap between the electrodes.

This physical resistance is read by an external electrical circuit and converted into a readable voltage:

$$
\mathbf{V_{out} = \frac{R_{gain}}{R_{taxel}} V_{bias}}
$$

For a full 12x32 FlexiTac array, a microcontroller’s ADC digitizes this output for every taxel:

$$
\mathbf{V_{ij} = \frac{D_{ij}}{D_{max}} V_{ref}}
$$

Here, $D_{ij}$ is the raw ADC reading, $D_{max}$ the ADC’s maximum digital value, and $V_{ref}$ the reference voltage used to convert the reading into an actual voltage.

And this electrical reading is converted into estimated force using the relation:

$$
\mathbf{F_{ij} = \left(\frac{V_{ij}}{K}\right)^{1/m}}
$$

## Tactile Data Representation

For representing pressure using heatmap the matrix is normalized in the range [0,1]:

$$
\mathbf{H_{ij}} = \operatorname{clip}\left(\frac{F_{ij}-F_{min}}{F_{max}-F_{min}}\right)
$$

$H_{ij}$ is the normalized heatmap value which lies between 0 and 1, and $F_{min}/F_{max}$ are the minimum and maximum expected force values.

This normalized values are then represented as a gradient on the heatmap using the colormap:

$$
\mathbf{RGB_{ij} = C(H_{ij})}
$$

## Integration of Tactile Sensor in Manipulation Policies 

## ACT

**Why ACT ?** Because it provides a strong and relatively straightforward baseline for contact-rich manipulation. Rather than predicting a single action at every timestep, ACT predicts short sequences of actions (action chunks), enabling smoother and more temporally consistent behavior.

<img src="{{ '/assets/posts/beyond-vision/ACT.png' | relative_url }}" alt="ACT architecture">

To use tactile data for robot learning, the robot combines it with visual and joint-position information. Since ACT cannot directly process the 2D heatmap, a Tactile Encoder (CNN or MLP) converts it into a compact feature representation that ACT can use.

$$
\mathbf{T_{tactile}=Encoder_{tactile}(H)}
$$

where $T_{tactile}$ are tactile tokens which represent the extracted tactile information.

Finally, the robot combines these tactile tokens with its other sensor data into a single flat sequence. This multimodal sequence is what gets fed into the Transformer policy to predict the robot's next movements:

$$
\mathbf{X_{input} = [z, T_{state}, T_{tactile,1...N}, T_{img,1...M}]}
$$

where $X_{input}$ is the combined multimodal sequence, $T_{img}$ is the image feature token, $T_{state}$ is the proprioceptive token, and $z$ is the latent token representing variation during training.

## SMOLVLA

<img src="{{ '/assets/posts/beyond-vision/SmolVLA.png' | relative_url }}" alt="SmolVLA architecture">

## Integrating the Senses

Before a robot can move, it must translate physical sensations into a mathematical language the Vision-Language Model (VLM) understands.

## Tactile Encoding and Projection

The 2D pressure heatmaps from the robot's fingers are flattened into sequence tokens, then linearly projected to match the network's exact hidden dimension size.

$$
Z_{\text{tactile}} = f_{\text{enc}}(T)
$$

$$
E_{\text{tactile}} = Z_{\text{tactile}} W_{\text{proj}} + b_{\text{proj}}
$$

$T$: The raw tactile heatmap tensor.

$f_{\text{enc}}$: The encoder (like a CNN) that turns the map into tokens.

$E_{\text{tactile}}$: The final embedded sequence, dimensionally aligned for the VLM.

## Assembling the Multimodal Context

Touch is useless without context. The model concatenates the embeddings for vision, language instructions, touch, and the robot's joint states into a single "prefix" sequence.

$$
C = \left[ E_{\text{img}} \,\Vert{}\, E_{\text{lang}} \,\Vert{}\, E_{\text{tactile}} \,\Vert{}\, E_{\text{state}} \right]
$$

$C$: The unified context tensor. By packing them together, the network's self-attention mechanism can cross-reference what it feels with what it sees.

## Learning the Flow (Training)

To teach the robot to move, SmolVLA uses Continuous Normalizing Flows. It artificially destroys perfect actions with noise, then trains the network to predict the exact path (velocity) back to the clean action.

## Forward Noise Interpolation

During training, the system mixes a perfect ground-truth action with pure noise at a random timestep.

$$
x_t = t \epsilon + (1 - t) a
$$

$a$: The true robot action.

$\epsilon$: Pure standard Gaussian noise.

$x_t$: The artificially noisy action at timestep $t$.

## Velocity Prediction (The Loss Function)

The model aims to predict the velocity vector ($u_t$) needed to transport the clean action into noise. We train the network by measuring how far off its prediction is from the truth using Mean Squared Error.

$$
\mathcal{L}(\theta) = \mathbb{E}_{t, \epsilon, a} \left[ \Vert{} v_\theta(x_t, t, C) - u_t \Vert{}_2^2 \right]
$$

$v_\theta$: The neural network trying to predict the flow.

$u_t$: The true target velocity.

$C$: The multimodal context from Phase 1, acting as the guiding condition.

## Deployment (Inference)

In the real world, the robot doesn't know the perfect action. It must hallucinate the correct movement from scratch based on its current environment.

## Action Generation

Starting with pure noise ($t=1$), the model uses an Euler ODE solver to step backward along the vector field it learned, guided by the context $C$, until it arrives at a clean movement.

$$
x_{t - \Delta t} = x_t - \Delta t \cdot v_\theta(x_t, t, C)
$$

$x_t$: The noisy state at the current timestep.

$\Delta t$: The step size for the ODE solver.

$x_{t - \Delta t}$: The progressively refined action. Once this reaches $t=0$, the robot executes the resulting physical command.

## Diffusion Policy

<img src="{{ '/assets/posts/beyond-vision/DP.png' | relative_url }}" alt="Diffusion Policy architecture">

To integrate touch, the tactile heatmap is first passed through a tactile encoder that converts the raw sensor readings into a compact set of feature tokens:

$$
T_{tactile}=E_{tactile}(H)
$$

where $H$ is the tactile heatmap and $T_{tactile}$ represents the extracted tactile information.

These tactile features are then flattened and combined with the visual and robot-state features:

$$
C=[E_{vision}\Vert E_{state}\Vert T_{tactile}]
$$

This combined representation acts as the policy's multimodal observation, containing information about what the robot sees, feels, and its current state. It is then passed through conditioning layers to generate parameters that modulate the action-generation network, allowing the tactile information to influence its intermediate features.

Instead of directly predicting the action trajectory, Diffusion Policy learns to **denoise** it. Noise is added to the original action $x_0$:

$$
x_t=\sqrt{\bar{\alpha}_t}x_0+\sqrt{1-\bar{\alpha}_t}\epsilon,\qquad \epsilon\sim\mathcal{N}(0,I)
$$

The policy then predicts the added noise using the noisy action, diffusion timestep, and the multimodal conditioning:

$$
\hat{\epsilon}=\epsilon_\theta(x_t,t,C)
$$

Thus, the tactile tokens are not used as a separate input to the final action prediction. They are embedded into the conditioning of the action-generation network, allowing contact information from the tactile sensor to influence the actions predicted alongside vision and robot state.

## Bspline

<img src="{{ '/assets/posts/beyond-vision/bspline.gif' | relative_url }}" alt="Vision-only vs. visuo-tactile rollout">



## Vision-Only vs. Visuo-Tactile Policy Evaluation

Here’s the contact-rich benchmark task used to compare vision-only and visuo-tactile policies.

<img src="{{ '/assets/posts/beyond-vision/rollout.gif' | relative_url }}" alt="Vision-only vs. visuo-tactile rollout">

<img src="{{ '/assets/posts/beyond-vision/success%20rate.png' | relative_url }}" alt="Success rate comparison">


**Project Website:** [Mission Mimosa](https://zademahi238.github.io/mission-mimosa/#/)

## Acknowledgements

**FlexiTac** — Thank You for the open-source tactile sensing platform 
  [Binghao_huang](https://x.com/binghao_huang)

**RunPod** — Thank You RunPod for the compute  [Luke_Piette](https://x.com/LukePiette)
  
<img src="{{ '/assets/posts/beyond-vision/Runpod.png' | relative_url }}" alt="RunPod" style="max-width: 80px; height: auto;">



## References

1. Tony Z. Zhao, Vikash Kumar, Sergey Levine, Chelsea Finn (2023). Action Chunking with Transformer — [https://arxiv.org/abs/2304.13705](https://arxiv.org/abs/2304.13705)

2. Mustafa Shukor, Dana Aubakirova, Francesco Capuano (2025). SmolVLA — [https://arxiv.org/abs/2506.01844](https://arxiv.org/abs/2506.01844)

3. Cheng Chi, Zhenjia Xu, Siyuan Feng, Eric Cousineau, Yilun Du, Benjamin Burchfiel, Russ Tedrake, Shuran Song (2024). Diffusion Policy — [https://arxiv.org/abs/2303.04137](https://arxiv.org/abs/2303.04137)

4. Binghao Huang, Yunzhu Li (2026) — [https://arxiv.org/abs/2604.28156](https://arxiv.org/abs/2604.28156)

5. Leflexitac: Integration of tactile sensors — [LeFlexiTac](https://github.com/LeFlexiTac)

6. Bspline : Accelerating Manipulation Policies via B-spline Action Representations — [BSP](https://arxiv.org/abs/2607.09648)



