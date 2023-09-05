import { Car } from "./car";
type CTX = CanvasRenderingContext2D;
export class UI {
	ctx: CanvasRenderingContext2D;
	car: Car;
	private speed = 0;
	constructor(ctx: CTX, car: Car) {
		this.ctx = ctx;
		this.car = car;
	}

	draw() {
		this.drawSpeedoMeter();
	}
	update() {
		this.speed = Math.floor(Math.abs(this.car.getSpeed()) * 10);
	}
	private drawDriveMode(x: number, y: number, rad: number = 10) {
		const ctx = this.ctx;
		let text = "D";
		if (this.car.isMovingForwards()) {
			text = "D";
		} else if (this.car.isReversing()) {
			text = "R";
		} else if (this.car.isInRest()) {
			text = "N";
		}

		ctx.beginPath();
		ctx.strokeStyle = "#f00";

		ctx.fillStyle = "#000";

		ctx.arc(x, y, rad, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fill();

		ctx.fillStyle = "#fff";
		ctx.save();
		ctx.font = "bold 15px system-ui";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(text, x, y);
		ctx.restore();
	}
	private drawSpeedCirce(cX: number, cY: number, cR: number) {
		const ctx = this.ctx;
		ctx.beginPath();

		ctx.strokeStyle = "#ff0";
		ctx.fillStyle = "#000";
		const margin = 20;

		const x =
			cX + (cR + margin) * Math.cos(speedToAngle(this.speed, 65) - Math.PI / 2);
		const y =
			cY + (cR + margin) * Math.sin(speedToAngle(this.speed, 65) - Math.PI / 2);
		console.log(x, y);
		ctx.arc(x, y, 5, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fill();

		ctx.closePath();
	}
	private drawSpeedoMeter() {
		const ctx = this.ctx;
		const text = `${this.speed} kmph`;

		const cX = ctx.canvas.width - 150;
		const cY = ctx.canvas.height - 150;
		const cR = 50;
		this.drawSpeedCirce(cX, cY, cR);

		ctx.beginPath();
		if (this.car.isBraking()) {
			ctx.strokeStyle = "#f00";
		} else if (this.car.isMovingForwards()) {
			ctx.strokeStyle = "#0f0";
		} else if (this.car.isReversing()) {
			ctx.strokeStyle = "#ff0";
		} else if (this.car.isInRest()) {
			ctx.strokeStyle = "#f00";
		}
		ctx.lineWidth = 3;

		ctx.fillStyle = "#000";
		ctx.arc(cX, cY, cR, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.save();
		ctx.font = "bold 15px system-ui";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(text, cX, cY);
		ctx.closePath();
		const margin = 32;
		this.drawDriveMode(cX + cR + margin, cY, 20);

		ctx.restore();
	}
}

function speedToAngle(speed: number, maxSpeed: number) {
	// Ensure speed is within the valid range (0 to maxSpeed)
	speed = Math.min(Math.max(speed, 0), maxSpeed);

	// Map speed to an angle between -Math.PI/4 and Math.PI/4
	var minAngle = -Math.PI / 4;
	var maxAngle = Math.PI / 4;
	return minAngle + (maxAngle - minAngle) * (speed / maxSpeed);
}
