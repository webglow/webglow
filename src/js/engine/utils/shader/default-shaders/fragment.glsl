#version 300 es

precision highp float;

vec3 ambientColor = vec3(0.08, 0.08, 0.08);

out vec4 outColor;

uniform mat3 uDirectionalLight[10];
uniform uint uDirectionalLightNumber;
uniform mat3 uPointLight[10];
uniform uint uPointLightNumber;
uniform bool uEnableLighting;
uniform sampler2D uTexture;
uniform vec3 uColor;
uniform bool uHasTexture;

in vec3 vNormal;
in vec3 vWorldPosition;
in vec2 vTextureCoord;

uniform vec3 uViewWorldPosition;
uniform bool uEnableSpecular;
uniform float uSpecularStrength;

#{shaderExtension}

vec3 calcLight(vec3 objectColor) {
	vec3 normal = normalize(vNormal);

	vec3 color = ambientColor;

	for (uint i = 0u; i < uDirectionalLightNumber; i++) {
		color += objectColor *
					smoothstep(0., 1., dot(normal, uDirectionalLight[i][0])) *
					uDirectionalLight[i][1][0] *
					uDirectionalLight[i][2];
	}

	for (uint i = 0u; i < uPointLightNumber; i++) {
		vec3 pointLightDirection = normalize(uPointLight[i][0] - vWorldPosition);
		float light = dot(normal, pointLightDirection);

		color += objectColor *
			smoothstep(0., 1., light) *
			uPointLight[i][1][0] *
			uPointLight[i][2];

		if (uEnableSpecular) {
			vec3 viewDirection = normalize(uViewWorldPosition - vWorldPosition);
			vec3 halfVector = normalize(viewDirection + pointLightDirection);

			if (light > 0.0) {
				color += smoothstep(0., 1., light) * pow(dot(normal, halfVector), uSpecularStrength) * uPointLight[i][2];
			}
		}
	}

	return color;
}

void main() {
	vec3 objectColor = uColor;

	if (uHasTexture) {
		objectColor = texture(uTexture, vTextureCoord).xyz;
	}

	if (!uEnableLighting) {
		outColor = fragment(vec4(objectColor, 1));
		return;
	}

	outColor = fragment(vec4(calcLight(objectColor), 1));
}
