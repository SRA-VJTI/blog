---
layout: post
title: Static and Dynamic Memory Allocation…?
tags: compilers interpreters memory
description: What memory allocation is, static and dynamic memory allocation & why is it imp?
---

-- [Rohit Bhaskar](https://github.com/rohitbhaskar)

-- [Chirag Trasikar](https://github.com/chirag16)

* Now, what does memory allocation mean? 

Memory allocation is the process by which any process or program is allocated a certain portion of virtual or physical memory space. (Virtual memory space is nothing but the temporary memory generated in the RAM by moving files from it). If you did not understand this, just know that every process needs to use memory, and giving the process the memory it needs is called memory allocation! That’s all!

Now to get to the main point of the post… 

* What does Static and Dynamic memory allocation mean then?

(I hope you read the [previous post](/2018/03/19/diff-Interpreting-compiling.html) of compilers and interpreters. The knowledge of what compiling means will be used here. Go back and read up if you need to)

Static memory allocation basically means that the memory is allocated during compilation itself. This means that the as soon as the compilation is over, certain space of memory will be fixed for its usage. But in Dynamic memory allocation, the space for the program is given ‘dynamically’, or set during run time. This means that the amount of memory that a program requires will not be set before hand but instead the memory will be allocated step by step depending on the program needs.

The advantage of Dynamic memory (obviously) is that it ends up using lesser portions of Memory that Static allocation. But it is slower in execution as memory has to be allocated at every step based on the requirements. Check the video below to understand it better.

<iframe width="560" height="315" src="https://www.youtube.com/embed/CSVRA4_xOkw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This post didn’t go into the details of the two types, but instead gave you an overview of what the terms mean and how you can go about learning more about it.

Hope you liked it! happy reading!