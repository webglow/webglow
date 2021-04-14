#version 300 es

in vec4 aPosition;
in vec3 aNormal;
uniform mat4 uWorldViewProjection;
uniform mat4 uWorldMatrix;

in vec3 aColor;
out vec3 vColor;
out vec3 vNormal;

void main() {
	gl_Position = uWorldViewProjection * aPosition;

	vNormal = vec3(mat3(uWorldMatrix) * aNormal);
	vColor = aColor;
}
