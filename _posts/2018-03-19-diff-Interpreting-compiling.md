---
layout: post
title: Difference Between Interpreting Codes And Compiling Them
tags: compilers interpreters
description: Gain insights into how programming languages treat the code you write.
---

-- [Rohit Bhaskar](https://github.com/rohitbhaskar)

-- [Chirag Trasikar](https://github.com/chirag16)

Well I know that there is always a confusion between interpreted and compilied based languages, and I wanted to make sure you know that no language is specifically a compiled language or an interpreted language. A language which is usually compiled can be interpreted and a language that is usually interpreted can be compiled.

**Compiling and Interpreting are just 2 different methods to execute a program**

So, let’s get down to the main topic that is the difference between the two.

**Compiling**: The job of a compiler is to take the source code (that is whatever you’ve written) and convert it to machine code (binary commands which the machine can understand). Now the codes that are compiled at the source or the workstation of the developer are converted to the binary code and shared as an executable to the users. Also since these executables are binary codes they are always ready to run and work super-fast on the supported platform.


**Interpreting**: In interpreting, you get rid of the process of compiling at the source. But in the end, you would always require something to convert the source code to machine code. For that we have something known as an interpreter. An interpreter converts a line of source code to machine code executes it and then moves on to the next line of code. This makes it easy to make dynamic changes in the code without requiring recompiling and distribute the complete code.


Here is a small cheat sheet to help you decide which language to use the next time you have an idea:

**Compiled codes**:

* Pros: 
  1. Code is ready to run; 
  2. Super-fast and source code is protected as it is not shared.

* Cons: 
  1. Inflexibility in terms of cross platform deployment; 
  2. Needs to be recompiled whenever changed.

* General applications: Software’s, browsers, desktop applications.

* Generally used Languages: C, C++, objective C, Swift.


**Interpreted codes**:

* Pros: 
  1. Cross platform flexibility, 
  2. Dynamic changes to the code can be made.

* Cons: 
  1. Slower and source is unprotected as it is shared to the users.

* General applications: Webpages

* Generally used languages: PHP, JavaScript.


**Though this isn’t the end of it, there is a hybrid method which involves concepts of an intermediate language and JIT (Just In Time) compilers which are used by many modern languages like Java, Python etc. which will be explained in a future article ;)**