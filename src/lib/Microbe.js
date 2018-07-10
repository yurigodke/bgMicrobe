class Microbe {
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
		}

		let defaultProps = {
			width: Math.floor(Math.random() * (param.maxSize - param.minSize + 1)) + param.minSize,
			rotate: Math.floor(Math.random() * (param.maxRotate - param.minRotate + 1)) + param.minRotate,
			posX: Math.floor(Math.random() * (param.maxPosX - param.minPosX + 1)) + param.minPosX,
			posY: Math.floor(Math.random() * (param.maxPosY - param.minPosY + 1)) + param.minPosY,
			speed: .5,
			colors: [
				'rgba(0, 0, 0, 0.3)',
				'rgba(0, 0, 0, 0.4)',
				'rgba(0, 0, 0, 0.5)',
				'rgba(0, 0, 0, 0.6)',
				'rgba(0, 0, 0, 0.7)'
			]
		}
		defaultProps.height = defaultProps.width / 2;

		this.props = Object.assign(props, defaultProps);

		this.draw();
  }

	draw() {
		let width = this.props.width / 2
		let height = this.props.height / 2;
		let rotation = this.props.rotate * Math.PI/180;
		let posX = this.props.posX;
		let posY = this.props.posY;
		let color = this.props.colors[Math.floor(Math.random() * this.props.colors.length)];

		this.props.color = color;

		this.canvas.ctx.beginPath();
		this.canvas.ctx.strokeStyle = color;
		this.canvas.ctx.ellipse(posX, posY, width, height, rotation, 0, Math.PI*2);
		this.canvas.ctx.stroke();
	}

	reload() {
		let width = this.props.width / 2
		let height = this.props.height / 2;
		let rotation = this.props.rotate * Math.PI/180;
		let posX = this.props.posX;
		let posY = this.props.posY;
		let color = this.props.color;

		this.canvas.ctx.beginPath();
		this.canvas.ctx.strokeStyle = color;
		this.canvas.ctx.ellipse(posX, posY, width, height, rotation, 0, Math.PI*2);
		this.canvas.ctx.stroke();
	}

	getDirectionProps (){
		let props = {
			x: 0,
			y: 0,
			xLine: '',
			yLine: '',
			rotate: this.props.rotate
		}

		if (this.props.rotate <= 90) {
			props.x = 1;
			props.y = 1;
			props.xLine = 'B';
			props.yLine = 'C';
		} else if (this.props.rotate <= 180){
			props.x = -1;
			props.y = 1;
			props.xLine = 'C';
			props.yLine = 'B';
			props.rotate -= 90;
		} else if (this.props.rotate <= 270){
			props.x = -1;
			props.y = -1;
			props.xLine = 'B';
			props.yLine = 'C';
			props.rotate -= 180;
		} else if (this.props.rotate <= 360){
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
		let cosine = Math.cos(radian)

		let lines = {};
		lines['A'] = this.props.speed,
		lines['B'] = cosine * lines.A,
		lines['C'] = Math.sqrt(Math.pow(lines.A, 2) - Math.pow(lines.B, 2))

		let position = {
			x: lines[props.xLine] * props.x,
			y: lines[props.yLine] * props.y
		}

		return position;
	}

	getRotation() {
		let rotateVariation = Math.floor(Math.random()*(2-(-2)+1)+(-2));

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
		}
		let newRotate = (this.props.rotate + rotateVariation) % 360;

		return newRotate < 0 ? 360 : newRotate;
	}

	setNextPosition() {
		let propDirection = this.getDirectionProps();

		let position = this.getPosition(propDirection);

		this.props.posX += position.x;
		this.props.posY += position.y;

		let rotate = this.getRotation();

		this.props.rotate = rotate;
	}
}

export default Microbe;
