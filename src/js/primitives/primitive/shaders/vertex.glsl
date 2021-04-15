#version 300 es

in vec4 aPosition;
in vec3 aNormal;
in vec3 aColor;

out vec3 vColor;
out vec3 vNormal;
out vec3 vWorldPosition;

uniform mat4 uWorldViewProjection;
uniform mat4 uWorld;
uniform mat4 uWorldInverseTranspose;

void main() {
	gl_Position = uWorldViewProjection * aPosition;

	vNormal = vec3(mat3(uWorldInverseTranspose) * aNormal);
	vColor = aColor;

	vWorldPosition = (uWorld * aPosition).xyz;
}
