/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_Microbe__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_Food__ = __webpack_require__(2);



let bgMicrobe = class bgMicrobe {
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
		};

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
		this.microbes.push(new __WEBPACK_IMPORTED_MODULE_0__lib_Microbe__["a" /* default */](this.canvas));
	}

	createFood() {
		this.food.push(new __WEBPACK_IMPORTED_MODULE_1__lib_Food__["a" /* default */](this.canvas));
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
				this.food.splice(index, 1);
			} else if (areaX && areaY) {
				let tanFood = foodDistanceY / foodDistanceX;
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
				this.microbes.splice(index, 1);
			} else {
				this.checkProximityFood(index);
				if (item.checkClone()) {
					let propsClone = Object.assign({}, item.props);
					propsClone.rotate = (propsClone.rotate + 45) % 360;
					this.microbes.push(new __WEBPACK_IMPORTED_MODULE_0__lib_Microbe__["a" /* default */](this.canvas, propsClone));
				}
				item.setNextPosition();
			}
			item.reload();
		});

		this.food.forEach((item, index) => {
			item.drawFoods();
		});

		setTimeout(this.animate.bind(this), 40);
	}
};


window.bgMicrobe = bgMicrobe;
/* harmony default export */ __webpack_exports__["default"] = (bgMicrobe);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let Microbe = class Microbe {
	constructor(canvas, props = {}) {
		this.canvas = canvas;

		this.param = {
			minSize: 6,
			maxSize: 9,
			minRotate: 0,
			maxRotate: 360,
			minPosX: this.canvas.margins.left,
			maxPosX: this.canvas.width - (this.canvas.margins.left + this.canvas.margins.right),
			minPosY: this.canvas.margins.top,
			maxPosY: this.canvas.height - (this.canvas.margins.top + this.canvas.margins.bottom),
			lifeTime: 1000
		};

		let defaultProps = {
			width: Math.floor(Math.random() * (this.param.maxSize - this.param.minSize + 1)) + this.param.minSize,
			rotate: Math.floor(Math.random() * (this.param.maxRotate - this.param.minRotate + 1)) + this.param.minRotate,
			posX: Math.floor(Math.random() * (this.param.maxPosX - this.param.minPosX + 1)) + this.param.minPosX,
			posY: Math.floor(Math.random() * (this.param.maxPosY - this.param.minPosY + 1)) + this.param.minPosY,
			speed: .5,
			life: this.param.lifeTime,
			dead: false,
			colors: ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.7)']
		};
		defaultProps.height = defaultProps.width / 2;

		this.props = Object.assign(defaultProps, props);

		this.draw();
	}

	eat() {
		this.props.width++;
		this.props.height = this.props.width / 2;
		this.props.life = this.param.lifeTime;
		this.props.foodAng = null;
	}

	draw() {
		let width = this.props.width / 2;
		let height = this.props.height / 2;
		let rotation = this.props.rotate * Math.PI / 180;
		let posX = this.props.posX;
		let posY = this.props.posY;
		let color = this.props.colors[Math.floor(Math.random() * this.props.colors.length)];

		if (!this.props.color) {
			this.props.color = color;
		}

		this.canvas.ctx.beginPath();
		this.canvas.ctx.strokeStyle = this.props.color;
		this.canvas.ctx.ellipse(posX, posY, width, height, rotation, 0, Math.PI * 2);
		this.canvas.ctx.stroke();
	}

	checkClone() {
		let clone = false;

		if (this.props.width > this.param.maxSize) {
			clone = true;

			this.props.width = this.param.minSize;
			this.props.height = this.props.width / 2;
			this.props.life = this.param.lifeTime;
		}

		return clone;
	}

	reload() {
		this.props.life--;
		let width = this.props.width / 2;
		let height = this.props.height / 2;
		let rotation = this.props.rotate * Math.PI / 180;
		let posX = this.props.posX;
		let posY = this.props.posY;
		let color = this.props.color;

		this.canvas.ctx.beginPath();
		this.canvas.ctx.strokeStyle = color;
		this.canvas.ctx.ellipse(posX, posY, width, height, rotation, 0, Math.PI * 2);
		this.canvas.ctx.stroke();
	}

	getDirectionProps() {
		let props = {
			x: 0,
			y: 0,
			xLine: '',
			yLine: '',
			rotate: this.props.rotate
		};

		if (this.props.rotate <= 90) {
			props.x = 1;
			props.y = 1;
			props.xLine = 'B';
			props.yLine = 'C';
		} else if (this.props.rotate <= 180) {
			props.x = -1;
			props.y = 1;
			props.xLine = 'C';
			props.yLine = 'B';
			props.rotate -= 90;
		} else if (this.props.rotate <= 270) {
			props.x = -1;
			props.y = -1;
			props.xLine = 'B';
			props.yLine = 'C';
			props.rotate -= 180;
		} else if (this.props.rotate <= 360) {
			props.x = 1;
			props.y = -1;
			props.xLine = 'C';
			props.yLine = 'B';
			props.rotate -= 270;
		}

		return props;
	}

	getPosition(props) {
		let radian = props.rotate * (Math.PI / 180);
		let cosine = Math.cos(radian);

		let lines = {};
		lines['A'] = this.props.speed, lines['B'] = cosine * lines.A, lines['C'] = Math.sqrt(Math.pow(lines.A, 2) - Math.pow(lines.B, 2));

		let position = {
			x: lines[props.xLine] * props.x,
			y: lines[props.yLine] * props.y
		};

		return position;
	}

	getRotation() {
		let foodRotate;
		let rotateSpeed = 2;
		let rotateVariation = Math.floor(Math.random() * (rotateSpeed - -rotateSpeed + 1) + -rotateSpeed);

		let minPosX = this.canvas.margins.left;
		let maxPosX = this.canvas.width - (this.canvas.margins.left + this.canvas.margins.right);
		let minPosY = this.canvas.margins.top;
		let maxPosY = this.canvas.height - (this.canvas.margins.top + this.canvas.margins.bottom);

		if (this.props.posX < minPosX) {
			if (this.props.rotate > 180) {
				rotateVariation = 2;
			} else {
				rotateVariation = -2;
			}
		} else if (this.props.posX > maxPosX) {
			if (this.props.rotate > 0 && this.props.rotate < 180) {
				rotateVariation = 2;
			} else {
				rotateVariation = -2;
			}
		} else if (this.props.posY < minPosY) {
			if (this.props.rotate > 270 || this.props.rotate < 90) {
				rotateVariation = 2;
			} else {
				rotateVariation = -2;
			}
		} else if (this.props.posY > maxPosY) {
			if (this.props.rotate > 90 && this.props.rotate < 270) {
				rotateVariation = 2;
			} else {
				rotateVariation = -2;
			}
		} else if (this.props.foodAng) {
			let rotateAdapt = this.props.foodAng - this.props.rotate;
			let rotateAtack = Math.floor(Math.random() * (rotateSpeed * 2));
			if (rotateAdapt > 180 || rotateAdapt < -180) {
				rotateAdapt = rotateAdapt * -1;
			}
			if (rotateAdapt < -1) {
				foodRotate = (this.props.rotate - rotateAtack) % 360;
			} else if (rotateAdapt > 1) {
				foodRotate = (this.props.rotate + rotateAtack) % 360;
			} else {
				foodRotate = this.props.foodAng;
			}
		}

		let newRotate = foodRotate || (this.props.rotate + rotateVariation) % 360;
		return newRotate < 0 ? 360 : newRotate;
	}

	setNextPosition() {
		if (this.props.life > 0) {
			let propDirection = this.getDirectionProps();

			let position = this.getPosition(propDirection);

			this.props.posX += position.x;
			this.props.posY += position.y;

			let rotate = this.getRotation();

			this.props.rotate = rotate;
		} else {
			let opacity = 0;
			if (200 + this.props.life >= 0) {
				opacity = ("000" + (200 + this.props.life)).slice(-3);
			}

			if (Number(opacity) > 0) {
				this.props.color = `rgba(0, 0, 0, 0.${opacity})`;
			} else {
				this.props.dead = true;
			}
		}
	}
};


