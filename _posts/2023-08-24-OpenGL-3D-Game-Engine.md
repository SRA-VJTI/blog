---
layout: post
title: OpenGL-3D-GameEngine
tags: OpenGL C++ Graphics-API
description: To create a 3D Game Engine using OpenGL librarires in C++ and make a game like checkers/chess.
---

--[Anish Mahadevan](https://github.com/Faulty404)
--[Ritika Nankar](https://github.com/Ritika128)
# Overview of the Project 

## What is OpenGL?

OpenGL is a **graphics API**. API stands for *application program interface*. It makes it possible for us to use and access our GPU (Graphics Processing Unit).

OpenGL is one of the many graphics APIs available in the market. Examples of a few others are:
- Direct3D
- Vulcan
- Metal

Fundamentally, OpenGL is a standard that essentially enumerates which functions should accept which parameters and carry out which tasks.

One of the benefits of OpenGL over other graphics APIs is its cross-platform compatibility.
### Modern vs Legacy OpenGL

Legacy OpenGL

- It was a set of presets.
- Short and easy to use code.
- Provides less control.

Modern OpenGL

- Provides greater control.
- The use of shaders is the primary distinction between Modern and Legacy OpenGL.

For our project, we will be using Modern OpenGL.

## What is a Game Engine?

Software frameworks that are primarily used for creating video games are called game engines, and they typically come with pertinent libraries built in.

A game engine's function is to offer a collection of tools for visual development along with reusable software parts so that a game can be built.

At [wikipedia page,](https://en.wikipedia.org/wiki/Game_engine) you may get comprehensive information regarding gaming engines.

### What are Shaders?

- It's a program, a code that runs on the GPU (Graphics Processing Unit).

When we write code in C++ or Java it runs on the CPU but we are dealing with graphics so we have to move code from CPU to GPU because it will run faster on the GPU.

- Shaders allow us to write code on the GPU.
## Approach for the project

Learning how to use git and github for this project's ease of collaboration would be the first step.

To begin the project, we must first become familiar with the fundamentals of OpenGL and how to render simple visuals and shapes on a display using the various libraries included in Modern OpenGL.

[We shall watch this playlist to understand the concepts of OpenGL, vertex buffers and shaders used to render various graphic designs on the screen.](https://youtube.com/playlist?list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2)

[Documentation of the many Modern OpenGL functions will aid in our learning of these libraries more quickly and thoroughly.](https://docs.gl/)

After understanding the concepts of OpenGL and the libraries it contains, we must learn how to implement these libraries to make a game engine.

[This playlist will serve as a tutorial for us as we build a 3D game engine using the OpenGL principles we learned from the last playlist.](https://youtube.com/playlist?list=PLv8DnRaQOs5-TyYnF56YghOxQBNr1VVmF)

We'll get started on the task at hand and implement the various libraries ourselves after studying how the major OpenGL libraries are implemented to create a 3D game engine and create a checkers/chess-style game.

Since using Object Oriented Programming reduces effort and makes code more concise and less redundant, all of the code will be written in C++.

## Overview of the project

Our goal with this project is to create a game engine and design a game that is comparable to checkers or chess.

To accomplish this, we need to understand the foundations of OpenGL libraries and how the API renders and displays images on the display using Vertex Buffers, Shaders, and other pre-built libraries. 

Utilizing C++, the code will be implemented.
