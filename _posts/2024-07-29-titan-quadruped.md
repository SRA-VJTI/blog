---
layout: post
title: Titan_Quadruped
tags: 
    - Robotics
    - ROS2
    - CAD Modeling
    - Mechanics
    - Design
description: Creating a fully autonomous quadruped robot , currently focusing on the leg design and manufacture. 
---

## Mentees  :
- [Krushna Tarde](https://github.com/Krusshhnnaa)
- [Harsh Ogale](https://github.com/harshogale04)
- [Harsh Sagare](https://github.com/hssagare)

---
# What is our project ? 
The project aims to design and build a quadruped robot from scratch, focusing on the development of a quadruped. Mentees will embark on a comprehensive journey exploring and studying various mechanisms essential for leg movement. Following this, they will utilize CAD modeling software such as SOLIDWORKS, ONSHAPE, or FUSION360, depending on their preference, to assemble the quadruped meticulously.

Additionally, mentees will conduct a detailed analysis to assess the feasibility and strength of the designed components. The manufacturing process will involve advanced techniques like 3D printing and laser cutting, ensuring precision and efficiency simultaneously delving into ROS2 for both simulation and control aspects of the robot, fostering a holistic understanding of robotic systems

### Let's research 
In the first two weeks, we went through a series of 8 research papers about quadruped robots all over the globe. These papers gave us an insight into the design, functioning and the problems faced by these projects and the solutions they came up with. This would eventually help us to save time, effort and money by avoiding these mistakes and focusing on creating the bot  correctly; making it functional and then, autonomous.


### Our Leg Designs
As the name suggests, the leg design is quite an essential part of the bot, and a flawed design will destablize the entire bot. This would end up hindering the functionality of the bot. To avoid this, we first went through a pen and paper phase of designing the legs, each mentee coming upn with two designs. Then, we chose a total of 3 from these, that seemed to be perfect to move forward with. The, we proceeded to create CAD models of these 3 desings. Let's take a look into these designs. 

>Leg design by [Harsh Ogale](https://github.com/harshogale04) on Onshape
![fk](/assets/posts/titan_quadruped/ogale.gif) 

>Leg design by [Harsh Sagare](https://github.com/hssagare) on Onshape
![fk](/assets/posts/titan_quadruped/sagare.gif) 

>Leg design by [Krushna Tarde](https://github.com/Krusshhnnaa) on Fusion360
![fk](/assets/posts/titan_quadruped/krushna.jpeg) 

---

# Where did we struggle
We faced difficulty in trying to figure out what the right leg design would be. Even in designing these CAD models, it was necessary to take into account the total weight, stress and the force vectors that will be acting on it. We figured this out using a software called **Ansys**, which helped us to simulate various conditions and forces on the leg designs; which helped us to understand the flaws in our designs before they were sent to manufacturing. This helped us to prevent economical losses.

# What is Ansys??
ANSYS is a software suite used for engineering simulation and analysis. It helps engineers and designers predict how their products will perform under various conditions. ANSYS offers tools for:

1. **Finite Element Analysis (FEA):** Simulates how structures respond to forces, vibrations, and other physical effects.
2. **Computational Fluid Dynamics (CFD):** Analyzes fluid flow, heat transfer, and related phenomena.
3. **Electromagnetics:** Examines electromagnetic fields, including those in electrical and electronic devices.
4. **Systems Engineering:** Integrates simulations of different engineering disciplines to optimize complex systems.

Overall, ANSYS is widely used in industries like aerospace, automotive, energy, and electronics to improve product design, performance, and reliability.

# What's Next
Now that we are almost done working on the hardware leg design, it is time for us to start studying the software part. While we are working on the Ansys analysis of our leg designs, we have started watching videos concerned with the Ros2 repository. The "ROS 2 repo" refers to the official GitHub repositories for the Robot Operating System (ROS) 2. It includes:

1. **Core Libraries**: Source code for essential libraries and middleware, like `rclcpp` (C++) and `rclpy` (Python), as well as DDS abstractions (`rmw`).

2. **Tools and Utilities**: Includes command-line tools (`ros2cli`), data recording tools (`rosbag2`), and visualization tools (`rviz2`).

3. **Message Definitions**: Standard message types used in ROS 2, such as sensor and geometry messages.

4. **Build and Dependency Management**: Tools like `colcon` and `ament` for building and managing packages.

5. **Simulation and Control**: Packages for integrating with simulation environments (e.g., Gazebo) and controlling hardware (`ros2_control`).

6. **Examples and Tutorials**: Sample code and guides for learning ROS 2.

These repositories provide the source code and tools needed to develop and manage robotic applications with ROS 2.

# Applications
If we talk about the applications of this project, it can be used in many fields:
- **Search and Rescue**: Navigate through debris and locate survivors.
- **Military**: Perform rescue operations and carry equipment.
- **Agriculture**: Assist with monitoring, planting, and harvesting.
- **Healthcare**: Support elderly care and rehabilitation.
- **Industrial Inspection**: Inspect hazardous environments.
- **Environmental Monitoring**: Collect data in remote areas.
- **Education**: Teach robotics and provide interactive exhibits.
- **Logistics and Delivery**: Transport goods in challenging environments.

