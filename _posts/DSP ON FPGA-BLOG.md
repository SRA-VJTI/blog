---
Layout: post
Title: FPGA
tags:
  - FPGA
  - electronics
  - signals
  - blog
  - sra.
Description: " video processing on fpga for real-time edge detection"
---

--[Mayank Herode]()

–[Abhinav Ananthu](https://github.com/account)


# Introduction to FPGA

## What is FPGA?

FPGA stands for “Field-Programmable Gate Array.” It’s a type of computer chip that can be programmed to perform specific tasks after it’s manufactured. It’s like a digital Swiss army knife that can be customized to do different things, from processing signals to running complex calculations, by programming it with instructions.
*FPGAs-Icon_4x.png
VERILOG

Verilog is a hardware description language used for designing and modeling digital circuits and systems. It’s like a coding language specifically for designing computer chips and electronic circuits. With Verilog, engineers can describe how different components in a chip should work together, allowing for the creation of complex digital systems.
Utility of FPGA in our project

In a “DSP on FPGA” project, an FPGA is like a special computer chip that’s programmed to do specific math tasks quickly. It’s used to process signals like sounds or images using custom-designed algorithms. The FPGA’s unique design allows it to perform these tasks super fast and efficiently, making it great for things like real-time audio processing or high-speed data analysis. It’s like having a super-powered math chip that you can customize for different jobs!
DSP ON FPGA
## Aim of the project->

The objective of the “DSP on FPGA” project is to leverage Field-Programmable Gate Arrays (FPGAs) for efficient execution of digital signal processing (DSP) algorithms. This entails optimizing real-time signal processing, capitalizing on FPGA’s parallel processing and customization capabilities. The project aims to enhance signal quality, speed, and precision, catering to applications spanning audio, video, telecommunications, and medical devices, among others, by creating tailored hardware solutions that excel in rapid and accurate signal manipulation.

### Edge Detection 
Edge detection is a fundamental concept in image processing and computer vision. It refers to the process of identifying the boundaries or edges of objects within an image, where abrupt changes in intensity or color occur. These edges typically correspond to object boundaries, significant features, or regions of interest in the image. Edge detection is a crucial step in various computer vision tasks, including object recognition, image segmentation, and feature extraction. Here are some key points about edge detection:
Purpose of Edge Detection:

Feature Extraction: Edge detection is often used to extract meaningful features from images, such as lines, contours, and shapes.
    Image Segmentation: Edge information can be used to divide an image into regions or segments based on object boundaries.
    Object Recognition: Edges help in recognizing objects and shapes within an image.
    Image Enhancement: Edge-enhanced images can be visually more appealing and can be easier to analyze.
    Common Edge Detection Techniques:

Gradient-based Methods: These methods compute the gradient of the image intensity to detect edges. The gradient is calculated using convolution with filters like the Sobel, Prewitt, or Scharr operators.
    Laplacian of Gaussian (LoG): This method involves smoothing the image with a Gaussian filter and then applying the Laplacian operator to highlight regions of rapid intensity change.
    Canny Edge Detection: Canny is a popular and effective edge detection algorithm that combines Gaussian smoothing, gradient calculation, non-maximum suppression, and edge tracking by hysteresis.
    Zero Crossing Detection: Zero crossings in the second derivative of the image can be used to detect edges.
    Edge Filters: Custom-designed filters can be used to detect edges based on specific characteristics of the image.

### Challenges in Edge Detection:

Noise Sensitivity: Noise in images can lead to false edge detections. Preprocessing, such as image smoothing, is often required to reduce noise.
    Threshold Selection: Determining appropriate thresholds for edge detection can be challenging and may depend on the specific application.
    Incomplete or Disconnected Edges: Some edge detection methods may produce incomplete or disconnected edges, requiring additional processing to link or refine them.

 ### Applications:

Object Detection: Detecting and localizing objects within images or video frames.
    Robotics: Used for tasks like navigation and object manipulation by robots.
    Medical Imaging: Identifying anatomical structures and abnormalities in medical images like X-rays and MRIs.
    Quality Control: Inspecting products on assembly lines by detecting defects.
    Autonomous Vehicles: Critical for perception and obstacle avoidance in self-driving cars.
    Image Editing: Enhancing images by emphasizing or altering edges.
    Biometrics: Extracting features for facial recognition, fingerprint analysis, etc.
    
EDGE DETECTION
Canny edge detection is a widely used image processing technique for detecting edges within an image. It was developed by John F. Canny in 1986 and is considered one of the most effective and widely used edge detection algorithms. Canny edge detection is particularly useful in various computer vision and image processing applications, such as object recognition, image segmentation, and feature extraction.

Here's how the Canny edge detection algorithm works:

Noise Reduction (Gaussian Blur): The first step in Canny edge detection is to reduce noise in the image. Noise can lead to false edge detections. To do this, a Gaussian blur is applied to the image, which smooths out small variations in pixel intensity.

Gradient Calculation: Next, the gradient of the image is calculated. The gradient represents the rate of change of intensity at each pixel and helps identify regions of rapid intensity change, which often correspond to edges. Typically, the gradient is calculated using convolution with Sobel or Prewitt operators in both the horizontal and vertical directions. These operators highlight the changes in pixel intensity along these two directions.

Non-Maximum Suppression: In this step, the algorithm goes through every pixel in the gradient magnitude image and checks if it is a local maximum along the direction of the gradient. If a pixel's gradient magnitude is greater than its neighbors in the direction of the gradient, it is retained; otherwise, it is suppressed (set to zero). This step helps to thin the edges and keep only the most significant points along an edge.

Edge Tracking by Hysteresis: To detect and link edges, Canny edge detection uses a technique called edge tracking by hysteresis. This process involves defining two thresholds: a high threshold (T_high) and a low threshold (T_low). Pixels with gradient magnitudes above T_high are considered strong edge pixels, while those below T_low are considered non-edge pixels. Pixels with gradient magnitudes between these thresholds are considered weak edge pixels.
        Strong Edge Pixels: These pixels are almost certainly part of an edge.
        Weak Edge Pixels: These pixels may or may not be part of an edge.
        Non-Edge Pixels: These pixels are unlikely to be part of an edge.

The algorithm then tracks and connects weak edge pixels to strong edge pixels. If a weak edge pixel is adjacent to a strong edge pixel, it is considered part of the edge. This helps to link discontinuous edge segments.

Edge Thinning: In this optional step, the algorithm may perform edge thinning to further refine the detected edges by eliminating weak or noise-induced edges.

Canny edge detection produces a binary image where edge pixels are marked as white, and non-edge pixels are marked as black. The resulting image typically provides a clear representation of the edges in the original image.

Canny edge detection is known for its ability to detect edges accurately and robustly while suppressing noise. However, choosing appropriate threshold values (T_high and T_low) can be a challenge, and these values may need to be adjusted depending on the specific application and image characteristics.

 ## PROJECT UPDATES:
1.VERILOG- We began by mastering the HDL language from its origin with some sort of theory .
https://www.chipverify.com/tutorials/verilog

2.VERILOG QUESTION PRACTICE- We did practice for the verilog language from website -https://hdlbits.01xz.net/wiki/Wire


3.EDGE DETECTION- We started our tour after learning briefly about verilog ,i.e. Edge Detection. Read Research Papers on it , for further and deep understanding of the concepts.

4.CANNY EDGE DETECTION- The major topic of our project begins with this , canny edge detection .
We learn here about the Majoe algrithms which we will be using in the projects .Read popular research paper on it .

5.VERILOG CODE-We completed the first step towards our milestone by writing a code for Gaussian filter smoothening process for the input image/video.
https://pastebin.com/qbYciECD

6.TESTBENCH CODE- We completed the Testbech code for the same . 
https://pastebin.com/YhzbGUZ5

Learning:
1. Verilog Language
2. Concept of edge detection
3. Concept of Canny edge detection
4. writing a errorless code for step 1 of the algorithm.