/* harmony default export */ __webpack_exports__["a"] = (Microbe);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let Food = class Food {
	constructor(canvas, props = {}) {
		this.canvas = canvas;

		const param = {
			size: 3,
			minPosX: this.canvas.margins.left,
			maxPosX: this.canvas.width - (this.canvas.margins.left + this.canvas.margins.right),
			minPosY: this.canvas.margins.top,
			maxPosY: this.canvas.height - (this.canvas.margins.top + this.canvas.margins.bottom)
		};

		let defaultProps = {
			radius: param.size,
			posX: Math.floor(Math.random() * (param.maxPosX - param.minPosX + 1)) + param.minPosX,
			posY: Math.floor(Math.random() * (param.maxPosY - param.minPosY + 1)) + param.minPosY,
			color: 'rgba(0, 0, 0, 0.7)'
		};

		this.props = Object.assign(defaultProps, props);

		this.drawFoods();
	}

	drawFoods() {
		let radius = this.props.radius / 2;
		let posX = this.props.posX;
		let posY = this.props.posY;
		let color = this.props.color;

		this.canvas.ctx.beginPath();
		this.canvas.ctx.fillStyle = color;
		this.canvas.ctx.arc(posX, posY, radius, 0, Math.PI * 2);
		this.canvas.ctx.fill();
	}
};


/* harmony default export */ __webpack_exports__["a"] = (Food);

/***/ })
/******/ ]);