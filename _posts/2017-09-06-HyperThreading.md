---
layout: post
title: Hyper-Threading Explained In 2 Minutes!
tags: OS
description: Understand what hyper-threading is.
---

-- [Rohit Bhaskar](https://github.com/rohitbhaskar)

-- [Chirag Trasikar](https://github.com/chirag16)

<img src="/assets/posts/Hyperthreading/What-is-Hyper-Threading-Technology-Intel-.jpg" alt="Hyper-Threading Intel" /> 

This is a term that everyone must have heard of, especially if you researched for buying a new laptop. But not many understand what it is.. so lets do a quick dive into the topic.



Lets say its a rainy day and you're sitting at home with just your laptop and a cup of coffee. Just like any normal day, you have a word doc, a music playing app and a browser window open(maybe 2 or 3 if you really need it. Lets add an incognito window to the list too ;P). Now you might think all these are running parallely... but they really aren't. They are actually running sequentially. It's just that your processor is so fast that you cant see the delay. 

This doesn't mean that there isn't any delay. And here is where hyper threading comes into play.



One thing you need to understand before going any further is that Hyper-Threading doesn't add a new set of core automatically to your processor. Hyper-Threading only helps handle threads (small processes) better so that the processor wastes as little time as possible in fetching those tasks. Hyper-Threading wont add extra streams for the fisherman it will just help in queuing the fishes properly in line so that the fisherman can catch them faster and more efficiently.





Now that we have understood what it is, lets dive into some technical jargon :)



HyperThreading is the proprietary simultaneous multithreading implementation of Intel for their microprocessors. Simultaneous multithreading or hyperthreading is basically a method to increase the speed and efficiency of the processor by running tasks when the processor is waiting for the other devices (such as memory, GPU etc) to complete the task given to them.



You may ask what is a thread.

A thread is basically a program that needs to run on the cpu to perform its task. 



For example, a simple Hello World C program is also thread, the thread is created when the program is launched. The program needs the CPU and memory time to perform its task of displaying the text Hello World. Now, a thread is defined by the operating system so, it can also be a bunch of tasks (or threads) combined together to form a thread but for our purposes we will consider a thread as a singular program requesting CPU time to do its task.



So why would a CPU be idle you may ask. 

The microprocessor not only needs to do the calculations required by the thread but also needs to fetch and manage data for the thread and give instructions to the other devices (GPU, RAM, HDD etc). For eg. assume we want to run a simple program that adds two numbers and displays the result on screen, the numbers to be added need to be fetched into the processor, then the answer needs to be computed and then sent to the gpu to be displayed on the screen. Here first the entire program needs to be moved into the RAM from the hard disk, then the numbers to be added need to be moved into the processor to add. But, the processor is way faster then the memory so it has to wait while the memory fetches the numbers to be added. This time is wasted and thus the processor remains idle. Then when the addition is done the result needs to be sent to the display unit/gpu to be displayed on to the screen this time is also wasted as the processor is sitting there doing nothing while the gpu does its job. 



There are three methods to handle threads:

<img src="/assets/posts/Hyperthreading/Superscalar_MT.jpg" alt="Thread handling methods" /> 

1. First, we can just let the thread run on its own and let the processor be idle which is the 
   least efficient method and wastes the time of the processor. This is shown in the first part of 
   the image.
2. Second, we can allocate time to each thread to run on the processor. This has the advantage 
   that multitasking performance increases and if the time slot allotted is less than the memory 
   fetching time then some time of the processor is saved. This is in the second part of the 
   image, here efficiency increased as less time is wasted.
3. Third we could just let the first thread run and intelligently guess when the processor is 
   going to be idle and run the other threads while the processor is waiting for an operation to 
   complete. This is depicted in the third part of the image here when the processor waits for a 
   long operation to be completed by the memory meanwhile the second thread is given time to do 
   its job on the processor thus saving a lot of time and increasing the speed of the processor.

All this being said, Hyper-Threading doesn't literally double your processor performance (as most people would think). It actually just gives a boost of upto 30% (max). Sometimes, doesn't improve performance at all. But it it extremely useful for applications such as high end graphics, games, computational software (like MATLAB) etc.

So, that's all for this post. Hope you understood what Hyper-Threading is (and will hopefully not get caught off guard by this when you go to buy a new laptop ;) )

## - Chinmay Khopde