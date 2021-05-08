#version 300 es

in vec3 aPosition;

uniform mat3 uWorldViewProjection;

void main() {
	gl_Position = vec4(vec2(uWorldViewProjection * aPosition), 0, 1);

	gl_PointSize = 10.0;
}
