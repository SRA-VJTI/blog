---
layout: post
title: Starting with the RayTracer
tags:
    - ray-tracing
    - opengl
    - opencl
    - gpu-programming
    - C++
description: Tracing some Rays!!
---
# Mentees

Click on our names to go to our GitHub profiles.

+ [Aaditya Joil](https://github.com/JaytidaA)
+ [Rakshitha Kowlikar](https://github.com/RakshithaKowlikar)
+ [Rudrakshi Kubde](https://github.com/RudrakshiKubde)

# Introduction to RayTracing

RayTracing is a rendering technique that can realistically simulate the lighting of a scene and its objects by rendering physically accurate reflections, refractions, shadows, and indirect lighting.

RayTracing generates computer graphics images by tracing the path of light from the view camera (which determines your view into the scene), through the 2D viewing plane (pixel plane), out into the 3D scene, and to the light sources.

# What is OpenGL?

`OpenGL` is a **graphics API** which makes it possible for us to use and access our GPU (Graphics Processing Unit).

OpenGL is one of the many graphics APIs available in the market. Examples of a few others are:

+ Direct3D
+ Vulcan
+ Metal

Technically, OpenGL is a set of specifications that specify the function prototypes for various functions. It is preferred over others due to its cross-platform compatibility.

## Modern vs Legacy OpenGL

**Legacy OpenGL**:
+ It was a set of presets.
+ Short and easy to use code.
+ Provides less control.

**Modern OpenGL**:
+ Provides greater control.
+ The use of shaders is the primary distinction between Modern and Legacy OpenGL.

For our project, we will be using Modern `OpenGL`.

# The Graphics Rendering Pipeline

The `OpenGL` rendering pipeline is initiated when you perform a rendering operation. Rendering operations require the presence of a properly-defined vertex array object and a linked Program Object or Program Pipeline Object which provides the shaders for the programmable pipeline stages.

Once initiated, the pipeline operates in the following order:

1. Vertex Processing:
   + Each vertex retrieved from the vertex arrays (as defined by the VAO) is acted upon by a Vertex Shader. Each vertex in the stream is processed in turn into an output vertex.
   + Optional primitive tessellation stages.
   + Optional Geometry Shader primitive processing. The output is a sequence of primitives.
2. Vertex Post-Processing, the outputs of the last stage are adjusted or shipped to different locations.
   + Transform Feedback happens here.
   + Primitive Assembly
   + Primitive Clipping, the perspective divide, and the viewport transform to window space.
3. Scan conversion and primitive parameter interpolation, which generates a number of Fragments.
4. A Fragment Shader processes each fragment. Each fragment generates a number of outputs.
5. Per-Sample_Processing, including but not limited to:
   + Scissor Test
   + Stencil Test
   + Depth Test
   + Blending
   + Logical Operation
   + Write Mask

# What is OpenCL?

`OpenCL` (Open Computing Language) is an open standard for parallel programming of heterogeneous systems. It allows developers to write programs that execute across various computing platforms, such as CPUs, GPUs, FPGAs, and other processors. `OpenCL` is maintained by the Khronos Group, which ensures it remains vendor-neutral and widely applicable across different hardware architectures.

## Parts of OpenCL

1. **Command Queue**: The host program uses command queues to submit commands to the devices. Commands can include kernel execution, memory operations, and synchronization operations.
2. **Kernel**: A function written in OpenCL C that runs on the compute devices. Kernels are compiled and executed by the OpenCL runtime.
3. **Program Object**: Contains the source or compiled code of one or more kernels. The host program creates program objects and builds them for the target devices.

# What have we done so far

## Week 1 and Week 2

The first two weeks were spent in learning the different technologies and making ourselves familiar with `OpenGL`. We managed to succesfully render a Triangle and a Square with changing colours.

<video>
    <source src="/assets/posts/RayTracer-from-Scratch/videos/colour-changing-square.mp4" type="video/webm">
    Colour Changing Square
</video>

We then learned about the `glm` library for OpenGL and made use of that to set up a camera and render 3D graphics(a rotating pyramid). The `glm` library provides us with the useful containers present in `GLSL` such as vectors and matrices.

To render the pyramid, we set up a camera in 3D space and by making use of some clever Linear Algebra, we generated a few different transformation matrices which would help us in transforming the pyramid from *Local Space* to *World Space* to *View Space*.

For every frame, we also apply a Linear Transformation to the points of the Pyramid whic rotates it along the y-axis in the counter-clockwise direction as seen from above. This is the linear transformation.
![Rotate](/assets/posts/RayTracer-from-Scratch/images/Rotate.png)

<video>
    <source src="/assets/posts/RayTracer-from-Scratch/videos/rotating-pyramid.mp4" type="video/webm">
    Rotating Pyramid.
</video>

## Week 3 and Week 4

We then started work on our RayTracer project by referring to the book "[Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html)" by Peter Shirley.

We have successfully managed to render a sphere with realistic lighting using surface normals.

![Sphere with Lighting](/assets/posts/RayTracer-from-Scratch/images/rudy3.png)

# Going Forward

Now for the second month of the Eklavya program we have decided on the final workflow as follows. Creating a Raytracer with a sort of Sandbox like environment where the User has control over the following properties of the 3D shapes.

+ Position
+ Dimensions
+ Material
+ Texture

We will be working with `glfw` or `SDL` for the Windowing Operations. We will be integrating `OpenCL` as well and be running some benchmarks as well using the `<chrono>` library.
