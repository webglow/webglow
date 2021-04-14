#version 300 es

precision highp float;

out vec4 outColor;
in vec3 vNormal;

in vec3 vColor;
uniform mat3 uDirectionalLight[10];
uniform uint uDirectionalLightNumber;
uniform vec3 uShadowColor;

void main() {
	vec3 normal = normalize(vNormal);
	vec3 color = uShadowColor;

	for (uint i = 0u; i < uDirectionalLightNumber; i++) {
		color += vColor.xyz *
					clamp(dot(normal, uDirectionalLight[i][0]), 0., 1.) *
					uDirectionalLight[i][1][0] *
					uDirectionalLight[i][2];
	}

	outColor = vec4(color, 1);
}
