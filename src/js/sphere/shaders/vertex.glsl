#version 300 es

in vec4 aPosition;
uniform mat4 uMatrix;

in vec3 aColor;
out vec3 vColor;

void main() {
	gl_Position = uMatrix * aPosition;

	gl_PointSize = 2.;
	vColor = aColor;
}
