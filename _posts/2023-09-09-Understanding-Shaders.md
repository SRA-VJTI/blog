During the first week of Eklavya 2023, we learnt the principles of git which allowed us to use github and work on this project together as collaborators. 

Secondly, we learnt the basics of what Modern OpenGL has to offer and learnt to render some basic shapes on the screen using VertexBuffers and Shaders.

# Rendering a triangle

```c++
#include <GLFW/glfw3.h>

#include <iostream>

  
  

static unsigned int CompileShader(unsigned int type, const std::string& source)

{

unsigned int id = glCreateShader(type);

const char* src = source.c_str();

glShaderSource(id, 1, &src, nullptr);

glCompileShader(id);

  

//error handling code, iv integer the specifies it wants a vector

int result;

glGetShaderiv(id, GL_COMPILE_STATUS,&result);

if(result == GL_FALSE)

{

int length;

glGetShaderiv(id,GL_INFO_LOG_LENGTH,&length);

char* message = (char*)alloca(length* sizeof(char));

glGetShaderInfoLog(id,length,&length,message);

std::cout<< "Failed to compile " <<

(type == GL_VERTEX_SHADER ? "vertex" : "fragment")

<< std::endl;

std::cout<< message<< std::endl;

glDeleteShader(id);

return 0;

}

  
  

return id;

}

  

//creating shader

static unsigned int CreateShader(const std::string& vertexShader, const std::string& fragmentShader)

{

unsigned int program = glCreateProgram();

unsigned int vs = CompileShader(GL_VERTEX_SHADER, vertexShader);

unsigned int fs = CompileShader(GL_FRAGMENT_SHADER, fragmentShader);

//to link vs and fs together

glAttachShader(program, vs);

glAttachShader(program, fs);

glLinkProgram(program);

glValidateProgram(program);

//to delete when we get the results

glDeleteShader(vs);

glDeleteShader(fs);

  

return program;

}

  

int main(void)

{

GLFWwindow* window;

  

/* Initialize the library */

if (!glfwInit())

return -1;

  

// glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);

// glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);

// glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);

// glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

  

/* Create a windowed mode window and its OpenGL context */

window = glfwCreateWindow(640, 480, "Hello World", NULL, NULL);

if (!window)

{

glfwTerminate();

return -1;

}

  
  

/* Make the window's context current */

glfwMakeContextCurrent(window);

  

float positions[6] = {

-0.5f, -0.5f,

0.0f, 0.5f,

0.5f, -0.5f

};

  

unsigned int buffer;

glGenBuffers(1, &buffer); // This function is generating a buffer and giving us back an id

glBindBuffer(GL_ARRAY_BUFFER, buffer); // This function is used to select(bind) a buffer

glBufferData(GL_ARRAY_BUFFER, 6 * sizeof(float), positions, GL_STATIC_DRAW); // This function is used to provide data to the buffer

  

glEnableVertexAttribArray(0);

glVertexAttribPointer(0, 2, GL_FLOAT,GL_FALSE, sizeof(float) * 2,0);

  

std::string vertexShader =

"#version 120\n"

"\n"

"attribute vec4 position;\n"

"\n"

"void main()\n"

"{\n"

" gl_Position = position;\n"

"}\n";

  

std::string fragmentShader =

"#version 120\n"

"\n"

"void main()\n"

"{\n"

" gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n"

"}\n";

  

unsigned int shader = CreateShader(vertexShader,fragmentShader);

glBindBuffer(GL_ARRAY_BUFFER,0);

glUseProgram(shader);

  

/* Loop until the user closes the window */

while (!glfwWindowShouldClose(window))

{

/* Render here */

glClear(GL_COLOR_BUFFER_BIT);

glDrawArrays(GL_TRIANGLES,0,3);

  

  
  

/* Swap front and back buffers */

glfwSwapBuffers(window);

  

/* Poll for and process events */

glfwPollEvents();

}

glDeleteProgram(shader);

  

glfwTerminate();

return 0;

}
```

