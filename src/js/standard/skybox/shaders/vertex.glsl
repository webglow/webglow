#version 300 es

in vec4 aPosition;
in vec3 aNormal;
uniform mat4 uWorldViewProjection;
uniform mat4 uWorld;
uniform mat4 uWorldInverseTranspose;

in vec3 aColor;
out vec3 vColor;
out vec3 vNormal;

void main() {
	gl_Position = uWorldViewProjection * aPosition;

	vNormal = vec3(mat3(uWorldInverseTranspose) * aNormal);
	vColor = aColor;
}
