import { Car } from "./car";
import "./style.css";
import { UI } from "./ui";

const canvas = document.querySelector("[data-canvas]") as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let cWidth = window.innerWidth;
let cHeight = window.innerHeight;

canvas.width = cWidth;
canvas.height = cHeight;

const GAP = 20;

function drawGrid() {
	for (let row = GAP; row < cHeight; row += GAP) {
		for (let col = GAP; col < cWidth; col += GAP) {
			ctx.beginPath();
			ctx.fillStyle = "#1a1a1a";
			ctx.arc(col, row, 5, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}
	}
}

ctx.fillStyle = "#fff";

const carImage = new Image();
carImage.src = "/car.svg";

const car = new Car(cWidth / 2, cHeight / 2);
const ui = new UI(ctx, car);

const tick = () => {
	ctx.clearRect(0, 0, cWidth, cHeight);
	drawGrid();
	car.draw(ctx, carImage);
	car.update();

	ui.draw();
	ui.update();

	requestAnimationFrame(tick);
};
carImage.onload = () => {
	tick();
};
// ctx.fillStyle = "#000";

// ctx.font = "bold 45px system-ui";
// const radhakrsna = "Radhey Shyam";
// ctx.fillText(radhakrsna, cWidth / 2 - radhakrsna.length * 20, cHeight / 2);
