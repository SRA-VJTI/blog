---
layout: post
title: GyroGlidder
tags: 
    - Robotics
    - Dshot protocol
    - Fusion360
    - Ansys
    - PID 
description: Developing a Semi Drone mode for Evoborne.
---

## Mentees  :
- [Kesar Sutar Parmar]
- [Ameya Tikhe ]
- [Soham Kute]
- [Atharve Khare]

---
# What is our project ? 
EvoBorne, a versatile robot being developed by SRA, designed to conquer diverse landscapes both in the air and on the ground. This morphable marvel transitions effortlessly between drone mode, where it soars through airspace, and a quadrupedal form for terrestrial traversal.
Equipped with a clever configuration of two wheels and two thrusters, the project aims to imbue EvoBorne with autonomous self-balancing capabilities. This will enable the robot to navigate even the steepest terrains in a semi-drone mode, combining the best of aerial and ground mobility.

The ultimate goal? EvoBorne will have a semi-drone mode, allowing it to navigate any environment with ease. This semi-drone capability represents a significant step forward in the evolution of robotics, promising seamless and agile movement across all types of challenging terrain. By use of cutting-edge technologies like SLAM (Simultaneous Localization and Mapping) and advanced trajectory planning EvoBorne bot will achieve full autonomy to traverse through its environment. This is the exciting vision driving the development of EvoBorne

# What have we done so far?
### Courses we completed
Since last 2 Weeks we went through ample amount of resources. Starting with Linear Algebra which is quite important for this project. Understanding of algebra and its meaning Geometrically has played a crucial role till present date. Later we studied and implemented Dshot protocol to deal with the ESC and work with BLDC, we have studied Fusion 360 for mechanical designing of the project and Ansys to test its strength. 


### Practical Implementaion
After competing this courses we started it's implementation, As it was not safe to directly try the semi drone mode on Evoborne therefore we created a testmodel 'T' shape clamp and mounted two bldcon its end . for running the bldc we develope the code using dshot protocol, but while testing it, it didnt work on bldc and one of the BLDC was burnt and both were not on same speed therefore we switched to different BLDC motor, and trying to find the balance

We have successfully completed the run of motors using ESC and now trying to find the balance

---
# What are we dealing with now
To Find the mathematical equation for adjusting the angle of inclination when we mount the propelers

# Difficulties we faced 
While building the code and flashing it
