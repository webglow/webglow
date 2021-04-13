#version 300 es

in vec4 aPosition;
uniform mat4 uWorldViewProjection;

in vec3 aColor;
out vec3 vColor;

void main() {
	gl_Position = uWorldViewProjection * aPosition;

	vColor = aColor;
}
