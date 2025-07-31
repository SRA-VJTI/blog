---
layout: post
title: OSI Model Explained In 2 Minutes
tags: networking
description: This blog is an introduction to OSI Model
---

-- [Shubham Patil](https://www.linkedin.com/in/shubham-pravin-patil/?originalSubdomain=in)

![](/assets/posts/OSI-Model-Explained-In-2-Minutes/osi-model-fb.jpg)

ello everyone! in my debut post on the SRA blog, I'll be giving you a simplified explanation of the **OSI (Open System Interconnection) Model**:

I'm pretty sure every engineer would have come across this term sometime during their 4 years. The OSI is an extremely popular communication standard.
The OSI model defines standards for:
• The way in which devices communicate between each other.
• The means used to inform devices when to send data and when not to transmit data.
• Methods to observe correct rate at which data flows.
• Means by which we come to know that the data has reached to its respected recipient.

# What is OSI Layer?
OSI (Open Systems Interconnection) Reference Model since it describes or relates to connecting systems that are open for communication with other systems. In the model, the functions of the communication system are standardized by categorizing them into abstract layers. Each of the layers of the OSI model is intended to function with those above and below it respectfully within the model definition.

# What Are the Seven Layers of the OSI Model?

We always have problem remember things in sequence right no one remembers all the elements in Periodic table with their names hence we devise mnemonic for such things. A common mnemonic used to remember the OSI model layers starting with the seventh layer (Application) is: “All People Seem to Need Data Processing.”

![](/assets/posts/OSI-Model-Explained-In-2-Minutes/osi-model.png)

1. Application Layer:
The Application layer provides the necessary services that support applications. It provides the interface for e-mail, Telnet and File Transfer Protocol (FTP) applications, and files transfers. It means that the its only job in simple terms is to take data input and output from and to user respectively.

2. Presentation Layer:
This layer deals with the format of the data when it being transferred so that other layers can also understand what kind of data is transmitted through network. When the data is received, the Presentation layer translates the data to a format which the application can read. Compression and Encryption {which we will take in another post :p} functions fall in this layer.
3. Session:
The best way to remember a session is thinking of it as a Hangout or WhatsApp messenger. When two people start communicating a session is created, as soon as one ends or disconnects video/audio call, session is broken. That means it is responsible for maintaining and ending communication between two receiving devices.
4. Transport:
This layer provides you with the best possible path for data transfer between two recipient. Also provides secure data transfer and error checking and recovery of data between two members.
5. Network:
This layer takes care of the ways data will be sent. The protocol used for sending data will also be decided here. Consider you are data the and you want to reach your college then your choice of transport here becomes the protocol. One main feature of network layer is Routing. Routing enables transport of packets among computers which can be linked to one or many others.
6. Data Layer:
The data link layer provides a reliable link between two directly connected nodes. It is
responsible transmitting data over a link from one device to another, by providing interface
through network medium to software medium.
7. Physical Layer:
This is the level of the actual hardware. Hardware such as the physical components of
Ethernet cables and Bluetooth are just some examples of the physical layer. In this layer you
will define the following :-

    * *Defining physical specifications*

    * *Defining protocols*

    * *Defining transmission mode (half duplex &amp; full duplex)*

    * *Defining the network’s topology*


So that concludes our post on the OSI model. It might have gotten too technical, but i hope you understood ;)