---
layout: post
title : ML Model on FPGA
tags : FPGA  electronics
description : An ML model will be implemented on an FPGA, specifically targeting the MNIST dataset. This model will inherently be accelerated on the FPGA.
---
## Introduction

 -- Atharv Patil :  [Github] (https://github.com/Atharv1035) 
  
  I'm Atharv Patil from BTech Electronics . I opted for this project because of my interest and inclination towards the domains of ML and Embedded Systems & FPGA's. Neural Networks are fascinating for me and I aim to build a strong foundation through this project that would help me further.
  In this project, I will be using FPGA's and neural networks to create a machine learning model that can distinguish between handwritten digits.
  
 -- Soha Jawdekar :[Github] (https://github.com/Sohajawdekar)

ABOUT MYSELF 

I am Soha Jawdekar from electronics and telecommunication branch. I am always looking forward to new learning opportunities. I am looking forward to learning the practical side of electronics field , how the devices actually work, and can be modified to make them better. I am on a journey of exploring all the options and grabbing all the opportunities that I encounter, and make the best out of it.

WHY I CHOSE THIS PROJECT

I picked the ml model on fpga project out of all the fascinating ones. I found the reconfigurability and parallel processing of fpga to be really intriguing. Learning fpga programming is something I am eager to do. Although the brain is a tremendously potent instrument, it is extraordinary when identical networks and capabilities are developed in robots. I've always been curious in how something as highly functional as a human brain can be duplicated. With the aid of this project, I will be able to design a neural network from scratch and use it on an FPGA to learn how it functions.

## Project Description & Domains

### What we will be doing in this project
- __DESCRIPTION__ : An ML model will be implemented on an FPGA, specifically targeting the MNIST(**Modified National Institute of Standards and Technology database**) dataset. This model will inherently be accelerated on the FPGA. The MNIST dataset consists of a large database of handwritten digits that is commonly used for training various image processing systems.We will be creating an ML model and train it to accurately detect any number from the MNIST dataset on an FPGA.
### What is an FPGA & how do they work ?
Field Programmable Gate Arrays (FPGAs) are semiconductor devices that are based around a matrix of configurable logic blocks (CLBs) connected via programmable interconnects. A FPGA is an Integrated Circuit  (IC)  that contains an array of reprogammable logic gates/components. Conventional IC's like microcontrollers and microprocessors have a fixed digital circuit design/structure that cannot be modified ; all modifications are possible only at the software level. FPGA's , on the other hand are made up of CLB(Configurable Logic Blocks) that can be reprogrammed as per the user requirements.
FPGA's are programmed using Hardware Description Languages (HDL's) .A hardware description language is a specialized computer language used to describe the structure and behavior of electronic circuits, and most commonly, digital logic circuits. Two of the most commonly used HDL's are Verilog HDL and VHDL . HDL's describe the basic layout/design of a circuit /circuit element ranging from basic wires & logic gates to flip-flops and multiplexers(mux).

![](/assets/posts/ML_model_on_FPGA/FPGA vs MCU fig1.png)

### What is Machine Learning ?
Machine Learning is a branch of AI that aims to study and imitate human learning patterns using data sets and algorithms.Instead of being explicitly programmed to perform a specific task, machine learning systems use patterns and data to improve their performance over time.
__So , how does ML actually work ?__
We can consider the working of a machine learning algorithm as follows :
_1) A Decision Process_: In general, machine learning algorithms are used to make a prediction or classification. Based on some input data, which can be labeled or unlabeled, your algorithm will produce an estimate about a pattern in the data.
_2) An Error Function_ : An error function evaluates the prediction of the model. If there are known examples, an error function can make a comparison to assess the accuracy of the model.
_3) A Model Optimization Process_: If the model can fit better to the data points in the training set, then weights are adjusted to reduce the discrepancy between the known example and the model estimate. The algorithm will repeat this “evaluate and optimize” process, updating weights autonomously until a threshold of accuracy has been met.  

### What are Neural Networks ?
Neural networks are computational models inspired by the structure and functioning of the human brain's interconnected neurons.
The basic components of a neural network include:
	1. **Input Layer:** This layer receives the initial data or features that are used as input to the network.    
	2. **Hidden Layers:** These layers are intermediate layers between the input and output layers. Each neuron in a hidden layer performs a weighted sum of its inputs, applies an activation function, and produces an output that serves as the input for the next layer.
	3. **Output Layer:** This layer produces the final output of the network, which can be in the form of predictions, classifications, or any other desired output.

 ![](/assets/posts/ML_model_on_FPGA/Neural_Network.jpg)





