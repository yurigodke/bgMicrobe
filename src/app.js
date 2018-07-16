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
		this.options = Object.assign(defaultOptions, options);

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

		this.container.addEventListener('click', this.addClickFood.bind(this));
		window.addEventListener("resize", this.setCanvasContext.bind(this));

		this.animate();
	}

	addClickFood(e) {
		let clickRadius = 20;
		let posMinX = e.offsetX - clickRadius;
		let posMaxX = e.offsetX + clickRadius;
		let posMinY = e.offsetY - clickRadius;
		let posMaxY = e.offsetY + clickRadius;

		for (var i = 0; i < 10; i++) {
			let posX = Math.floor(Math.random() * (posMaxX - posMinX + 1)) + posMinX;
			let posY = Math.floor(Math.random() * (posMaxY - posMinY + 1)) + posMinY;

			this.food.push(new Food(this.canvas, {
				posX,
				posY
			}));
		}
	}

	setCanvasContext() {
		this.container.width = this.container.clientWidth;
		this.container.height = this.container.clientHeight;
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

	checkProximityFood(microbeIndex) {
		let microbePosX = this.microbes[microbeIndex].props.posX;
		let microbePosY = this.microbes[microbeIndex].props.posY;

		this.food.forEach((food, index) => {
			let foodDistanceX = food.props.posX - microbePosX;
			let foodDistanceY = food.props.posY - microbePosY;

			let contactX = foodDistanceX > -1 && foodDistanceX < 1;
			let contactY = foodDistanceY > -1 && foodDistanceY < 1;

			let areaX = foodDistanceX > -50 && foodDistanceX < 50;
			let areaY = foodDistanceY > -50 && foodDistanceY < 50;

			if (contactX && contactY) {
				this.microbes[microbeIndex].eat();
				this.food.splice(index,1);
			} else if (areaX && areaY) {
				let tanFood = foodDistanceY/foodDistanceX;
				let angleRad = Math.atan(tanFood);
				let angleDeg = angleRad * 180 / Math.PI;

				if (foodDistanceX < 0) {
					angleDeg += 180;
				} else if (foodDistanceY < 0 && foodDistanceX >= 0) {
					angleDeg += 360;
				}

				this.microbes[microbeIndex].props.foodAng = angleDeg;
			}
		});
	}

	animate() {
		this.clearCanvas();

		this.microbes.forEach((item, index) => {
			if (item.props.dead) {
				this.microbes.splice(index,1);
			} else {
				this.checkProximityFood(index);
				if (item.checkClone()) {
					let propsClone = Object.assign({}, item.props);
					propsClone.rotate = (propsClone.rotate + 45) % 360
					this.microbes.push(new Microbe(this.canvas, propsClone));
				}
				item.setNextPosition();
			}
			item.reload();
		});

		this.food.forEach((item, index) => {
			item.drawFoods();
		});

		if (this.food.length < (this.options.food * .8) ) {
			let testRandom = Math.round(Math.random());
			if (testRandom) {
				this.createFood()
			}
		}

		setTimeout(this.animate.bind(this), 40);
	}
}

export default bgMicrobe;
