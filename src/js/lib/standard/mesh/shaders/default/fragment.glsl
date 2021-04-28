#version 300 es

precision highp float;

in vec3 vNormal;
in vec3 vWorldPosition;
in vec2 vTextureCoord;

out vec4 outColor;

uniform mat3 uDirectionalLight[10];
uniform uint uDirectionalLightNumber;
uniform vec3 uShadeColor;
uniform mat3 uPointLight[10];
uniform uint uPointLightNumber;
uniform vec3 uViewWorldPosition;
uniform float uEnableSpecular;
uniform float uSpecularStrength;
uniform float uEnableLighting;
uniform sampler2D uTexture;

void main() {
	vec3 normal = normalize(vNormal);

	vec3 color = uShadeColor;
	vec4 textureColor = texture(uTexture, vTextureCoord);

	if (uEnableLighting == 0.) {
		outColor = vec4(textureColor.xyz, 1);
		return;
	}

	vec3 viewDirection = normalize(uViewWorldPosition - vWorldPosition);

	for (uint i = 0u; i < uDirectionalLightNumber; i++) {
		color += textureColor.xyz *
					smoothstep(0., 1., dot(normal, uDirectionalLight[i][0])) *
					uDirectionalLight[i][1][0] *
					uDirectionalLight[i][2];
	}

	for (uint i = 0u; i < uPointLightNumber; i++) {
		vec3 pointLightDirection = normalize(uPointLight[i][0] - vWorldPosition);
		float light = dot(normal, pointLightDirection);

		color += textureColor.xyz *
			smoothstep(0., 1., light) *
			uPointLight[i][1][0] *
			uPointLight[i][2];

		if (uEnableSpecular == 1.) {
			vec3 halfVector = normalize(viewDirection + pointLightDirection);
			if (light > 0.0) {
				color += smoothstep(0., 1., light) * pow(dot(normal, halfVector), uSpecularStrength) * uPointLight[i][2];
			}
		}
	}

	outColor = vec4(color, 1);
}
