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
		new __WEBPACK_IMPORTED_MODULE_0__lib_Microbe__["a" /* default */](this.canvas);
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

				const param = {
						minSize: 6,
						maxSize: 9,
						minRotate: 0,
						maxRotate: 360,
						minPosX: this.canvas.margins.left,
						maxPosX: this.canvas.width - (this.canvas.margins.left + this.canvas.margins.right),
						minPosY: this.canvas.margins.top,
						maxPosY: this.canvas.height - (this.canvas.margins.top + this.canvas.margins.bottom)
				};

				let defaultProps = {
						width: Math.floor(Math.random() * (param.maxSize - param.minSize + 1)) + param.minSize,
						rotate: Math.floor(Math.random() * (param.maxRotate - param.minRotate + 1)) + param.minRotate,
						posX: Math.floor(Math.random() * (param.maxPosX - param.minPosX + 1)) + param.minPosX,
						posY: Math.floor(Math.random() * (param.maxPosY - param.minPosY + 1)) + param.minPosY,
						colors: ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.7)']
				};
				defaultProps.height = defaultProps.width / 2;

				this.props = Object.assign(props, defaultProps);

				this.createSkeleton();
		}

		createSkeleton() {
				let width = this.props.width / 2;
				let height = this.props.height / 2;
				let rotation = this.props.rotate * Math.PI / 180;
				let posX = this.props.posX;
				let posY = this.props.posY;
				let color = this.props.colors[Math.floor(Math.random() * this.props.colors.length)];

				this.canvas.ctx.beginPath();
				this.canvas.ctx.strokeStyle = color;
				this.canvas.ctx.ellipse(posX, posY, width, height, rotation, 0, Math.PI * 2);
				this.canvas.ctx.stroke();
		}
};


/* harmony default export */ __webpack_exports__["a"] = (Microbe);

/***/ })
/******/ ]);