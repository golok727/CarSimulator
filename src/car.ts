export function degreeToRadians(degree: number): number {
	return degree * (Math.PI / 180);
}

type Controls = {
	UP_ARROW: boolean;
	LEFT_ARROW: boolean;
	RIGHT_ARROW: boolean;
	DOWN_ARROW: boolean;
	BREAKS: boolean;
};
export class Car {
	x: number;
	y: number;
	controls: Controls = {
		UP_ARROW: false,
		LEFT_ARROW: false,
		RIGHT_ARROW: false,
		DOWN_ARROW: false,
		BREAKS: false,
	};
	private angle = 0;
	private velocity = 0;
	private brakingFactor = 0.05;
	private reverseSpeed = 0.03;
	private friction = 0.01;
	private steeringSensitivity = 1.2;
	private direction = 1;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;

		this.init();
	}

	draw(ctx: CanvasRenderingContext2D, carImage: HTMLImageElement) {
		ctx.save();
		ctx.fillStyle = "#fff";
		ctx.translate(this.x, this.y);
		ctx.rotate(degreeToRadians(this.angle));
		// ctx.rect(this.x, this.y, 60, 100);
		const carWidth = carImage.naturalWidth;
		const carLength = carImage.naturalHeight;
		const cX = -carWidth / 2;
		const cY = -carLength / 2;
		ctx.rect(cX, cY, carWidth, carLength); // Center the car after translation

		ctx.drawImage(
			carImage,
			cX,
			cY,
			carImage.naturalWidth,
			carImage.naturalHeight
		);
		ctx.restore();
	}

	update() {
		this.direction = Math.sign(this.velocity);

		if (Math.abs(this.velocity) > 0) {
			if (this.controls.LEFT_ARROW) {
				this.angle -= this.steeringSensitivity;
			}
			if (this.controls.RIGHT_ARROW) {
				this.angle += this.steeringSensitivity;
			}
		}

		const angleRad = degreeToRadians(this.angle);
		this.velocity *= 1 - this.friction;

		if (this.controls.UP_ARROW) {
			this.velocity += 0.07;
		}

		if (this.controls.DOWN_ARROW) {
			this.velocity -= this.reverseSpeed;
		}

		if (this.controls.BREAKS) {
			this.activateBreaks();
		}

		const maxForwardSpeed = 6.5;
		const maxReverseSpeed = 2;
		if (this.isMovingForwards()) {
			this.velocity = Math.min(maxForwardSpeed, this.velocity);
		} else {
			this.velocity = Math.max(-maxReverseSpeed, this.velocity);
		}
		// console.log(this.direction, this.velocity);

		this.y -= this.velocity * Math.cos(angleRad);
		this.x += this.velocity * Math.sin(angleRad);

		if (
			!this.controls.UP_ARROW &&
			!this.controls.DOWN_ARROW &&
			Math.abs(this.velocity) < 0.08
		) {
			this.velocity = 0;
		}
	}

	getSpeed() {
		return this.velocity;
	}
	isBraking() {
		return this.controls.BREAKS;
	}

	private activateBreaks() {
		if (this.isMovingForwards()) {
			this.velocity = Math.max(0, this.velocity - this.brakingFactor);
		} else {
			this.velocity = Math.min(0, this.velocity + this.brakingFactor);
		}
	}
	isInRest() {
		return this.velocity === 0;
	}
	isMovingForwards() {
		return this.direction === 1;
	}
	isReversing() {
		return this.direction === -1;
	}
	private init() {
		document.addEventListener("keydown", (ev) => {
			const key = ev.key;

			if (key === "ArrowUp") {
				this.controls.UP_ARROW = true;
			} else if (key === "ArrowDown") {
				this.controls.DOWN_ARROW = true;
			} else if (key === "ArrowLeft") {
				this.controls.LEFT_ARROW = true;
			} else if (key === "ArrowRight") {
				this.controls.RIGHT_ARROW = true;
			} else if (key === " ") {
				this.controls.BREAKS = true;
			}
		});
		document.addEventListener("keyup", (ev) => {
			const key = ev.key;
			if (key === "ArrowUp") {
				this.controls.UP_ARROW = false;
			} else if (key === "ArrowDown") {
				this.controls.DOWN_ARROW = false;
			} else if (key === "ArrowLeft") {
				this.controls.LEFT_ARROW = false;
			} else if (key === "ArrowRight") {
				this.controls.RIGHT_ARROW = false;
			} else if (key === " ") {
				this.controls.BREAKS = false;
			}
		});
	}
}
