#version 300 es

precision highp float;

in vec3 vNormal;
in vec3 vColor;
in vec3 vWorldPosition;

out vec4 outColor;

uniform mat3 uDirectionalLight[10];
uniform uint uDirectionalLightNumber;
uniform vec3 uShadeColor;
uniform mat3 uPointLight[10];
uniform uint uPointLightNumber;
uniform vec3 uViewWorldPosition;
uniform float uEnableSpecular;
uniform float uSpecularStrength;

void main() {
	vec3 normal = normalize(vNormal);
	vec3 color = uShadeColor;

	vec3 viewDirection = normalize(uViewWorldPosition - vWorldPosition);

	for (uint i = 0u; i < uDirectionalLightNumber; i++) {
		color += vColor.xyz *
					smoothstep(0., 1., dot(normal, uDirectionalLight[i][0])) *
					uDirectionalLight[i][1][0] *
					uDirectionalLight[i][2];
	}

	for (uint i = 0u; i < uPointLightNumber; i++) {
		vec3 pointLightDirection = normalize(uPointLight[i][0] - vWorldPosition);
		float light = dot(normal, pointLightDirection);

		color += vColor.xyz *
			smoothstep(0., 1., light) *
			uPointLight[i][1][0] *
			uPointLight[i][2];

		if (uEnableSpecular == 1.) {
			vec3 halfVector = normalize(viewDirection + pointLightDirection);
			if (light > 0.0) {
				color += pow(dot(normal, halfVector), uSpecularStrength) * uPointLight[i][2];
			}
		}
	}

	outColor = vec4(color, 1);
}
