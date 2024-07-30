---
layout: post
title: Implementing Convolutions on FPGA 
tags:
 - electronics
 - fpga
 - image processing
 - computer vision
description: Implementing convolution on FPGA
---


-- [Sujal Dwivedi](https://github.com/5usu)
-- [Yug Pachori](https://github.com/yug1025)
-- [Bhavesh Phundkar](https://github.com/shadyschrader)

## Convolution on FPGA: Our Journey So Far

## Introduction

Welcome to our exciting journey into the world of FPGAs and image processing! Our project, "Convolution on FPGA," aims to bridge the gap between theoretical computer vision and practical hardware implementation. We're exploring how to perform complex image convolutions using Field-Programmable Gate Arrays (FPGAs), a venture that combines the flexibility of software with the speed of hardware.

Why FPGAs for convolution? In an era where image processing is ubiquitous - from smartphone cameras to autonomous vehicles - the need for fast, efficient computation is paramount. FPGAs offer a unique solution: they provide the speed of dedicated hardware while maintaining the adaptability of reprogrammable circuits. This makes them ideal for implementing convolution operations, which are fundamental to many image processing and machine learning tasks.

Our project isn't just about implementing convolutions; it's about understanding the intricate dance between digital design, hardware constraints, and algorithmic efficiency. As we progress, we're not only learning about FPGAs and Verilog but also gaining insights into the challenges and opportunities in hardware-accelerated image processing.

Join us as we navigate through the complexities of digital electronics, dive deep into Verilog programming, and ultimately work towards implementing convolutional neural networks on FPGAs. Whether you're a seasoned hardware engineer or a curious beginner, we hope our journey inspires and informs your own explorations in this fascinating field.

## Our Progress

### 1. Learning Git and GitHub
- Mastered Git and GitHub for project management
- Successfully pushed notes, research papers, and documents

### 2. Exploring Digital Electronics
- Delved into adders, multiplexers, flip-flops, gates, and more

### 3. Researching FPGA and the Project
- Conducted in-depth research on FPGAs alongside our digital electronics studies

### 4. Learning Verilog Language
- Watched YouTube video lectures for basic understanding
- Solved problems on "HDLbits" ranging from basic concepts to FSMs
- Gained solid understanding of Verilog code
- Explored testbenches and waveforms
- Utilized Icarus Verilog, GTKWave, and EDA Playground

### 5. Assignments and Mentorship
- Completed mentor-assigned questions
- Engaged in problem-solving discussions

### 6. Learning Vivado
- Downloaded and began exploring Vivado

## Problems We Faced

Our journey wasn't without its challenges. Here are some of the key obstacles we encountered:

1. **Iteration Process in Verilog**: Implementing the convolution algorithm in Verilog proved challenging, particularly in managing the iteration process efficiently.

2. **Image Storage**: Finding an effective method to store and manipulate large image data within the FPGA's memory constraints was a significant hurdle.

3. **Vivado Installation on Linux**: The process of installing Vivado on Linux systems presented unexpected difficulties, requiring additional time and troubleshooting.

4. **FPGA Resource Management**: Balancing the computational requirements of convolution with the available FPGA resources demanded careful planning and optimization.

5. **Testbench Creation**: Developing comprehensive testbenches to verify our Verilog implementations was more complex than anticipated.

## Future Tasks: Convolutions

Our next big challenge is implementing convolutions. Here's our approach:

- We'll work with a 64x64 2D Array and a 3x3 Kernel
- Convert the 2D array into a 1D array (4096 elements), called signal-A
- Apply the same to the 3x3 kernel, resulting in a 9-element 1D array
- Perform convolution on these two 1D arrays

![Convolution Framework](/assets/posts/convolution-fpga/Convolutional-framework.png)

Our Verilog framework will include:
- Multiplexers to flip signals
- Binary multiplier for value multiplication
- Demux for storing values in registers
- Iterative process with value forwarding
- Full adders (8 single-bit adders) for final addition

## Kernels: The Heart of Convolution

Kernels, also known as "masks", determine the type of convolution applied to an image. Let's explore some standard kernels:

### 1. Gaussian Blur

![Guassian blur kernel](/assets/posts/convolution-fpga/Guassian-kernel.png)
![Gaussian Blur Effect](/assets/posts/convolution-fpga/Guassian-blur-effect.jpg)

- Higher values towards the center of the matrix

### 2. Sobel Operator

#### Sobel Edge Operator
![Sobel Edge Operator](/assets/posts/convolution-fpga/Sobel-edge-operator.png)
![Sobel Edge Effect](/assets/posts/convolution-fpga/sobel-edge-effect.jpg)

#### Sobel Sharpening Operator
![Sobel Sharpening Opertor](/assets/posts/convolution-fpga/sobel-sharpening-operator.png)
![Sobel Sharpening Effect](/assets/posts/convolution-fpga/sobel-sharpening-effect.png)

### 3. Box Blur

- The most basic blur
- All kernel values are the same
- Simple multiplication and division operation

## Convolutional Neural Networks (CNNs)

After mastering standard image convolutions, we plan to tackle Convolutional Neural Networks. CNNs excel at processing image, speech, or audio inputs and consist of three main layer types:

1. Convolutional layer
2. Pooling layer
3. Fully-connected (FC) layer

Stay tuned for our adventures in implementing CNNs on FPGAs!
