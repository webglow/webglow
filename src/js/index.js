import Stats from 'stats.js';
import { resizeCanvasToDisplaySize, hexToRgb } from './helpers';
import Camera from './standard/camera';
import CameraMovement from './standard/camera-movement';
import MainScene from './main-scene';

class Game {
	constructor() {
		this.canvas = document.querySelector('#canvas');

		/** @type {WebGL2RenderingContext} */
		this.gl = this.canvas.getContext('webgl2');
		this.global = {
			camera: new Camera(this.gl, 50, [0, 2500, 72000]),
		};
		window.global = this.global;

		this.globalCameraMovement = new CameraMovement(this.global.camera, this.gl);
		this.setupEventListeners();
	}

	async setupGl() {
		resizeCanvasToDisplaySize(this.gl.canvas, 2);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.enable(this.gl.CULL_FACE);

		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

	setupEventListeners() {
		document.addEventListener('keydown', (event) => {
			this.globalCameraMovement.onKeyDown(event.key);
		});

		document.addEventListener('keyup', (event) => {
			this.globalCameraMovement.onKeyUp(event.key);
		});

		this.canvas.addEventListener('mousedown', () => {
			this.canvas.requestPointerLock();
			this.globalCameraMovement.setIsRotating(true);
		});

		document.addEventListener('mousemove', (event) => {
			this.globalCameraMovement.rotateCamera(event.movementX, event.movementY);
		});

		this.canvas.addEventListener('mouseup', () => {
			document.exitPointerLock();
			this.globalCameraMovement.setIsRotating(false);
		});

		this.canvas.addEventListener('wheel', (event) => {
			this.global.camera.zoom(-Math.sign(event.deltaY));
		});
	}

	async start() {
		await this.setupGl();

		this.stats = new Stats();
		this.stats.showPanel(0);
		document.body.appendChild(this.stats.dom);

		const backgroundColorRgb = hexToRgb('#48dbfb').rgb;
		this.gl.clearColor(
			backgroundColorRgb.r,
			backgroundColorRgb.g,
			backgroundColorRgb.b,
			1.0
		);

		this.mainScene = new MainScene(this.gl);

		this.startTime = Date.now();
		requestAnimationFrame(this.draw.bind(this));
	}

	draw(now) {
		if (!this.frameEndTime) {
			this.frameEndTime = now;
		}

		this.global.deltaTime = (now - this.frameEndTime) / 1000;

		if (this.global.deltaTime > 0.1) {
			this.global.deltaTime = 0;
		}

		this.stats.begin();
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.global.camera.update();

		this.mainScene.draw();

		this.stats.end();
		requestAnimationFrame(this.draw.bind(this));
		this.frameEndTime = now;
	}
}

const game = new Game();
game.start();
