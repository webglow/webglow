#version 300 es

precision highp float;

out vec4 outColor;
in vec3 vNormal;

in vec3 vColor;
vec3 lightSource = vec3(0, 1, 0);

void main() {
	vec3 normal = normalize(vNormal);
	outColor = vec4(vColor.xyz * dot(normal, lightSource), 1);
}