The above code generates a triangle by specifying the unique vertices.

The advantage that Modern OpenGL offers over Legacy is the addition of users which allows us to render shapes with much more customisability.  

The two primary types of shaders used in most programs are:
- Vertex Shaders to specify the location/coordinates of vertices;and
- Fragment Shaders used to specify the colour of rendered shapes.
Output:


![Red Triangle](https://github.com/Faulty404/blog/blob/master/assets/posts/OpenGL-3D-Game-Engine/RedTriangle.png)
# Rendering a rectangle
```c++
#include <GLFW/glfw3.h>

#include <stdio.h>

#include <stdlib.h>

  

int main()

{

printf("Hello, YouTube!\n");

  

if(!glfwInit()) {

exit(EXIT_FAILURE);

}

glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);

glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);

glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GLFW_TRUE);

  

GLFWwindow *window = glfwCreateWindow(420, 420, "dnqr.", NULL, NULL);

if(!window) {

exit(EXIT_FAILURE);

}

glfwMakeContextCurrent(window);

glViewport(0, 0, 420, 420);

  

// shaders

const char* vShaderCode =

"#version 410 core\n"

"layout (location = 0) in vec2 vertex_position;\n"

"void main() {\n"

" gl_Position = vec4(vertex_position, 0.0, 1.0);\n"

"}\0";

const char* fShaderCode =

"#version 410 core\n"

"out vec4 frag_color;\n"

"void main(){\n"

" frag_color = vec4(0.1412, 0.1608, 0.1843, 1.0);\n"

"}\0";

  

unsigned int vShader, fShader;

vShader = glCreateShader(GL_VERTEX_SHADER);

glShaderSource(vShader, 1, &vShaderCode, NULL);

glCompileShader(vShader);

fShader = glCreateShader(GL_FRAGMENT_SHADER);

glShaderSource(fShader, 1, &fShaderCode, NULL);

glCompileShader(fShader);

  

unsigned int shaderProgram = glCreateProgram();

glAttachShader(shaderProgram, vShader);

glAttachShader(shaderProgram, fShader);

glLinkProgram(shaderProgram);

  

// vertices & indices

float vertices[] = {

-0.5, -0.5,

-0.5, 0.5,

0.5, 0.5,

0.5, -0.5

};

unsigned int indices[] = {

0, 1, 2,

2, 3, 0

};

  

unsigned int VAO, VBO, EBO;

  

glGenVertexArrays(1, &VAO);

glGenBuffers(1, &VBO);

glGenBuffers(1, &EBO);

  

glBindVertexArray(VAO);

  

glBindBuffer(GL_ARRAY_BUFFER, VBO);

glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);

glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);

  

glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, 0, (void *) 0);

glEnableVertexAttribArray(0);

  
  

// loop

while(!glfwWindowShouldClose(window)) {

glClearColor(0.9451, 0.9451, 0.9451, 1.0);

glClear(GL_COLOR_BUFFER_BIT);

  

// draw

glUseProgram(shaderProgram);

glBindVertexArray(VAO);

glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);

  

glfwSwapBuffers(window);

glfwPollEvents();

}

  

glfwTerminate();

return 0;

}
```

In the above program we use shaders and modern OpenGl to render a rectangle on the screen. A triangle is the default primitive used by the GPU to render shapes as it has the minimum amount of vertices required to render a flat shape.

To make the rectangle we are actually rendering two triangles having two vertices common.

Using index buffers allows us to use less memory by only storing unique vertices and calling them at different points to generate the rectangle.

Output:
![Rectangle.png](https://github.com/Faulty404/blog/blob/master/assets/posts/OpenGL-3D-Game-Engine/Rectangle.png)


### Challenges Ahead:

Our tasks for the next week will be as follows:

1. To start with the implementation of OpenGL code and start working on the 3D game engine.
2. Learn how to render basic animations on the screen using the GPU.
3. Abstract the game engine code into various classes so as to reduce clutter.
