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

		this.createSkeleton();
  }

	createSkeleton() {
		let width = this.props.width / 2
		let height = this.props.height / 2;
		let rotation = this.props.rotate * Math.PI/180;
		let posX = this.props.posX;
		let posY = this.props.posY;
		let color = this.props.colors[Math.floor(Math.random() * this.props.colors.length)];


		this.canvas.ctx.beginPath();
		this.canvas.ctx.strokeStyle = color;
		this.canvas.ctx.ellipse(posX, posY, width, height, rotation, 0, Math.PI*2);
		this.canvas.ctx.stroke();
	}
}

export default Microbe;
