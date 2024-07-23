---
layout: post
title: Voice_Video_Manipulator
tags: 
    - Robotics
    - ROS2
    - Inverse kinematics
    - Machine Learning
    - Image Processing
description: Developing a robotic manipulator system equipped with both video input capabilities and speech recognition.
---

## Mentees  :
- [Yash Suthar](https://github.com/BlazinBull)
- [Kartikey Pathak](https://github.com/NoobMaster-version)
- [Aniket Desai](https://github.com/MASQUERADE-2005)

---
# What is our project ? 
This project aims to develop a robotic manipulator system capable of recognizing objects from a video input and executing pick-and-place tasks based on spoken commands.

We will be designing and developing the Intelligent Video Manipulator with Voice Commands, an innovative system that seamlessly integrates video processing and speech recognition technologies. Our goal is to enable users to interact with and manipulate video content using spoken commands.

# What have we done so far?
### Courses we completed
Since last 2 Weeks we went through ample amount of resources. Starting with Linear Algebra which is quite important for this project coz in order to build this manipualtor , Understanding of algebra and its meaning Geometrically has played a crucial role till present date. Later we studied and implemented ROS2 (Robot Operating System 2) to deal with the Manipulator in real time. 


### Forward and Inverse Kinematics
After competing this courses and it's implementation, We started with Forward Kinematics and Subsequently the Inverse. The Manipulator has various joints and links. To Control a Robot we can control it by Either Providing Joint Angles as input so that its End-effector reaches a particular point in it's Workspace or by providing Coordinates of the tip of the End-effector in Cartesian-Coordinate system.

The Latter is known as **Inverse Kinematics** and the former is known as **Forward kinematics**.

We have successfully completed the Forward and Inverse Kinematics Script of the 4-DOF manipulator. 

![fk](/assets/posts/Voice-Video-Manipulator/F.K.png) 

>The DH parameters are shown below:
![dh](/assets/posts/Voice-Video-Manipulator/DH.jpg)

---

>The expected and the actual Position were differing so in solution to that problem, We used a Transformation matrix denoted by T Matrix in the below image
![dh3](/assets/posts/Voice-Video-Manipulator/DH3.jpeg)

> The Final transformation Matrix 
![tm](/assets/posts/Voice-Video-Manipulator/Transformation_Matrix.jpg)
where l1,l2,l3,l4,l5 are link lengths

# What are we dealing with now
As of now we are learning and trying to implement the launch files for our inverse kinematics script and GAZEBO.

Also we have started with Machine learning(ML) courses simultaneously in order to enable the manipulator to recognize the *Objects* around it and take actions accordingly.

# Difficulties we faced 
We faced difficulty while finding DH Parameters for forward kinematics since there were various methods availaible across the web. Also inverse kinematics was a bit tricky. But with time, We figured it out.

>On running the inverse script,

![inv](/assets/posts/Voice-Video-Manipulator/inv.png)


