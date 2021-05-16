#version 300 es

in vec4 aPosition;
in vec3 aNormal;
in vec2 aTextureCoord;

out vec3 vNormal;
out vec3 vWorldPosition;
out vec2 vTextureCoord;

uniform mat4 uWorldViewProjection;
uniform mat4 uWorld;
uniform mat4 uWorldInverseTranspose;

#{shaderExtension}

void main() {
	gl_Position = vertex(uWorldViewProjection * aPosition);

	vNormal = vec3(mat3(uWorldInverseTranspose) * aNormal);

	vWorldPosition = (uWorld * aPosition).xyz;
	vTextureCoord = aTextureCoord;
}
