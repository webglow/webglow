#version 300 es

in vec4 aPosition;

uniform mat4 uWorldViewProjection;

void main() {
	gl_Position = uWorldViewProjection * aPosition;
}
