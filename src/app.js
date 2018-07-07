import Microbe from './lib/Microbe';

class bgMicrobe {
	constructor(container, options = {}) {
		const defaultOptions = {
			microbes: 100,
			food: 50,
			margins: {
				top: 10,
				bottom: 10,
				left: 10,
				right: 10
			}
		}

		this.container = container;
		this.options = Object.assign(options, defaultOptions);

		this.initialize();
	}

	initialize() {
		this.setCanvasContext();

		let microbesNumber = this.options.microbes;

		for (var i = 0; i < microbesNumber; i++) {
			this.createMicrobes();
		}
	}

	setCanvasContext() {
		this.canvas = {
			ctx: this.container.getContext("2d"),
			width: this.container.clientWidth,
			height: this.container.clientHeight,
			margins: this.options.margins
		};
	}

	createMicrobes() {
		new Microbe(this.canvas);
	}
}

window.bgMicrobe = bgMicrobe;
export default bgMicrobe;
