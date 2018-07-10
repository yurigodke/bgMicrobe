import Microbe from './lib/Microbe';
import Food from './lib/Food';

class bgMicrobe {
	constructor(container, options = {}) {
		const defaultOptions = {
			microbes: 10,
			food: 0,
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

		this.animate();
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

	clearCanvas() {
		this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	animate() {
		this.clearCanvas();

		this.microbes.forEach((item) => {
			item.setNextPosition();
			item.reload();
		})



		setTimeout(this.animate.bind(this), 40);
	}
}

window.bgMicrobe = bgMicrobe;
export default bgMicrobe;
