---
layout: post
title : ML Model on FPGA Week 2 progress
tags : FPGA electronics, convolutional neural networks
description : An ML model using CNN will be implemented on an FPGA, specifically targeting the MNIST dataset. This model will inherently be accelerated on the FPGA.
---
[Github Repository](https://github.com/Atharv1035/ML_Model_FPGA_Eklavya23)

## CONVOLUTIONAL NEURAL NETWORKS

![image alt](https://github.com/Atharv1035/blog/blob/master/assets/posts/ML_model_on_FPGA/Neural_network.jpg?raw=true)

A Convolutional Neural Network (CNN) is a type of artificial neural network specifically designed for processing and analyzing structured grid data, such as images and videos. CNNs have revolutionized various computer vision tasks, including image classification, object detection, image segmentation, and more. They are inspired by the human visual system and are particularly effective at learning hierarchical features from raw pixel data.

CNNs consist of several key components:

 __Input Layer:__
The input layer represents the raw data, typically images. Each neuron in this layer corresponds to a pixel's value in the input image, and the entire layer collectively forms the input tensor.
__Convolutional Layers:__
Convolutional layers are the core building blocks of CNNs. They consist of multiple filters (also known as kernels) that slide over the input image. These filters perform convolution operations to extract local patterns or features from the input.
Each filter learns to recognize specific patterns, such as edges, corners, or textures, by applying a series of mathematical operations on small receptive fields.
Convolutional layers often include activation functions (e.g., ReLU) to introduce non-linearity, helping the network learn complex features.

__Pooling Layers:__

Pooling layers are used to down sample the spatial dimensions of the feature maps produced by convolutional layers. Common pooling operations include         max-pooling and average-pooling.
    Pooling reduces the computational complexity of the network and helps in capturing invariant features, making the network more robust to variations in       scale     and position.
- #### Fully Connected Layers (Dense Layers):
    Fully connected layers are traditional neural network layers where each neuron is connected to every neuron in the previous and subsequent layers.
    These layers are typically placed at the end of the CNN architecture and are responsible for making final predictions or classifications based on the         extracted features.
- #### Flattening:
    Before passing data from the convolutional and pooling layers to the fully connected layers, the feature maps are often flattened into a 1D vector. This     operation converts the 2D spatial information into a format suitable for traditional neural network layers.
- #### Output Layer:
   The output layer of a CNN depends on the specific task. For image classification, it typically consists of one neuron per class and uses a softmax            activation function to produce class probabilities.
Backpropagation:
CNNs are trained using a supervised learning approach, where they are presented with labeled data (input and corresponding target output).
Backpropagation is used to update the network's weights and biases by minimizing a loss function, such as cross-entropy loss, to make the predicted output match the true labels.
In summary, Convolutional Neural Networks are a specialized type of neural network designed for handling grid-like data, such as images. They achieve state-of-the-art performance in various computer vision tasks by using convolutional and pooling layers to extract hierarchical features from the input data, followed by fully connected layers for making predictions.

### Softmax Function
The softmax function, often used in Convolutional Neural Networks (CNNs) and other neural network architectures, is a mathematical function that's used to convert a vector of real numbers into a probability distribution. It's particularly common in the output layer of a neural network when dealing with multi-class classification problems. The softmax function takes an input vector and returns another vector of the same dimension, where each element is transformed such that it represents the probability of belonging to a particular class.

Mathematically, the softmax function is defined as follows:

Given an input vector ```Z = [z_1, z_2, ..., z_k]```, the softmax function computes the output vector Y = [y_1, y_2, ..., y_k] as follows:

```y_i = exp(z_i) / (sum(exp(z_j)) for j=1 to k)```

In this formula:

```z_i``` represents the raw score or logit for class i.
```exp(z_i)``` computes the exponential of the raw score for class i.
The denominator computes the sum of exponentials of all raw scores, ensuring that the resulting probabilities sum to 1, which is a requirement for a valid probability distribution.
The softmax function essentially converts the raw scores (logits) into probabilities such that the class with the highest probability is the predicted class.

In a CNN for image classification, for example, the softmax layer typically takes the output of the last fully connected layer and applies the softmax function to produce class probabilities. The class with the highest probability is then chosen as the predicted class label.

The softmax function is essential for multi-class classification tasks because it provides a way to interpret the network's output as class probabilities, making it suitable for tasks where an input can belong to one of multiple possible classes.

## HOW CNN BASED LOGICS CAN BE USED IN CIRCUITS
Applying Convolutional Neural Network (CNN) logic to circuits involves using principles inspired by CNNs to process and analyze signals or data in the context of electronic circuits. Here are several ways in which CNN-like logic can be applied to circuits:

Signal Processing and Filtering:

CNN-like convolutional layers can be implemented in hardware to perform signal processing tasks. These layers can apply convolution operations to filter input signals, extract features, or enhance specific frequency components. This can be useful for tasks like noise reduction, signal denoising, and feature extraction in circuits.
Fault Detection and Diagnosis:

CNN-inspired architectures can analyze sensor data and voltage/current waveforms to detect faults and anomalies in electronic circuits. By training the network on labeled data, it can identify patterns associated with different types of faults, aiding in real-time fault diagnosis.
__Component Identification and Localization:__

CNN-like architectures can be used to identify and locate electronic components on a printed circuit board (PCB) or within an electronic system. This can be valuable for quality control, component placement verification, and maintenance purposes.

__Pattern Recognition in Waveforms:__

CNN-based models can recognize patterns in waveforms generated by electronic circuits. For example, they can identify specific modulation schemes in wireless communication signals, or they can recognize certain circuit behaviors indicative of performance issues.

__Circuit State Estimation:__

CNN-like networks can be used to estimate the state of a circuit based on sensor data. This could include predicting parameters such as temperature, voltage levels, or component health based on input data from various sensors.
Analog and Mixed-Signal Circuit Analysis:

CNN-like approaches can be used to analyze and classify analog and mixed-signal circuits. They can identify the type of circuit (e.g., amplifier, filter, oscillator) or analyze the response of analog circuits to different input conditions.

__Image Processing for PCB Inspection:__

In cases where images of PCBs or circuit layouts are available, CNNs can be used for tasks like PCB defect detection, component placement verification, or OCR (Optical Character Recognition) for identifying component labels or values.

__Predictive Maintenance:__

CNNs can analyze sensor data from circuits to predict when maintenance is required. By learning patterns associated with component degradation or wear, these models can provide early warnings for maintenance.
Security and Anomaly Detection:

CNN-like architectures can be applied to detect security vulnerabilities or unauthorized access in electronic circuits or communication systems by analyzing patterns of data traffic and communication behavior.
Resource Optimization:


## HOW CAN CNN BE APPLIED IN CIRCUITS USING FPGA
![](https://github.com/Atharv1035/blog/blob/master/assets/posts/ML_model_on_FPGA/FPGA%20vs%20MCU%20fig%201.png?raw=true)

Using Convolutional Neural Networks (CNNs) in circuits with Field-Programmable Gate Arrays (FPGAs) is a powerful combination that can accelerate the execution of CNN-based tasks while also enabling real-time processing and low-latency applications. Here's a high-level overview of how CNNs can be implemented on FPGAs for circuit-related tasks:

Hardware Acceleration with FPGA:

FPGAs are reconfigurable hardware devices that can be programmed to implement custom digital circuits. To use CNNs on FPGAs, you first need to design and implement custom hardware accelerators for convolutional and other CNN operations. This is done using Hardware Description Languages (HDL) like VHDL or Verilog.

CNN Model Optimization:

Since FPGAs have limited resources compared to GPUs or specialized AI chips, it's essential to optimize your CNN model for FPGA deployment. This involves techniques like quantization (reducing precision), pruning (removing redundant weights/neurons), and model compression to reduce the FPGA resource requirements.

Deployment on FPGA:

Once the custom hardware accelerator for the CNN operations is designed, it needs to be synthesized and loaded onto the FPGA. This is often done using FPGA development tools provided by FPGA vendors, such as Xilinx Vivado or Intel Quartus.

Interface and Data Flow:

Design an interface between the FPGA and the external world. In circuit-related applications, this interface could involve capturing images or sensor data and providing the results of CNN processing. Ensure that data flow between the external world and the FPGA accelerator is efficient.

Real-time Processing:

FPGAs are known for their low-latency and real-time processing capabilities. This makes them suitable for applications where quick responses are required, such as fault detection in electrical circuits.

