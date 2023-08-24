---
layout: post
title: LangCraft
tags: software compiler compsci 
description: Creating a custom Programming Language from scratch. 
---

-- [Nishat Patil](https://github.com/nishatp9)
-- [Siddhi Parekh](https://github.com/siddhip2004)

# *LangCraft*

Imagine a world where you have the power to create your own language, one that speaks in the voice of your imagination.

With a flair for exploration and a deep-rooted curiosity, Myself Nishat and my team partner Siddhi have always been drawn to the world of programming and its limitless possibilities. Our paths converged during our academic pursuits, where we discovered our mutual interest in pushing the boundaries in the world of software development.

This project is fueled by our shared passion for programming languages and a strong desire to explore the inner workings of language design and how they are created.

## Project
Crafting your `own` programming language from the ground up.

## What is an Interpreter ?

![](/assets/posts/langcraft/interpreter.png)

An interpreter is an incredible piece of software that takes source code written in a programming language and executes it line by line, converting each instruction into machine-understandable commands on the fly. Unlike compilers, which translate code into a standalone executable, interpreters work dynamically, interpreting and executing code in real-time.


# Approach
## Defining the Syntax

![](/assets/posts/langcraft/syntax.jpeg)

The first step in our project is to define the syntax of the custom programming language. This involves carefully designing the rules and structure that govern how programs in our language will be written. I and my partner engaged in some brainstorming sessions, sketching out ideas, and creating a comprehensive list of language features and construct that we want to include. By defining the syntax, we laid the foundation for the rest of the project.

## Implementing a Lexer
With the syntax defined, we now proceed to implement a lexer. The lexer scans the source code and breaks it down into a sequence of tokens. These tokens serve as the building blocks of the language and represent different elements such as keywords, identifiers, operators, and literals. We also implemented a simple calculator following the lexer rules using a tool called Flex.

## Developing a Parser and Constructing an AST

![](/assets/posts/langcraft/ast.png)

We now focus on developing a parser that takes the stream of tokens produced by the lexer and constructs an Abstract Syntax Tree (AST). The parser analyzes the structure of the source code based on the grammar rules defined in our language. We used tools like Bison to generate a parser from the grammar specification. As the parser successfully parses the code, it builds the AST, which represents the hierarchical structure of the program.

## Building a Tree-Walk Interpreter
The final step of our project involves building a tree-walk interpreter to execute the code written in the custom language. The interpreter traverses the AST and performs the corresponding actions for each node encountered. It involves evaluating expressions, executing statements, handling control flow, and supporting various language features defined earlier.

## Concepts to delve into
1. Exploring the design and implementation of various language features such as variables, data types, control structures, functions, classes, modules, and namespaces.

2. Implementing error handling mechanisms, by  informative error messages. Handling different types of errors, such as syntax errors, type errors, and runtime exceptions.

3. Diving into memory management techniques, such as manual memory allocation and deallocation and analyzing their trade-offs in terms of performance, simplicity, and safety.

4. Implementing a standard library for our interpreter, providing commonly used functions and utilities.

## Wrapping Up
Creating a custom programming language from scratch is a challenging project. Dealing with operator associativity, precedence, nested expressions, and resolving grammar conflicts may require advanced parsing techniques. Integrating with external libraries or systems might be challenging. Handling data serialization, managing foreign function interfaces, and maintaining compatibility with other programming languages may necessitate extra efforts.

Through meticulous planning with mentors, collaboration, and implementation, we plan our way ahead to build a tree-walk interpreter to execute code written in our custom language.

## Weekly Updates 

Week 1 : 
1. Completed the tutorials for git
2. Got an idea of how to write in markdown format
3. Understood the concept of lexer and parser
4. Built a simple calculator and ran it using flex and bison
5. Understood the working of an Interpreter
6. Finished reading the first chapter "Scanning" from the book "Crafting Interpreters"

Week 2 : 
1. Decided the syntax for our language