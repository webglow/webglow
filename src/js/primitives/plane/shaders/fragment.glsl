#version 300 es

precision highp float;

out vec4 outColor;

in vec3 vColor;

void main() {
	outColor = vec4(vColor.xyz, 1);
}
