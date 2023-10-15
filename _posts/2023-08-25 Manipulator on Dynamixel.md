---
layout: post
title: Manipulator on Dynamixel 
tags: robotics,ros2 , C++ 
description: <Controlling and designing a 3-DOF manipulator utilizing three dynamixel motors. It will involve use of ROS for first designing, simulating and controlling the manipulator in ros2. Implementing Inverse Kinematics on the model with pose-force control>
---

### what is a manipulator ? 
   
    A manipulator consists of a series of links connected by joints, which allow it to move in a variety of ways. The number and type of joints used in a manipulator depend on the specific application.One of the most important considerations when designing a manipulator is its range of motion. A manipulator must be able to move in all the directions required to perform its task. This is usually achieved by using a combination of joint types, such as revolute and prismatic joints. 

### what is degree of freedom ?  
    
    The degree of freedom (DOF) refers to the number of independent ways a rigid body can move within a given space. In the context of robotics and mechanical systems, the degree of freedom indicates the number of independent joint variables required to specify the pose or configuration of a mechanism. 
     
### Dynamixel Motors (MX-64)
    
    Dynamixel motors are a series of smart actuators developed by ROBOTIS. They are widely used in robotics for their high performance, precise control, and advanced features.  
    
    They are used for following reasons:- 
      
      Dynamixel is compatible with various programming environments, including: Roboplus, the visual software by Robotis dedicated to programming Dynamixel servo motors. The SDK (access to source codes and libraries for Windows, Linux and smartphones) C/C++, JAVA, MATLAB, LABVIEW, ROS.
      Data feedback and control: position, speed, temperature, torque, etc.
      Different Dynamixel models cater to various applications, including servo motors, continuous rotation actuators, and even specialized motors for pan-tilt systems, humanoid robots, and more.
      These servos operate on a high voltage and low power consumption, meaning greater battery stability.

### Ros 2 humble:- 

    ROS 2  is a powerful framework for building robotic systems that supports the development of various robotic applications, including manipulators. It provides tools and libraries for creating modular, distributed, and highly scalable robotic software systems.     

    #Advantages of Ros 2:-  
      
      1)Communication and Middleware: ROS 2 provides a middleware layer that facilitates communication between different components of a robotic system. This is especially important for manipulators, where multiple joints, sensors, and actuators need to work together. ROS 2's middleware ensures efficient and reliable communication between these components, even in complex setups. 

      2)Node-Based Architecture: In ROS 2, robotic systems are built using a node-based architecture. Each node represents a distinct functional unit that can communicate with other nodes. 

      3)Simulation and Visualization: ROS 2 supports simulation environments like Gazebo and tools like  for visualization. These tools allow developers to test and validate manipulator control algorithms in simulated scenarios before deploying them on physical hardware. 

## Mentees 
--[Atharv Dubey] 
--[Isha Nair]     

## Mentors 
--[Mahesh Tupe] 
--[Alqama Shaikh] 