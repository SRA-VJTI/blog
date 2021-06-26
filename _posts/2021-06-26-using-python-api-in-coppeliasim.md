---
layout: post
title: Using PythonAPI in CoppeliaSim
tags: simulation Python API
description: Basic functions and Usage of PythonAPI in CoppeliaSim
---
-- [Saad Hashmi](https://github.com/hashmis79)
* We can do many simulation tasks in CoppeliaSim, but the biggest turndown is that we will have to learn a whole new language called Lua. To overcome this CoppeliaSim provides us with an API with can connect CoppeliaSim to many languages including Python, C, C++. In this blog, we will be focusing on Setting up the Python API and some of its basic functions.

We will be covering the basic functions of Python API and their use in simulation</br>
* [Setting Up the Files](#setting-up-the-files)</br>
* [Establishing Communication with V-Rep](#establishing-communication)</br>
* [Retrieving Object Handles in python](#retrieving-object-handles-in-python)</br>
* [Setting Actuator Velocities](#setting-actuator-velocities)</br>
* [Retrieving Image data from Vrep to python](#retrieving-image-data)</br>
* [Putting it all together](#putting-it-all-together)

 
## Setting Up the Files
* For Setting up the API, we should add the necessary files to our working directory that are needed for the API which can be found in the CoppeliaSim installation Folder

1) Navigate to `CoppeliaRobotics\CoppeliaSimEdu\programming\remoteApiBindings\python\python` and copy all the .py files into the working directory</br>
2) Navigate to `CoppeliaRobotics\CoppeliaSimEdu\programming\remoteApiBindings\lib\lib`</br>
  Depending on the System you are on, you can select the folder (Windows, Ubuntu 16/18, MacOS)</br>
  copy the .dll, .so, or the .dylib file respectively to your working directory.
 
3) The next thing we want to do is that we have to create a threaded script in any component of the scene where you want to implement API.
<p align="center">
  <img src="/assets/posts/using-python-api-in-coppeliasim/PythonAPI_Adding_Script.gif" height ="512"/>
</p>
4) In the Script we should add the following statement in the sysCall_threadmain() function

```python
simRemoteApi.start(19990)
```

**Note: 19999 is the port that will be used for API communications, this can be defined by you.**

Now you are all set for using the PythonAPI in CoppeliaSim.
## Establishing Communication
* For Establishing Communication we need to follow the following steps :</br>
1) import the `sim` library in the code</br>
2) Add the below statements to the code

```python
sim.simxFinish(-1)

clientID = sim.simxStart('127.0.0.1',19990,True,True,5000,5)
```
**Note: The port being used in the statement should match the port number specified while setting up.**

* For Testing the establishment of communication you have to run the following code after starting the simulation in CoppeliaSim :
```python
import sim
import sys

sim.simxFinish(-1)

clientID=sim.simxStart('127.0.0.1',19990,True,True,5000,5)

if clientID != -1:
    print("Connected to the remote API server")
else:
    print("Connection not successful")
    sys.exit("Could not connect")
```
**Note: You have to run the Simulation before you run the Code or else the Connection would not be established**
<p align="center">
  <img src="/assets/posts/using-python-api-in-coppeliasim/PythonAPI_StartAPI.gif" height ="512"/>
</p>

## Retrieving Object Handles in python
* Object handles can be considered as a key or an ID which a component possesses. It is used to provide commands to a component(For eg. joint Velocity to a motor). PythonAPI also has an inbuilt function for that:

```python
sim.simxGetObjectHandle()
```

<table align="center">
    <tr>
     <td align="left"><b>Parameters</b></td>
     <td align="left"><b>clientID</b>: the client ID  <br/> <b>objectName</b>: name of the object. <br/><b>operationMode</b>: a remote API function operation mode. Recommended operation mode for this function is <code>sim.simx_opmode_blocking</code></td>
    </tr>
    <tr>
        <td align="left"><b>Return Values</b></td>
        <td align="left"><b>returnCode</b>: a remote API function return code </br> <b>handle</b>: the Object handle</td>
    </tr>
</table>

An Example of using this Function is :
```python
error_code,motor_handle = sim.simxGetObjectHandle(clientID,"Object Name in CoppeliaSim", sim.simx_opmode_oneshot_wait)
```
## Setting Actuator Velocities
* Setting actuator velocities is a really simple task. The following function can be used for it:

```python
sim.simxSetJointTargetVelocity()
```

<table align="center">
    <tr>
     <td align="left"><b>Parameters</b></td>
     <td align="left"><b>clientID</b>: the client ID  <br/> <b>jointHandle</b>: handle of the joint <br/><b>targetVelocity</b>: target velocity of the joint (linear or angular velocity depending on the joint-type)<br/><b>operationMode</b>: a remote API function operation mode. Recommended operation mode for this function is <code>sim.simx_opmode_oneshot</code> or <code>sim.simx_opmode_streaming</code></td>
    </tr>
    <tr>
        <td align="left"><b>Return Values</b></td>
        <td align="left"><b>returnCode</b>: a remote API function return code </td>
    </tr>
</table>

An Example of using this Function is :
```python
error_Code = sim.simxSetJointTargetVelocity(clientID,motor_handle,10,sim.simx_opmode_streaming)
```
## Retrieving Image data 
* We can also retrieve image data from CoppeliaSim using the following Function:

```python
sim.simxGetVisionSensorImage()
```

<table align="center">
    <tr>
     <td align="left"><b>Parameters</b></td>
     <td align="left"><b>clientID</b>: the client ID  <br/> <b>sensorHandle</b>: handle of the vision sensor <br/><b>options</b>: image options, bit-coded:bit0 set: each image pixel is a byte (greyscale image), otherwise each image pixel is a rgb byte-triplet<br/><b>operationMode</b>: a remote API function operation mode. Recommended operation mode for this function is <code>sim.simx_opmode_streaming</code></td>
    </tr>
    <tr>
        <td align="left"><b>Return Values</b></td>
        <td align="left"><b>returnCode</b>: a remote API function return code <br/> <b>resolution</b>: the resolution of the image (x,y)<br/><b>image</b>: the image data</td>
    </tr>
</table>


The image array returned by the function is a 1D Array. So for the image to be displayable we first resize the image and convert it to RGB formate using `NumPy`

An Example of using this Function is :

```python
errorCode,resolution,image= sim.simxGetVisionSensorImage(clientID,cam_handle,0,vrep.simx_opmode_streaming)
img = np.array(image,dtype = np.uint8)
img.resize = (resolution[0],resolution[1],3)
```
## Stopping Simulation 
* We can use the below function for stopping the simulation :

```python
sim.simxStopSimulation()
```

<table align="center">
    <tr>
     <td align="left"><b>Parameters</b></td>
     <td align="left"><b>clientID</b>: the client ID  <br/> <b>operationMode</b>: a remote API function operation mode. Recommended operation mode for this function is <code>sim.simx_opmode_oneshot</code></td>
    </tr>
    <tr>
        <td align="left"><b>Return Values</b></td>
        <td align="left"><b>returnCode</b>: a remote API function return code </td>
    </tr>
</table>

An Example of using this Function is :
```python
sim.simxStopSimulation(clientID, sim.simx_opmode_oneshot_wait)
```

## Putting it all together
* After learning all of the above functions. We will write a simple code for an environment containing a Vision sensor, a Pioneer_p3dx (under Mobile Robots), and a plant.
The below code establishes a connection with the simulation and commands the joint motors. It also retrieves the image from the vision sensor and displays after resizing it.

```python
import sim 
import sys
import numpy as np
import cv2

sim.simxFinish(-1)

clientID = sim.simxStart('127.0.0.1',19990,True,True,5000,5)

if clientID!= -1:
    print("Connected to Remote API Server")
else:
    print("Connection failed")
    sys.exit('Could not reconnect')

errorcode,left_motor_handle = sim.simxGetObjectHandle(clientID,'Pioneer_p3dx_leftMotor',sim.simx_opmode_oneshot_wait)
errorcode,right_motor_handle = sim.simxGetObjectHandle(clientID,'Pioneer_p3dx_rightMotor',sim.simx_opmode_oneshot_wait)
print("Given Target Velocities to the Joints")
errorcode,cam_handle = sim.simxGetObjectHandle(clientID,'Cam',sim.simx_opmode_oneshot_wait)
try:
    while True:

        sim.simxSetJointTargetVelocity(clientID,left_motor_handle,1,sim.simx_opmode_streaming)
        sim.simxSetJointTargetVelocity(clientID,right_motor_handle,1,sim.simx_opmode_streaming)

        errorCode,resolution,image=sim.simxGetVisionSensorImage(clientID,cam_handle,0,sim.simx_opmode_streaming)
        if len(image)>0:
            image = np.array(image,dtype=np.dtype('uint8'))
            image = np.reshape(image,(resolution[1],resolution[0],3))
            cv2.imshow("Image", image)
            cv2.waitKey(10)
except KeyboardInterrupt:   #Checks if ctrl+c is pressed 
    sim.simxStopSimulation(clientID, sim.simx_opmode_oneshot_wait)
    print("Stopping Simulation")
    pass
    
sim.simxFinish(clientID)
```
## Output :
<p align="center">
  <img src="/assets/posts/using-python-api-in-coppeliasim/PythonAPI_Final_Code.gif" height ="512"/>
</p>

## Finding the rest of the Functions 
* You can find the rest of the equivalent functions from the [PythonAPI Functions list](https://www.coppeliarobotics.com/helpFiles/en/remoteApiFunctionsPython.htm). You just have to search the Lua function's name and you will find the Python equivalent function and its description. 

## References Used
* [A video tutorial via a small project by Nikolai](https://youtu.be/SQont-mTnfM)</br>
* [The official API documentation and Functions List provided by CoppeliaSim](https://www.coppeliarobotics.com/helpFiles/en/remoteApiFunctionsPython.htm)</br>
* Learn more about streaming modes [here](https://www.coppeliarobotics.com/helpFiles/en/remoteApiConstants.htm#operationModes)
