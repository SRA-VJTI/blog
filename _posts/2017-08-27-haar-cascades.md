---
layout: post
title: Haar Cascades Explained in 2 minutes!
tags: image_processing
description: Introduction to Haar Cascades.
---

-- [Apoorva Gokhale](https://github.com/apoorva-21)


<p align="center"><img src="/assets/posts/haar-cascades/haar_on_faces.jpg"></p>

Hello everyone! in my debut post on the SRA blog, I'll be giving you a simplified intuition about Haar-like features, and subsequently, about Haar Cascades, a technique that is applied in Computer Vision for detecting objects in images.  

Object detection is one of the most common tasks in Computer Vision. And it’s not always necessary that the object you want to track is going to be delightfully coloured in a different colour than its surroundings, lighting variations, yada, yada.. Chuck that, you may even not have a 3-channel image, just 2-D grayscale matrices. 

**We need something more robust, as compared to simple colour thresholds and template matching (which needs the size of the object in the input image, to be the same as in the template, or the image of the object to search for). What if, we could 'teach' our computer what features to look for? (yess, machine learning-ish tease)**

Enter Haar-like features. Cardinally of three types, these are at the crux of what we want to instruct our computer to look for in an image. This was the method that was adopted by Viola and Jones, in their object detection framework in 2001, and was the first nifty-yet-robust approach taken.

<p align="center"><img src="/assets/posts/haar-cascades/haar_features.jpg"></p>

We shall consider grayscale images for this one, since we've realised colour isn’t going to help here, so why triple the size of our image? (rhetoric)

Now, we are going to take a 2-D matrix (imagine a window) like one of those images above, and we are going to place them, part wise, on the image of the object that we want to detect later (imagine the 'window' placed over your object). Next, we are going to sum over all the pixels in the object image that lie under the black part of the window, and separately sum over all pixels under the white part of the window (for CNN junkies, yes, it's like a convolutional kernel). Moving the window throughout the image, we are going to compute these differences of sums. It is using these features that the shape of the object can be decomposed to changes in pixel intensities, allowing us to detect the shape of the object.


But there’s a catch. The resolution of our feature ‘window’ is 24 x 24, which adds up to 160,000 rectangular features. That sounds quite heavy to compute, doesn’t it? In order to optimize this, Viola and Jones came up with what they call integral images, like so:

<p align="center"><img src="/assets/posts/haar-cascades/integral_sum.png"></p>

What this does, at a high level, is that it reduces the computational time greatly, and hence adds to the speed of detection. Moreover, these rectangular features can now be evaluated by the ‘integral image’ method over various resolutions of the image rapidly, even more so than the construction of image pyramids, used in other feature detection schemes.


Now that we have computed the 160,000 features, we need to put them in action and use them to detect objects in images! But slow down, isn’t it going to be a tardy piece of work, computing 160,000 features for every image, even if the object isn’t even in the image? **To prevent this wasted effort, a ‘cascade’ of weak classifiers**, that is, sort of an order of evaluating and checking for features, and the weightage or importance to be given to them, is trained using an algorithm called AdaBoost (short for adaptive boosting). Only if the image has a significant result in one rectangular feature kernel, will it be cascaded down to the next-in-line computation of features. This ensures that redundant computations are kept to a minimum. Fun Fact: the 160,000 features are rarely ever evaluated, unless the object is actually present in that image.


Okay, so all that is left now for us to do is to train the classifier by feeding it with positive samples (images containing the object to be detected) and negative samples (images of the common surroundings, without the object to be detected). The weights and order of cascading gets trained, and is stored in serialized form (.xml files). Helper functions, such as the detectMultiScale function of OpenCV, allow us to use the .xml files to search and localize the object within a new input image, that wasn’t within the training set.


*I hope that with this post, I was able to give you an idea of how Haar-like Features and Cascade Classifiers work. These are some useful links, to help you implement and check out Haar Cascades.*

 

In case, like me, you get a kick out of seeing rectangles around faces :p :
* [OpenCV example showing Haar Cascadesfor face detection:](http://docs.opencv.org/trunk/d7/d8b/tutorial_py_face_detection.html)
* [Robust Real-time Face Detection, byPaul Viola and Michael Jones (the 2001 paper): ](http://www.vision.caltech.edu/html-files/EE148-2005-Spring/pprs/viola04ijcv.pdf)