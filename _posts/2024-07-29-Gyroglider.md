---
layout: post
title: GyroGlider 
tags: 
    - Robotics
    - Dshot protocol
    - Fusion360
    - Ansys
    - PID 
description: Developing a Semi Drone mode for Evoborne.
---

## Mentees  :
- [Kesar Sutar Parmar](https://github.com/MasterQueen16)
- [Ameya Tikhe ](https://github.com/AmeyaTikhe)
- [Soham Kute](https://github.com/sohamukute)
- [Atharve Khare](https://github.com/AtharvaKhare1)

---
# What is our project ? 

EvoBorne, a versatile robot developed by SRA, is designed to conquer diverse landscapes both in the air and on the ground. This morphable marvel transitions effortlessly between drone mode, soaring through the airspace, and a quadrupedal form for terrestrial traversal. 

Equipped with a clever configuration of four wheels and four thrusters, the project aims to imbue EvoBorne with autonomous self-balancing capabilities. This will enable the robot to navigate even the steepest terrains in a semi-drone mode, combining the best of aerial and ground mobility. 

EvoBorne, our innovative robot, is equipped with a sophisticated motor system that includes three distinct types of motors, each playing a crucial role in its hybrid functionality. The servo motors are tasked with rotating the arms, which are essential for the robot's ability to morph seamlessly between its aerial and terrestrial forms. These motors ensure precise and reliable positioning, allowing EvoBorne to transition smoothly and maintain stability during its morphing process. 

In drone mode, the robot relies on Brushless DC (BLDC) motors to rotate the propellers, providing the necessary thrust for flight. BLDC motors are renowned for their high efficiency, reliability, and consistent performance, which are vital for stable and agile aerial navigation. These motors ensure that EvoBorne can manoeuvre effectively in the air, maintaining balance and control even in challenging conditions.

For ground traversal, EvoBorne uses N20 motors to drive its wheels in rover mode. These compact and powerful motors deliver a balance of torque and speed, enabling the robot to navigate various terrains with agility and ease. Whether climbing steep inclines or moving across uneven surfaces, the N20 motors ensure robust and responsive ground mobility.

The motor system is managed by the  1 to 4 Electronic Speed Controller (ESC), which supports multiple motor configurations and provides smooth, precise control. This ESC operates using the DShot protocol, a digital communication standard that ensures fast, reliable, and error-free signal transmission between the flight controller and the motors. The use of the DShot protocol enhances the responsiveness and accuracy of the motor control, contributing to EvoBorne's overall performance and stability in both its aerial and terrestrial modes. 

The DShot (Digital Shot) protocol is a digital protocol used to communicate between a flight controller and an electronic speed controller (ESC) in drones. It offers a more reliable and accurate method of sending speed commands compared to older analogue protocols like PWM or analogue signals. To implement the DShot protocol, an encoder is required to generate the appropriate digital signals. The DShot protocol sends a 16-bit data frame consisting of 11 bits for the throttle value (0-2047), 1 bit for the telemetry request, and 4 bits for the CRC (Cyclic Redundancy Check). Signal timing varies based on the specific DShot speed (150, 300, 600, 1200), and bit encoding is done using particular pulse lengths for '0' and '1'. The encoder converts the throttle value to an 11-bit binary number, adds the telemetry bit, calculates the CRC, and then generates the signal timing to output the 16-bit data frame. This process ensures that the communication between the flight controller and the ESC is precise and reliable, allowing for accurate control of the drone's motors.

This sophisticated combination of servo motors, BLDC motors, and N20 motors, along with the advanced ESC and DShot protocol, enables EvoBorne to tackle a wide range of environments. It showcases the potential of hybrid robotic systems to adapt and excel in diverse applications, pushing the boundaries of what is possible in robotic mobility.

The ultimate goal? EvoBorne will have a semi-drone mode, allowing it to navigate any environment with ease. This semi-drone capability represents a significant step forward in the evolution of robotics, promising seamless and agile movement across all types of challenging terrain. By using cutting-edge technologies like SLAM (Simultaneous Localization and Mapping) and advanced trajectory planning, EvoBorne will achieve full autonomy to traverse through its environment. This exciting vision drives the development of EvoBorne.

# What have we done so far?

### Courses we completed
Over the past two weeks, we delved into various resources. Starting with Linear Algebra, crucial for understanding the geometric implications in our project, we laid a solid foundation. We then studied and implemented the Dshot protocol to interface with the ESC and work with BLDC motors. We also explored Fusion 360 for mechanical design and Ansys to test the strength and durability of our components.

### Practical Implementaion

After completing the foundational courses, we transitioned into the practical implementation phase of our project. To ensure a safe and controlled environment for testing, we first created a test model—a T-shaped clamp—onto which we mounted two BLDC motors at its ends. This setup allowed us to simulate the semi-drone mode's mechanics without risking damage to the primary EvoBorne unit.

Utilizing the DShot protocol, we developed code to control the BLDC motors, aiming for precise and efficient operation. However, during our initial tests, we encountered significant challenges. One of the motors burned out, highlighting a potential issue with power management or motor quality. Additionally, both motors failed to operate at the same speed, leading to instability and imbalanced thrust. This discrepancy underscored the importance of synchronized motor control in achieving balanced flight and ground traversal.

In response to these issues, we switched to different BLDC motors known for their reliability and consistent performance. This change was crucial as it allowed us to address the initial problems and focus on fine-tuning the balance and coordination of the motors. Through iterative testing and adjustments, we worked diligently to synchronize the motors, ensuring they operated at the same speed and produced balanced thrust.

Our efforts paid off, as we successfully ran the motors using the Electronic Speed Controller (ESC). This milestone marked significant progress in our project, as the ESC provided smooth and precise control over the motor speeds, enhancing the overall stability of the system. With the motors now running effectively, our current focus has shifted to achieving optimal stability and balance in the test model. This involves further refining the code, making mechanical adjustments, and conducting rigorous tests to ensure the system can handle dynamic conditions and maintain equilibrium.

By addressing these practical challenges head-on, we are steadily moving towards our goal of creating a robust and versatile semi-drone mode for EvoBorne. Each step brings us closer to realizing a hybrid robot capable of seamless transitions between aerial and terrestrial modes, showcasing the innovative potential of our project.


![T-shape clamp image of Fusion 360](/assets/posts/GyroGlider/image.png)
![clamp after lasser cutting and bldc mounted](/assets/posts/GyroGlider/image-1.png)
![Free Body daigram of the clamp](/assets/posts/GyroGlider/image-2.png)




We have successfully completed the running of motors using ESC and now trying to find the balance

---
# What are we dealing with now

We are currently focused on several critical tasks to advance the development of EvoBorne. One of our primary objectives is deriving the mathematical equations necessary to adjust the angle of inclination when mounting the propellers. This involves complex calculations to ensure optimal thrust and stability, allowing the robot to maintain balance and control in semi-drone mode. By fine-tuning these equations, we aim to achieve precise control over the propeller angles, which is essential for smooth transitions and stable flight.

In addition to the mathematical groundwork, we are developing code in C language utilizing Espressif's system functions. This code is designed to control the propellers of our test model, enabling them to operate simultaneously and maintain balance. By leveraging Espressif's robust platform, we can ensure efficient and reliable performance, which is crucial for the real-time adjustments needed for autonomous balancing. This coding effort is pivotal in achieving the synchronized operation of the propellers, a key component in the stability and functionality of EvoBorne.

Furthermore, we are considering modifications to the test model to enhance its efficiency. One such modification involves making the test model plate lighter. A lighter plate would reduce the load on the propellers, allowing for more efficient use of thrust and improving overall stability and responsiveness. This adjustment is part of our ongoing efforts to optimize every aspect of the robot’s design, ensuring that it performs at its best in both aerial and terrestrial modes.

These combined efforts in mathematical modeling, software development, and hardware optimization are essential steps toward realizing the full potential of EvoBorne. By addressing these challenges, we are making significant progress in creating a versatile, hybrid robot capable of navigating complex environments with agility and precision.

# Project Repository

- [GyroGlider]( https://github.com/AmeyaTikhe/Gyroglider )

