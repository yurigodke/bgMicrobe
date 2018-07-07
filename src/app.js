import Microbe from './lib/Microbe';
import Food from './lib/Food';

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

		this.microbes = [];
		this.food = [];

		this.container = container;
		this.options = Object.assign(options, defaultOptions);

		this.initialize();
	}

	initialize() {
		this.setCanvasContext();

		let microbesNumber = this.options.microbes;
		let foodNumber = this.options.food;

		for (var i = 0; i < microbesNumber; i++) {
			this.createMicrobes();
		}

		for (var i = 0; i < foodNumber; i++) {
			this.createFood();
		}

		console.log(this.microbes);
		console.log(this.food);
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
		this.microbes.push(new Microbe(this.canvas));
	}

	createFood() {
		this.food.push(new Food(this.canvas));
	}
}

window.bgMicrobe = bgMicrobe;
export default bgMicrobe;
