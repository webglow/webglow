interface IEngineGlobals {
	gl: WebGL2RenderingContext;
	canvas: HTMLCanvasElement;
}

interface Window {
	EngineGlobals: IEngineGlobals;
}
