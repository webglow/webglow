import Color from '../../../utils/color';

export interface MeshConfig {
	enableLighting?: boolean;
	enableSpecular?: boolean;
	specularStrength?: number;
	shadeColor?: [number, number, number];
	[key: string]: any;
}
