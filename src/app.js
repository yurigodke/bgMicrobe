class bgMicrobe {
	constructor(container, options = {}) {
		let defaultOptions = {
			microbes: 100,
			food: 50
		}

		this.container = container;
		this.options = Object.assign(options, defaultOptions);
	}
	
	setCanvasContext(){
		this.context = this.container.getContext("2d");
	}
}

window.bgMicrobe = bgMicrobe;
export default bgMicrobe;