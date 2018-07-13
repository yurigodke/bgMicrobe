class Food {
	constructor(canvas, props = {}) {
		this.canvas = canvas;

		const param = {
			size: 3,
			minPosX: this.canvas.margins.left,
			maxPosX: this.canvas.width - (this.canvas.margins.left + this.canvas.margins.right),
			minPosY: this.canvas.margins.top,
			maxPosY: this.canvas.height - (this.canvas.margins.top + this.canvas.margins.bottom)
		}

		let defaultProps = {
			radius: param.size,
			posX: Math.floor(Math.random() * (param.maxPosX - param.minPosX + 1)) + param.minPosX,
			posY: Math.floor(Math.random() * (param.maxPosY - param.minPosY + 1)) + param.minPosY,
			color: 'rgba(0, 0, 0, 0.7)'
		}

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
		this.canvas.ctx.arc(posX, posY, radius, 0, Math.PI*2);
		this.canvas.ctx.fill();
	}
}

export default Food;
