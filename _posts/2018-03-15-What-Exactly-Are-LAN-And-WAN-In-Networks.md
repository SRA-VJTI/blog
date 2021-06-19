---
layout: post
title: What Exactly Are LAN And WAN In Networks?
tags: networking
description: This blog is an introduction to LAN and WAN.
---

-- [Yash Hule](Yash Hule's git id)

![](/assets/posts/What-Exactly-Are-LAN-And-WAN-In-Networks/work.jpeg)

Everyone has enjoyed playing games together with friends in a cyber café (Counter Strike would be a good guess here ;p). Ever wondered how we were able to play same game on different computers and compete with one another? Or in a cyber café we can just give command from any PC to print a document from a lone printer. The answer to all of this connectivity is due to **LANs**.

I’m sure most of you have come across this term. LAN stands for **Local Area Network** which consist two or more networking devices connected to each other by a Ethernet cable consisting of coaxial or twisted pair cable or Optical fiber through a common device, let’s call it a **hub**. The Computer that wishes to send a message to other computers sends it with receiver address to a hub. The router check’s the address and passes the message or data to the receiver. Thus many such devices are able to share data and interact with each other using LAN connectivity. So every device in LAN is connected to each other and is capable of simultaneous sharing of data with every other device which results in playing a game with all our friends at same time. LAN is connected in many ways (**topologies**) like **Mesh** where each device is connected to one another, **Star**, in which all device connects through a common hub device, **Ring**, in which all device are connected in ring like round form, **Bus**, a dedicated cable to which all devices are connected.

LAN is usually restricted to a particular geographic location. Examples are the networks in an office building, School or a Corporate office. 

Now let’s come to communication using LAN in simple terms, consider your building for example. Imagine that all the homes in your building are the devices in your LAN network. The Watchman in the building acts like a hub and Secretary as router in network 

```
Network Definition: A network is a group of computers connected together in a way that allows information to be exchanged between the computers.
```

When a family in on 1st floor needs to complain about the people on second floor they drop a message to the Watchman, he goes to the Secretary and informs about it. The secretary then takes the decision of what need to be done and passes the information back to watchman who finally delivers it to 2nd floor. It’s actually a rough overview of LAN's working. There are many details involved in actual networking. The source PC which needs to send the message  knows the address of receiver so it connects the hub to the router where the router does the work of setting up the connection between the two devices. The message which needs to be send by the Source takes the form of a packet which contains the message information with the receiver physical and network address(IP address and MAC). Thus the packet goes to the hub first then to the router where the routing is done to make sure the packet which contains our message goes to the correct destination. 

[![What is LAN](https://yt-embed.herokuapp.com/embed?v=LCj2HDOd_Mk)](https://www.youtube.com/watch?v=LCj2HDOd_Mk "what is LAN")

We saw what a LAN is how the data sharing takes place let’s look at WAN it’s nothing different but a larger version of LAN. WAN stands for **Wide Area Network**.

When an individual Company or Organization has locations that are separated by large geographical distances, it will be a matter of necessity to connect these individual locations so as to share, exchange and manager data or communication. To achieve this, the organization needs to interconnect the LANs at the different locations.

Telecommunications Service Providers manage large area networks that can span long distances. TSPs transport voice and data communications on separate networks. These networks that connect LANs in geographically separated locations are referred to as Wide Area Networks (WANs). WANs generally connect devices that are separated by a broader geographical area than cannot be served by a LAN.

WANs use the **services of carriers** , such as telephone companies, cable companies, satellite systems and network providers. WANs use serial connections of various types to provide access to large geographic areas. The router in the LAN is the one acting as a medium to send data from one area to another over the Internet to other routers at locations which are far away. The medium between two locations can be a **Optical fiber** cable capable for fast data transfer, **Satellite** or **electromagnetic waves**. So we can say WAN sets up connection between devices located in different parts of world. 

https://www.youtube.com/watch?v=VLC1Okg63cw

[![What is WAN](https://yt-embed.herokuapp.com/embed?v=VLC1Okg63cw)](https://www.youtube.com/watch?v=VLC1Okg63cw "what is WAN")


LAN does work of inter connectivity in a network and WAN does the intra connection work. 