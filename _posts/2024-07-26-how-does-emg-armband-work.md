---
layout: post
title: EMG armband, The conclusion
tags: ML Systems IoT PCB Designing ML Embedded
description: Developing a EMG system that can read human hand motioning.
---

## Mentees  :
- [Shaunak Datar](https://github.com/ShaunakKDatar)
- [Piyush Patle](https://github.com/PiyushPatle26)
- [Atharva Kshirsagar](https://github.com/vovw)

---
# What is our project ?
We read Electromyography(EMG) data using sensors, amplify it, filter it, ADC convert it and performs a frequency analysis (FFT) on it. Using the analised data we train a ml model than can understand what hand moment was done to get those readings.

# What work has been done ?
- first of all we *tried* to apporach this problem from the first principals. We implemented the **biopotential signal-acquisition board** from scratch. But had some issues with it.
- then we pivoted temp to using upsidedown labs [exg pill](https://github.com/upsidedownlabs/BioAmp-EXG-Pill) and it works.
(add images of the reading)

## here is a small walk through the code.
a) Data collection:
- It reads analog data from a sensor connected to the ESP32.
- The data is sampled at a rate of 500 times per second.

b) Signal processing:
- The raw signal goes through a bandpass filter to focus on frequencies between 75 and 150 Hz.
- This filtering helps remove noise and focus on the most relevant part of the EMG signal.

c) Frequency analysis:
- The code uses the Fast Fourier Transform (FFT) to convert the time-domain signal into frequency components.
- This helps identify which frequencies are most prominent in the EMG signal.

ADC (Analog-to-Digital Converter): Converts the continuous analog signal from the sensor into digital values the microcontroller can process.

Bandpass filter: A filter that allows signals between two specific frequencies to pass through while blocking others.

### Program flow:
   - The program continuously reads data from the ADC.
   - It applies the bandpass filter to each sample.
   - Once it collects 256 samples, it performs the FFT.
   - After the FFT, it prints out the magnitude of each frequency component.
   - This process repeats.


![flow](/assets/posts/emg-armband/flow.png)

basically we ended up with a simple EMG analizer using esp32.



# What work needs to be done ?
## ml model
### more data collection 
### data cleanup
### try out differennt architectures for the ml model

## pcb
- try to get our pcb working
- make it so that we can communicate with 2 esps


## end product
expirement with different applications like examples here


# Difficulties we faced



### github repo - [emgband](https://github.com/vovw/emgband)

