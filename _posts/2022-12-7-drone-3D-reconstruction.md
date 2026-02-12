---
layout: post
title: Resolute with ROS:Mapping Our Journey in 3D Terrain Reconstruction
tags: ROS-Noetic Gazebo-Sim RViz Point-Cloud-Library
description: Flying a drone over some terrain in ROS with a GPS and a Depth Sensor and to construct a 3D model of that terrain with the incorporation of the Point Cloud Library (PCL).
---

-- [Soham Mulye](https://github.com/Shazam213)

# Resolute with ROS: Mapping Our Journey in 3D Terrain Reconstruction

A weird title, we understand, but it quite aptly describes our experience with this project. A journey, which began as a set of four thrilling tasks and interviews, ended after two months of research, learning and debugging. We started out as two individuals who were new to almost all avenues of robotics. Thankfully, we had the guidance of some great mentors and an amazing community thanks to our college club: [SRA](https://sravjti.in/).

With that introduction out of the way, let the revisitation begin!

<p align="center"><img src="https://user-images.githubusercontent.com/95737452/197512838-9445530c-ff03-467c-8638-413697da07aa.gif" width="600" height="400"/></p>


## Idea of the Project

The idea of our **research-based** project stems from the visualisation of a drone flying over a terrain and reconstructing it simultaneously in simulation. We wanted to understand:
* What do you mean when you say "data" of the terrain, and how does a drone actually obtain this data? (*answer* = Point Cloud Data, using LiDAR Sensors in ROS/Gazebo, more on that later:wink:),
* Assuming we have the data, how do you convert it to a 3D Model to look *exactly* like the terrain? (*answer* = Point Cloud Library, more on that too) Fascinating questions to be answered.

Basically we wanted to get involved in the depths of the reconstruction process, which required us to be aware of certain technologies, which are as follows:



## Tools & Technologies:

<table>
<tr>
<td> 1. ROS (Robot Operating System)</td>
<td align="center" height="200"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ros_logo.svg/723px-Ros_logo.svg.png" width="500" height="100" /></td>
<td width="300">ROS is an open-source, meta-operating system for your robot. Basically ROS enables us to control our Drone (and its specific parts) using Python/C++ code.</td>
</tr>
<tr>
<td> 2. Gazebo</td>
<td align="center" height="200"><a href="https://gazebosim.org/docs"><img src="https://gazebosim.org/assets/images/gazebo_horz_pos_topbar.svg" width="500" height="200" /></a></td>
<td>Gazebo is an open-source 3D robotics simulator fo research, design and development. It has several plugins to work in sync with ROS, an extensive set of sensor and noise models, and several plugin-based interfaces to physics engines and rendering engines.</td>
</tr>
<tr> 
<td> 3. RViz </td>
<td><img src="https://raw.githubusercontent.com/ros-visualization/rviz/noetic-devel/images/splash.png"</td>
<td>RVIZ is a ROS graphical interface that allows you to visualize a lot of information, using plugins for many kinds of available topics</td>
<tr>
<td> 4.LiDAR Sensors</td>
<td colspan="2"> <a href="https://geoslam.com/what-is-lidar/"><img src="https://user-images.githubusercontent.com/95737452/197457164-dc5aea8e-07d1-4595-a982-1d8ece32eada.png" align="center"/></a><br> <img src="https://user-images.githubusercontent.com/95737452/197497920-dc661b0f-a265-4832-b31e-deace9587fa8.png" align="center" /> <br><img src="https://user-images.githubusercontent.com/95737452/197501820-8d568dc8-5e79-43f4-bbb2-63a02047db7e.png" />
</td>
</tr>
<tr>
<td rowspan="2"> 5. MoveIt!</td>
<td rowspan="2" align="center"><img src = "https://user-images.githubusercontent.com/95737452/197499756-3b261737-1f3c-4c85-a500-c84817b758ad.png" align="center"/>
</td>
<td rowspan="1">MoveIt is the most widely used software for manipulation. Powerful out-of-the box visual demonstrations and easy-to-use Setup Assistant are some of its functionalities. It can be used to form a powerful robotics development platform, when used in combination with Gazebo and ROS Control. </td>
</tr>
<tr>
<td rowspan="1">As beautiful as MoveIt sounds in theory, we had to abandon this approach after a series of issues:disappointed:. More on that in section ssds</td>
</tr>
<tr>
<td> 6. PCL(Point Cloud Library)</td>
<td><img src="https://user-images.githubusercontent.com/95737452/197502385-0961066f-146d-430f-8883-b1651a2e8514.png"/>
</td>
<td>The Point Cloud Library is a standalone, large scale, open project for 2D/3D image and point cloud processing, and is free for commercial and research use. PCL into a series of modular libraries, that support several functionalities in processing like subsampling, normal estimation, and meshing.</td>
</tr>
</table>


## Method of Execution #1 (Intial Approach)

**Primary Clarity**: This part describes the ~~Method That Didn't Work~~ Method That Developed our Fundamentals :smile:

### STEP I: Get The Drone Working in ROS & Collect Data

* For this step, we utilised the Quadrotor Model as developed by [Wil Selby](https://www.wilselby.com/research/ros-integration/3d-mapping-navigation/) that incorporated the use of state-of-the-art software called [MoveIt!](https://moveit.ros.org/)
* At the expense of sounding like paid promotion, MoveIt is the most widely used software for manipulation and has been used on over 150 robots, and is free for industrial, commercial, and research use. By incorporating the latest advances in motion planning, manipulation, 3D perception, kinematics, control and navigation, MoveIt gets it's state-of-the-art title.

<table>
<tr>
<th colspan="8">The Desired Way of Execution</th>
</tr>
<tr>
<td colspan="7" rowspan="5" align="center" width="700" height ="400"><img src="https://user-images.githubusercontent.com/95737452/197484687-10c5edc6-4e16-454e-8520-c1ada56c1391.png" width="400" height="400" /></td>
<td colspan="1" rowspan="1" width="400" >Given alongide is a really complex diagram of what this package entirely does.</td>
</tr>
<tr>
<tr>
<td colspan="1" rowspan="1" width="400">To oversimplify it, our quadrotor model integrated external sensors and controllers and data from something called the parameter server.</td>
</tr>
<tr>
<td colspan="1" rowspan="1" width="400">This allowed the creation of a ROS interface to manipulate the quadrotor in Gazebo.</td></tr>
<tr>
<td colspan="1" rowspan="1" width="400">The Quadrotor traced a pre-defined path (<b>trajectory</b>) to incorporate any rotational and translational changes.</td></tr>
<tr>
<th colspan="4">The Kitchen World in Gazebo to be traced by the Quadrotor</th>
<th colspan="4">Representation in RVIZ after the quadrotor would have completed navigating a pre-defined path in the kitchen world with a Kinect motion sensor attached.</th>
</tr>
<tr>
<td colspan="4" align="center"><img src="https://user-images.githubusercontent.com/95737452/197488987-7385ff8a-4a73-4525-b9d3-40c4ea33c99d.png"/></td>
<td colspan="4" align="center"><img src="https://user-images.githubusercontent.com/95737452/197488428-3762db85-6e9e-48f4-bbf1-213efd56df98.png"/></td>
</tr>
</table>

This would've executed smoothly, had we been operating on ROS Melodic...But we were using ROS Noetic and opposed to our belief it stirred up a much greater number of problems.:disappointed:

<details>
<summary>Comedy of Errors</summary>
<table>
<tr>
<th colspan="2"> Fixed Frame: Global Status Erorr</th>
<th colspan="2"> Build Errors</th>
</tr>
<tr>
<td align="center">Expected Output</td>
<td align="center">Our Error</td>
<td colspan="2" align ="center">After switching from catkin_make to catkin build</td>
</tr>
<tr>
<td><img src="https://user-images.githubusercontent.com/95737452/197504727-4deb70d7-3751-4ea2-b76c-e2903cf524d8.png" width="400"/>
</td>
<td><img src="https://user-images.githubusercontent.com/95737452/197504186-d52f20a6-dd6c-4f2d-aea0-73f5246cbd89.png" width="400" height="200"/></td>
<td colspan="2"><img src="https://user-images.githubusercontent.com/95737452/197505172-cd5ad967-8744-4c06-9df3-68d231edd558.png"/>
</td>
</tr>
</table>
</details>

These are just two among several errors, following which we <i>had</i> to abandon this approach. However, to make it approach work isn't completely impossible, but there were just two many quote, hoops to jump through.
<p align ="center"><img src="https://user-images.githubusercontent.com/95737452/197506778-f8afa6b2-21df-434f-97cc-fa4079bfb9f6.png"/></p>
And like Damon Salvatore once said, and we quote:

<p align ="center"><b>“There is no such thing as bad ideas. Just poorly executed awesome ideas.”</b></p>

This might be good time to point out that one of our contributors (Unmani) has a known history of not getting things done right in the first attempt. Cheers to that record still being intact! :wine_glass:

## Method of Execution #2 (That Worked!)

For this approach, we used the **sjtu_drone** as developed by [Danping Zou and Tahsincan Köse](https://github.com/tahsinkose/sjtu-drone.git) for Shanghai Jiao Tong University.

### ROS Communication

<details>
<summary> Now if you open this dropdown, you might be made familiar with certain technical terms which might not totally be necessary. What you should know is that we found a way to obtain Point Cloud Data of the terrain. And if you'd like to continue without this abstraction, go ahead, open it! :smile:</summary>
<table>
<tr>
<th colspan="5" height="20">ROS Master & Nodes</th>
</tr>
 <tr>
  <td colspan="4" rowspan="4" align="center"><img src = "https://user-images.githubusercontent.com/95737452/197467573-4d29d847-05f7-4ab5-8880-110d42f9d3f2.png" width="600" height="300" /></td>
  <tr>
    <td colspan="1" rowspan="1">ROS starts with the ROS Master. The Master allows all other ROS pieces of software (Nodes) to find and talk to each other.</td>
  </tr>
  <tr>
  <td colspan="1" rowspan="1">That way, we do not have to ever specifically state “Send this sensor data to that computer at 127.0.0.1. We can simply tell Node 1 to send messages to Node 2. </td>
  </tr>
  <tr>
  <td colspan="1" rowspan="1">So yes, Master is pretty much your average Godfather.</td>
  </tr>
<tr>
<th colspan="5">ROS Topics</th>
</tr>
<tr>
<td colspan="4" rowspan="6" align="center"><img src = "https://user-images.githubusercontent.com/95737452/197461590-93e4edbd-1a1d-446c-9120-c9de2530225d.png" width="2000" height="300" /></td>
</tr>
<tr>
<td colspan="1" rowspan="1">Like we said earlier,ROS Nodes are used for communication. How do Nodes do this? By publishing and subscribing to <b>Topics</b>, and utilising <b>Services</b>. </td>
</tr>
<tr>
<td colspan="1" rowspan="1">The depth camera (<b>Microsoft Kinect</b>) that we integrated with our model publishes point clouds to ROS topics.</td>
</tr>
<tr>
<td colspan="1" rowspan="1"> Gazebo, being the godsent that it is, is entirely is a Node in itself! </td></tr>
<tr>
<td colspan="1" rowspan="1"> Hence, Gazebo (/gazebo, if we're being technical) publishes the PCD to a topic (let's call it /3d_cloud). 
</td>
</tr>
<tr>
<td colspan="1" rowspan="1">and our Processing subsrciber node (/sub_pcl) obtains this PCD by subscribing to this very topic.
</td>
</tr>
<tr>
<th colspan="5">ROS Servies</th>
</tr>
 <tr>
  <td colspan="4" rowspan="5" align="center"><img src = "https://user-images.githubusercontent.com/95737452/197478966-1579428d-603d-4705-80d3-ae11271ba08a.png" width="400" height="400" /></td>
  </tr>
  <tr>
  <td colspan="1" rowspan="1">ROS Services are similar to Topics in their purpose aka data transmission, but differ in their manner of operation.</td>
 </tr>
 <tr>
 <td colspan="1" rowspan="1"> Services will be used when you need a client/server architecture, i.e., data transmission occurs on-request.</td>
 </tr>
 <tr>
 <td colspan="1" rowspan="1"> Unlike topics, where a publisher keeps on publishing data and the subsriber may subscribe to it whenever required, <i>both actions independent of each other</i>.</td>
 </tr>
 <tr>
 <td colspan="1" rowspan="1">To conclude, you can see that ROS services complements topics well. </td>
 </tr>
</table>
</details>

The problem, however, didn't end there. The PCD we obtained was in reference to the **drone**, and not with respect to the fixed world frame. For this, we had to incorporate the logic of translation between frames, and we did so by obtaining the coordinates of the drone in each frame using the ROS Service ```get_model_state()```, as explained in the above drop-down.

<table>
<tr>
<th>Terrain to be mapped in simulation</th>
<th>The sjtu_drone quadrotor simulation model</th>
<th>PCD of the terrain</th>
</tr>
<tr>
<td><img src="https://user-images.githubusercontent.com/95737452/197513672-178c108d-e031-454e-9182-d1ef2145a553.png"/></td>
<td><img src="https://user-images.githubusercontent.com/95737452/197513815-0f754de6-f68b-4857-bea0-de378f6d7f9c.png"/></td>
<td><img src="https://user-images.githubusercontent.com/95737452/197513912-3b32ebf6-3082-4c98-aeb5-3992848147d6.png"/></td>
</tr>
</table>
<p align="center"><b>*Drumrolls* And thus we had the PCD of the terrain with our Quadrotor, after weeks!:tada:</b></p>

### Surface Reconstruction

Now that we actually had the PCD of the terrain, the next step was to create a 3D Model of the terrain from this data.

This series of steps can be simply illustrated as:

![image](https://user-images.githubusercontent.com/95737452/197510503-c0b727f0-c7d2-4497-9df0-20d7640d3585.png)

And you think this was without errors? Oh no, of course. What is life without pain, anyways:smile: 

Here's a slide that illustrates how our outputs improved sequentially:
![image](https://user-images.githubusercontent.com/95737452/197511915-07e4a8f2-3cdf-421e-9366-929a6317e562.png)

<p align ="center"><b>And there it was, the 3D Model of our terrain!:confetti_ball::confetti_ball:</b></p>

## Conclusion
    
Being First Year students this was the first "real" big team project we had worked on. Here are a few things we learnt (sometimes painfully so) about not only developing but working on any project in general:
    <ul>
    <li>Learning becomes much more fun if you get to apply it alongside! 🧑‍🔬</li>
    <li>Having well-thought and curated resources can go a loooong way. 📚</li>
    <li>There SHOULD be a course for effective Googling taught in all schools. 💻</li>
    <li>The best Mentors are the ones who can guide and nudge you in the right directions while letting you figuring out the solutions on your own. 🧑‍🏫</li>
    <li>Having a teammate who you can understand and communicate with easily makes any project 50% easier and a 100% more fun! 🥳</li>
    <li>The final vision of a project is much <b>much</b> different at the beginning than the end. 👓</li>
    <li>Having to scale back your orignal goals to meet deadlines isn't as much accepting defeat as it is an exercise in prioritization. 😣🏆</li>     
    </ul>
    
So, to any of our fellow programmers or just anyone who cared to read till this point if there's anything to take away from this blog post, it's that **no matter what you want to do, you have the capacity to do it. Even if you have no idea how to, you can learn to.**


After all, if two First Years with nothing more than some time and a hell lot of resolve can recreate a 3-dimensional model of a terrain, you can do whatever you put your mind to too. 😊

## Links and Further Reading
- If we managed to hold your interest for this long, then try taking a look at our project [GitHub](https://github.com/Shazam213/drone-terrain-reconstruction-.git)
- If you want to go in depth with the code and theory, take a look at our [project report](https://github.com/Shazam213/drone-terrain-reconstruction-/blob/main/project-report.pdf)
- If you'd like to learn more about Surface Reconstruction, take a look at this wonderful [paper](https://nccastaff.bmth.ac.uk/jmacey/OldWeb/MastersProjects/MSc13/14/Thesis/SurfaceReconstructionThesis.pdf) by Navpreet Kaur Pawar 
- Check out our ever-present and helpful mentors: [Jash Shah](https://github.com/Jash-Shah), [Sarrah Bastawala](https://github.com/sarrah-basta)
- If you'd like to learn more about us and what we do check out our profiles: [Soham Mulye](https://github.com/Shazam213), [Unmani Shinde](https://github.com/unmani-shinde)
