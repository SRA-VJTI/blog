---
layout: post
title: "Locomotion Policy by FlashSAC & PPO Algorithm"
date: 2026-09-30
tags: [locomotion,FlashSAC,PPO,Reinforcement learning]
description: " Deploying locomotion policies using PPO and FlashSAC "
---

- [Hindraj Mali](https://github.com/hindraj123)
- [Palak Singhi](https://github.com/palaksinghi)

# **Motivation**

Traditional robot control requires engineers to manually design and tune controllers for complex movements. Bipedal locomotion is especially challenging because balance, joint coordination, and ground contact create highly coupled dynamics. Reinforcement Learning provides an alternative by allowing the robot to learn a locomotion policy through trial and error in simulation, motivating us to explore how PPO and FlashSAC can learn stable and efficient walking behaviours.

# **Teaching the Open Duck to Walk**

*From locomotion policies to PPO and FlashSAC, we explored how reinforcement learning can be used to learn bipedal locomotion.*

## **Where It Started: Locomotion**

Getting a bipedal robot to walk requires more than controlling its joints individually. The joints need to work together to maintain balance, generate a stable gait, and move the robot in the desired direction. We approached this as a robot control problem, where the goal was to learn these coordinated movements through Reinforcement Learning.

Meet the Open Duck Mini

Github link : [https://github.com/apirrone/Open\_Duck\_Mini](https://github.com/apirrone/Open_Duck_Mini)

 ![](/assets/posts/locomotion-policy-flashsac-ppo/image5.png)

The Open Duck Mini is a bipedal robot whose walking behaviour emerges from the coordinated movement of its joints and interaction between its feet and the ground.

During walking,different joints contribute to moving the legs,maintaining the body’s orientation and generating forward motion.This makes locomotion fundamentally different from controlling an individual joint in isolation.

Why Reinforcement Learning?

Instead of designing a fixed sequence of joint movements, we used Reinforcement Learning to learn a locomotion policy.RL allows the robot to discover a control strategy through trial and error. The robot takes actions, observes the resulting behaviour, receives rewards or penalties, and gradually updates its policy to favour behaviours that lead to higher rewards.

This changes the problem from:

"What joint angle should the robot use at every instant?"

to:"Given the current state of the robot, what action should the robot take next?"

A locomotion policy maps the robot's current observations to actions:

![](/assets/posts/locomotion-policy-flashsac-ppo/image8.png)

The observations describe the current state of the robot, such as its joint positions and velocities, body orientation and motion. The policy uses this information to decide the action to apply to the joints.

The robot then interacts with the environment, receives a reward based on its behaviour and uses that experience to improve the policy.This gives us a different way of looking at robot control. The problem was no longer just about finding the correct joint angles. It was about learning a policy that could continuously make control decisions while keeping the robot balanced and moving in the desired direction.

Once we understood this setup, the next question was how to actually train the policy.

## **PPO: Our First Approach**

For the locomotion task, we used PPO (Proximal Policy Optimization).

PPO is an on-policy policy-gradient algorithm. In our setup, the policy interacts with the MuJoCo environment, collects trajectories and uses those trajectories to update the policy.

The basic loop looked like:

![](/assets/posts/locomotion-policy-flashsac-ppo/image3.png)

**Observe → Take Action → Receive Reward → Collect Rollout → Update Policy**

At the start agent interacts with the environment and collects a rollout.Once the rollout is collected, the next step is to calculate the Generalized Advantage Estimation (GAE).

GAE=TD errors over the next k steps, weighted by (γλ)^k

$$
\hat{A}_t = \delta_t + (\gamma\lambda)\delta_{t+1} + \cdots + (\gamma\lambda)^{T-t+1}\delta_{T-1},
$$

$$
\delta_t = r_t + \gamma V(s_{t+1}) - V(s_t)
$$

The rollout is passed through the neural network to obtain action probabilities and value estimates. We calculate the policy ratio and use KL divergence to measure and penalize large changes between the current and old policies.We multiply this ratio by the GAE .The ratio is therefore clipped between 1−ϵ and 1+ϵ. This calculates the policy loss . 

The value loss compares the critic’s predicted value with the target return using mean squared error. This helps the critic improve its value predictions.

$$
L^V(\phi) = \frac{1}{2}\mathbb{E}_t\left[\left(V_\phi(s_t) - V_t^{\text{target}}\right)^2\right]
$$

Entropy loss is added to encourage the agent to explore the environment.The total loss is calculated by combining the individual losses with their respective coefficients, which is then backpropagated through the neural network.

Working with PPO helped us connect the algorithm to the actual robot behaviour.

![](/assets/posts/locomotion-policy-flashsac-ppo/image3.gif)

The first few training runs were quite unstable. The duck was moving its joints, but there was no coordinated gait or consistent forward movement. At this stage, the policy had not yet learned how to combine the individual joint actions into stable locomotion.

![](/assets/posts/locomotion-policy-flashsac-ppo/image6.gif)

After many training iterations, the duck started learning a proper gait and was able to move forward because of the forward velocity reward. But it was also slowly turning while walking, so instead of going straight, it started moving in a circle. We then worked on the gait rewards and yaw/heading drift penalty to reduce this unwanted turning and make the duck follow a straighter path.

We also noticed an issue in the base-height reward. We were calculating the height using the robot’s base position instead of the foot position, so the reward was not actually encouraging the foot height we wanted. We corrected this by using the foot position in the height calculation, which helped the duck start lifting its feet properly while walking.

![](/assets/posts/locomotion-policy-flashsac-ppo/image10.gif)

After making a few changes to the flat orientation reward and the drift penalties, the duck started walking more smoothly and in a straighter direction. The flat orientation reward helped it keep its body more level, while the drift penalties reduced the unwanted turning during walking.

Designing the reward function was not just about adding as many rewards as possible. Each term was chosen to address a specific requirement of bipedal walking.

The Open Duck Mini has 10 controlled leg joints, with five joints on each leg. Because the two legs have to work together, the policy cannot simply maximize forward movement. It also needs to coordinate the joints, alternate the feet, maintain the body's orientation, and avoid unstable or unnecessarily aggressive movements.

The forward\_progress reward measures how much the robot moves forward during each step.If forward movement were the only objective, the robot could discover unnatural solutions such as dragging its feet or producing unstable movements. This is why we added gait-related rewards.The gait rewards encourage the two legs to follow an alternating walking pattern. gait\_phase\_tracking rewards the expected foot-contact sequence, while feet\_air\_time\_reward encourages the robot to properly lift its feet during each step.Walking on two legs requires maintaining body stability while the feet move and contact the ground. flat\_orientation\_l2 penalizes excessive tilt, while base\_height\_l2 maintains the desired body height. Vertical and rotational velocity penalties further reduce unnecessary body motion.To keep the duck walking straight, heading\_drift penalizes changes from its initial heading, while lateral\_path\_deviation penalizes movement away from the desired straight path.

**FlashSAC:** 

### ![](/assets/posts/locomotion-policy-flashsac-ppo/image7.png)

FlashSAC drastically reduces wall-clock training time from hours to minutes compared to PPO.FlashSAC stores the previous experience in the replay buffer whereas the PPO discards the experience  . FlashSAC maximizes policy entropy to actively explore diverse gaits, preventing the early gait collapse often seen in PPO.

When training begins, small batches of past experience are pulled from the replay buffer and passed into the neural networks. There is one actor network which outputs the continuous control actions (π) and two critic networks that estimate the predictive action value . We introduce entropy regularization in it for exploration .

We take the smaller of the two Critic outputs to keep the model from getting overly optimistic about future rewards. Since we use two Critic networks, we also maintain two matching target networks that slowly follow their main counterparts. The target value formula :   


$$
y = r + \gamma \left(
\min_{j=1,2} Q_{\bar{\phi}_j}(s',a')
- \alpha \log \pi_\theta(a'|s')
\right),
\qquad
a' \sim \pi_\theta(\cdot|s').
$$


Each Critic network minimizes its Bellman error using slow-moving target networks
$(\bar{\phi}_1,\bar{\phi}_2)$, which are gradually updated via an Exponential Moving Average (EMA) to keep learning stable.

$$
\bar{\phi}_j \leftarrow \tau \phi_j + (1-\tau)\bar{\phi}_j,
\qquad j \in \{1,2\}.
$$
## **PPO vs FlashSAC: What We Learned**

### **Comparing the Results**

To go beyond the theory, we tested both algorithms on the same robot, with the same reward function and the same number of training steps (100k). We compared:

* **Wall-clock training time:** PPO took around 30 minutes, while FlashSAC took around 16–17 minutes.  
* **Walking behaviour:** PPO gave its best result during inference, while FlashSAC showed a good walking result at around 90,000 steps.  
* **Overall behaviour:** With PPO, the duck learned to coordinate its joints, lift its feet, maintain its orientation and move forward with less heading drift.


# ![](/assets/posts/locomotion-policy-flashsac-ppo/image10.gif)
# ![](/assets/posts/locomotion-policy-flashsac-ppo/image4.gif)

## **Conclusion**

This work successfully demonstrates a proof of concept for both on-policy and off-policy RL in locomotion, paving the way for experimenting with diverse algorithms, extending them to different tasks, and improving training efficiency and optimisation.
