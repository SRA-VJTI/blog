---
layout: post
title: What Is Machine Language (Or Machine Code)?
tags: compilers assembly
description: What memory allocation is, static and dynamic memory allocation & why is it imp?
---

-- [Rohit Bhaskar](https://github.com/rohitbhaskar)

-- [Chirag Trasikar](https://github.com/chirag16)

<img src="https://engineeringprojectideas.files.wordpress.com/2015/06/datamining.jpg?w=810" alt="binaries image" /> 

A lot of computer nerds (Sorry! Engineers!!) know about something called machine language or machine code…maybe even a few electronics engineers…but for most it’s still just a jargon they have heard of, but never bothered googling 🙂

By definition, Machine code or machine language is a set of instructions executed directly by a computer’s central processing unit (CPU). These instructions can be anything like (warning! The next few lines are specifically for engineering students who have worked with 8085 or 8086 microprocessors) load, a jump, or an ALU operation on a unit of data in a CPU register or memory. Every program directly executed by a CPU is made up of a series of such instructions.
Now! For normal people…machine language is the only language that is understood by your computer. Each and every language or instruction that is given to a processor is always passed on it terms of machine language.

<img src="https://engineeringprojectideas.files.wordpress.com/2015/06/binaries.jpg?w=300&h=206" alt="matrix like cool image" />

So you must be wondering what machine language consists of right? Well, they consist entire of numbers and mostly binary and is almost impossible for humans to use. It has been said that machine code is so unreadable that the United States Copyright Office cannot identify whether a particular encoded program is an original work of authorship. That’s why an assembly level language is used by programmers! (We will get to assembly language some other time :p)
So what happens to all that huge codes that people write, that does everything from showing you the little things on your display to actually running your main processes? Each and every thing is converted to either machine language or assembly language for the processor to understand the instruction and execute it.

<img src="https://engineeringprojectideas.files.wordpress.com/2015/06/level-of-programming-language.png?w=300&h=236" alt="pyramid">

The next question that might arise is whether this language is used by all processors?? Well, the answer is no. Every processor or processor family has its own machine code instruction set. Instructions are patterns of bits that by physical design correspond to different commands to the machine. Thus, the instruction set is specific to a class of processors using (much) the same architecture.
For more details you can refer [Wikipedia](https://en.wikipedia.org/wiki/Machine_code)