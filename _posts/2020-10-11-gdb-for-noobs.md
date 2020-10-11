---
layout: post
title: GDB For Noobs
tags: gdb
description: Introduction to debugging C/C++ programs using the GNU Debugger
---

-- [Dhruva Gole](https://github.com/DhruvaG2000)

## Why use a debugger? 

Most of us tend to have bugs in our code. We could use printing commands to test our code, or we could use a debugger. Many times our code might seem to work correctly, because we didn't test it under enough scenarios. Other times we know there's a bug, but by just reading the code we don't notice it is there. Thus, we should develop a habit of launching a debugger when we get into trouble. 

## Walkthrough

1. for compiling your code to make it suitable for debugging using gdb:

```bash
 g++ -g "buggy_factorial.cpp" 
```

1. launching the gdb shell:

```bash
gdb a.out
```


1. basic commands we will be needing: 

    * ``(gdb) run`` : runs the program.
    * ``(gdb) break file1.c:6`` : Breakpoints can be used to stop the program run in the middle, at a designated point (we will see how its useful in the following example). 
    * ``(gdb) break myfunc``: creates breakpoint at ``myfunc`` **remember to use myfunc without the ()**
    * ``(gdb) step`` or ``(gdb) s`` : execute just the next line of code.
    * ``(gdb) print (gdb) `` or ``(gdb) p (gdb) `` :  prints the value of the variable.
    * ``(gdb) watch myvar``: whenever myvar’s value is modified, the program will interrupt and print out the old and new values. 
    trivial one's below...
    * ``finish `` : runs until the current function is finished.
    * ``delete`` : deletes a specified breakpoint.
    * ``info breakpoints`` : shows information about all declared breakpoints.

2. explanation with example: 
    1. First, let's just run the code.. 
    command:

    ```
    run
    ```
    output: 
    ```
    Starting program: /home/dhruva/Documents/studies/maths/gdb-for-noobs/a.out 
    enter any number: 
    4
    The factorial of 4 is 1[Inferior 1 (process 14193) exited normally]
    ```
    
    oops! Clearly the answer is wrong!!
    Now, as a very inexperienced programmer, one would try to print at every iteration to see where the program might have gone wrong resulting in a very ugly looking code and also adding the unnecessary headache of having to track the line number of each print statement one had used for debugging their codes. 
    Now, let's see how gdb simplifies things for us...

    1. creating breakpoints: 
    since my factorial function is most probably messing up, I will add the breakpoint to it. 
    command:
    
    ```
    break factorial
    ```
    
    output: 
    
    ```
    Breakpoint 1 at 0x555555554993: file buggy_factorial.cpp, line 5.
    ```
    
    now lets run it again... using ```run``` 
    output: 
    
    ```
    Starting program: /home/dhruva/Documents/studies/maths/gdb-for-noobs/a.out 
    enter any number: 
    4

    Breakpoint 1, factorial (n=4) at buggy_factorial.cpp:5
    5	  double res=1;
    ```
    
    as we can see, the program stopped just as the function was called. Now, instead of needing to manually add ```print()``` statements I will see why my code is buggy by watching the variables in my console itself! 

    1. watching the variable
    Since it is likely that some variable is not working properly, let's start by watching the ``res`` variable. 
    command: 
    `` watch res ``
    now the gdb console works in such a way that hitting enter will automatically take you to the next step where you expect to see some change in your variable as the while loop modifies it in each iteration...
    hmm... something strange, the res variable isn't updating! 
    Well, so now that I observe that ``res`` isn't updating, the only reason I think is it must not be entering the while loop for some reason!

    OK! So now I go back ad make changes in my while loop condition to
    ``while(n>=1)`` 

    1. Let's see if the issue is fixed!
    Press `q` and then `y` to exit the gdb, and again compile your new program: 
    * ```g++ -g factorial.cpp -o fact```
    * ```gdb fact``` 
    * ``run``
    * output: 

    ```
    Starting program: /home/dhruva/Documents/studies/maths/gdb-for-noobs/fact 
    enter any number: 
    4
    The factorial of 4 is 24[Inferior 1 (process 15039) exited normally]
    ```

Thus using GDB we learned to debug a very basic code in c++. You can also try the other commands listed on top as per your own convenience and requirements.

## sources:
*  [gdb-tutorial-handout](https://www.cs.umd.edu/~srhuang/teaching/cmsc212/gdb-tutorial-handout.pdf)
*  [debugging-with-gdb](http://www.math.bas.bg/~nkirov/2005/netb151/debugging-with-gdb.html)

