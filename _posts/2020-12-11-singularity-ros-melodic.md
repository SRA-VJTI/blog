---
layout: post
title: Guide to using singularity to run ROS Melodic
tags: ros_singularity
description: A guide to install singularity and use ROS melodic and all GUI components with it
---

-- [Shreyas Atre](https://github.com/SAtacker)

## A Noobs guide by a Noob to install ros on singularity

* In here only ros-melodic is shown , but it could be done the same way for noetic or ros2 by editing `osrf/ros:<tag_name>` [tag names](https://hub.docker.com/r/osrf/ros/tags)
* As of Dec 10th,2020 Singularity is not supported on Windows
* These guidlines are tested for Ubuntu 18.04 , 20.10 (Groovy G)

### Installing GO

* You coud just install go from the official guide but since you are here, you need it from here :smirk:

Install the dependencies using apt
```bash
sudo apt-get update && sudo apt-get install -y build-essential libseccomp-dev pkg-config squashfs-tools cryptsetup
```
* Visit [Go downloads](https://golang.org/dl/)
* Copy the latest stable release link for linux , until today 15.6 is the latest one
```bash
wget https://golang.org/dl/go1.15.6.linux-amd64.tar.gz
```
* The /usr/local hierarchy is for use by the system administrator when installing software locally.
* Locally installed software must be placed within /usr/local rather than /usr unless it is being installed to replace or upgrade software in /usr. [Ref](https://unix.stackexchange.com/questions/4186/what-is-usr-local-bin)
* Thus extract it in /usr/local using [tar](https://www.cyberciti.biz/faq/linux-unix-extracting-specific-files/)

```bash
sudo tar -C /usr/local -xzf go1.15.6.linux-amd64.tar.gz
```

* Now we need to set the environment variables for go
* I set them directly in .bashrc but you can do it in [alternative](https://unix.stackexchange.com/questions/3052/is-there-a-bashrc-equivalent-file-read-by-all-shells)

```bash
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
mkdir ~/go_projects
echo 'export GOPATH="$HOME/go_projects"' >> ~/.bashrc
echo 'export GOBIN="$GOPATH/bin"' >> ~/.bashrc
```
* Now resource
```bash
source ./bashrc
```
* Now check the installation
```bash
go version
go env
```
* Output would be ```go version go1.15.6 linux/amd64``` and 
```
GOBIN="/home/satacker/go_projects/bin"
GOCACHE="/home/satacker/.cache/go-build"
GOENV="/home/satacker/.config/go/env"
...{and so on}
```

### Installing Singularity

* It is optional to install golangci-lint as per the [singularity installation](https://github.com/hpcng/singularity/blob/master/INSTALL.md) 

```bash
curl -sfL https://install.goreleaser.com/github.com/golangci/golangci-lint.sh | sh -s -- -b $(go env GOPATH)/bin v1.21.0
```

* Now installing Singularity

```bash
mkdir -p $(go env GOPATH)/src/github.com/sylabs
cd $(go env GOPATH)/src/github.com/sylabs
git clone https://github.com/sylabs/singularity.git
cd singularity
```

* As of today v3.6.4 is a stable one
* Now inside `singularity`
```bash
git checkout v3.6.4
./mconfig
cd ./builddir
make
sudo make install
```
* To verify the installation
```bash
singularity version
```

### [Installing ros melodic from osrf image](https://robotism.me/blog/creating-ROS-melodic-container-with-singularity-3.5/)
```bash
cd ~ && sudo singularity build --sandbox melodic/ docker://osrf/ros:melodic-desktop-full
```
* Now the container image is ready
* To execute scripts in the container
```bash
sudo singularity shell --writable melodic/
```
* This will open a Shell in Singurity image with the current directory mounted by default 
* Try `apt update && apt upgrade`

### Running roscore

```bash
satacker@ubuntu:~$ sudo singularity shell -w melodic/
[sudo] password for satacker: 
Singularity> source /opt/ros/melodic/setup.bash 
Singularity> roscore
... logging to /root/.ros/log/b03e5adc-3b89-11eb-b60b-dcf505b1c27d/roslaunch-ubuntu-13488.log
Checking log directory for disk usage. This may take a while.
Press Ctrl-C to interrupt
Done checking log file disk usage. Usage is <1GB.

started roslaunch server http://ubuntu:40581/
ros_comm version 1.14.10


SUMMARY
========

PARAMETERS
 * /rosdistro: melodic
 * /rosversion: 1.14.10

NODES

auto-starting new master
process[master]: started with pid [13498]
ROS_MASTER_URI=http://ubuntu:11311/

setting /run_id to b03e5adc-3b89-11eb-b60b-dcf505b1c27d
process[rosout-1]: started with pid [13509]
started core service [/rosout]

```


### Running Gazebo

* If you get any errors please see [Known Issues](#known-issues)

![](/assets/posts/using-singularity-ros-melodic/gazebo.png)
       

### Host to Container

* When Singularity ‘swaps’ the host operating system for the one inside your container, the host file systems becomes inaccessible. But you may want to read and write files on the host system from within the container. To enable this functionality, Singularity will bind directories back in via two primary methods: system-defined bind points and conditional user-defined bind points.
* Before

```bash
satacker@ubuntu:~$ sudo singularity shell -w melodic/
Singularity> cd /home/
Singularity> ls
Singularity> 
```

* After

```bash
satacker@ubuntu:~$ sudo singularity shell -B /home/satacker/:/home/ -w melodic/
Singularity> cd /home/
Singularity> ls
Desktop    Downloads  Pictures	Templates  anaconda3	melodic  wget-log
Documents  Music      Public	Videos	   go_projects	snap
Singularity> 
```

* In the above command `-B` is the option selected and `/home/satacker/` on the host is now binded with `/home/` on the container
* Beware  Mount options (opts) may be specified as ro (read-only) or rw (read/write, which is the default)

```bash
Singularity> touch test.test
Singularity> ls
Desktop    Downloads  Pictures	Templates  anaconda3	melodic  test.test
Documents  Music      Public	Videos	   go_projects	snap	 wget-log
Singularity> 
```
```bash
satacker@ubuntu:~$ ls
anaconda3  Documents  go_projects  Music     Public  Templates  Videos
Desktop    Downloads  melodic      Pictures  snap    test.test  wget-log
```

### Multiple Instances of same image

```bash
satacker@ubuntu:~$ singularity instance start melodic/ instance_1
INFO:    instance started successfully
satacker@ubuntu:~$ singularity instance start melodic/ instance_2
INFO:    instance started successfully
```

### Stopping Instances

```bash
satacker@ubuntu:~$ singularity instance list
INSTANCE NAME    PID     IP    IMAGE
instance_1       6705          /home/satacker/melodic
instance_2       6994          /home/satacker/melodic
satacker@ubuntu:~$ singularity instance stop instance_1
INFO:    Stopping instance_1 instance of /home/satacker/melodic (PID=6705)
satacker@ubuntu:~$ singularity instance stop instance_2
INFO:    Stopping instance_2 instance of /home/satacker/melodic (PID=6994)
```

### Running Turtlesim

![](/assets/posts/using-singularity-ros-melodic/turtlesime_key.png)
![](/assets/posts/using-singularity-ros-melodic/turtlesim_key_2.png)
![](/assets/posts/using-singularity-ros-melodic/turtlesim_key_3.png) 

### Using Terminator

![](/assets/posts/using-singularity-ros-melodic/terminator_multiple.png)
        

## Known issues

* While running the gui apps the windowing system may give `No protocol specified` and `xcb_connection_has_error() returned true`
The possible workaround (also the easiest) for this is to allow the anyone on the localhost to connect to your dislpay using `xhost +local:` - [ref](https://unix.stackexchange.com/questions/85782/error-no-protocol-specified-when-running-from-remote-machine-via-ssh)
* ```libGL error: No matching fbConfigs or visuals found libGL error: failed to load driver: swrast``` The possible workaround is to install nvidia or other graphic drivers [ref](https://askubuntu.com/questions/541343/problems-with-libgl-fbconfigs-swrast-through-each-update) and then a reboot
* While running terminator `dbus.exceptions.DBusException: org.freedesktop.DBus.Error.Spawn.ExecFailed: /usr/bin/dbus-launch terminated abnormally without any error message` D-Bus is a software bus, inter-process communication, and remote procedure call mechanism that allows communication between multiple processes running concurrently on the same machine. simply use `terminator -u`

