#version 300 es

precision highp float;

out vec4 outColor;
in vec3 vNormal;

in vec3 vColor;
vec3 lightSource = vec3(0, 1, 0);
float lightIntensity = 1.1;

void main() {
	vec3 normal = normalize(vNormal);
	outColor = vec4(vColor.xyz * clamp(dot(normal, lightSource), 0., 1.) * lightIntensity, 1);
}
