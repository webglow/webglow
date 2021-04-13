#version 300 es

precision highp float;

out vec4 outColor;

in vec3 vColor;
in vec3 vNormal;

uniform vec3 uLightSource;

void main() {
	vec3 normal = normalize(vNormal);
	outColor = vec4(vColor.xyz * dot(normal, uLightSource), 1);
}
