import { IRawColor } from './types';

export default class Color {
	rgb: IRawColor;

	constructor(hex?: string) {
		if (!hex) {
			const randomHex = Math.round(0xffffff * Math.random()).toString(16);
			const hexOffset = '000000'.substring(0, 6 - randomHex.length);
			hex = `#${hexOffset}${randomHex}`;
		}
		this.rgb = this.hexToRgb(hex);
	}

	toNormalizedRgb(): IRawColor {
		return {
			r: this.rgb.r / 255,
			g: this.rgb.g / 255,
			b: this.rgb.b / 255,
		};
	}

	toVec3(): [number, number, number] {
		return [this.rgb.r, this.rgb.g, this.rgb.b];
	}

	toVec4(): [number, number, number, number] {
		return [this.rgb.r, this.rgb.g, this.rgb.b, 255];
	}

	toNormalizedVec3(): [number, number, number] {
		return [this.rgb.r / 255, this.rgb.g / 255, this.rgb.b / 255];
	}

	toNormalizedVec4(): [number, number, number, number] {
		return [this.rgb.r / 255, this.rgb.g / 255, this.rgb.b / 255, 1];
	}

	hexToRgb(hex: string): IRawColor {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
		};
	}
}
