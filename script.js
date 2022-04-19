/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
class Universe {
  constructor(moveRadius, step, position, size) {
    this.moveRadius = moveRadius;
    this.step = step;
    this.position = position;
    this.size = size;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(
      Math.cos(this.position) * this.moveRadius + canvas.width / 2,
      Math.sin(this.position) * this.moveRadius + canvas.height / 2,
      this.size,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.position += this.step;
    this.draw();
  }
}
function init() {
  particleArray = [];
  for (let i = 0; i < 1000; i++) {
    let moveRadius = Math.random() * canvas.width;
    let step = Math.random() * 0.00055 + 0.00055;
    let position = Math.random() * (Math.PI * 2);
    let size = Math.random() * 2 + 0.75;
    particleArray.push(new Universe(moveRadius, step, position, size));
  }
}
init();

class SunEarthMoon {
  constructor(color) {
    this.sx = canvas.width / 2;
    this.sy = canvas.height / 2;
    this.sSize = 70;
    this.eSize = 20;
    this.mSize = 5;
    this.color = color;

    this.eRadius = 190;
    this.eAngle = 0;
    this.ex = this.sx + this.eRadius * Math.cos(this.eAngle);
    this.ey = this.sy + this.eRadius * Math.sin(this.eAngle);

    this.mRadius = 30;
    this.mAngle = 0;
    this.mx = this.ex + this.mRadius * Math.cos(this.mAngle);
    this.my = this.ey + this.mRadius * Math.sin(this.mAngle);
  }
  draw() {
    //Sin
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.sx, this.sy, this.sSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath;
    //Earth
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.ex, this.ey, this.eSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath;
    //Moon
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.mx, this.my, this.mSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath;
  }
  update() {
    this.eAngle += 0.05 * 0.3;
    this.ex = this.sx + this.eRadius * Math.cos(this.eAngle);
    this.ey = this.sy + this.eRadius * Math.sin(this.eAngle);

    this.mAngle += 0.09 * 0.5;
    this.mx = this.ex + this.mRadius * Math.cos(this.mAngle);
    this.my = this.ey + this.mRadius * Math.sin(this.mAngle);
  }
}

class Planet {
  constructor(size, angle, radius, color, vel) {
    this.size = size;
    this.angle = angle;
    this.radius = radius;
    this.color = color;
    this.vel = vel;
    this.x = 100;
    this.y = 199;
    this.x = canvas.width / 2 + this.radius * Math.cos(this.angle);
    this.y = canvas.height / 2 + this.radius * Math.sin(this.angle);
  }
  update() {
    this.x = canvas.width / 2 + this.radius * Math.cos(this.angle);
    this.y = canvas.height / 2 + this.radius * Math.sin(this.angle);
    this.angle = this.angle += this.vel;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

let sunEarthMoon = new SunEarthMoon("orange");
let mercury = new Planet(8, 0, 90, "silver", 0.08 * 0.5);
let venus = new Planet(18, 0, 120, "yellow", 0.06 * 0.3);
let mars = new Planet(12, 0, 240, "red", 0.04 * 0.3);
let jupiter = new Planet(28, 0, 285, "orange", 0.03 * 0.3);
let saturn = new Planet(26, 0, 350, "yellow", 0.02 * 0.3);
let uranus = new Planet(24, 0, 400, "lightBlue", 0.01 * 0.3);
let neptune = new Planet(21, 0, 450, "lightBlue", 0.008 * 0.3);

function animate() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }
  sunEarthMoon.draw();
  sunEarthMoon.update();
  mercury.draw();
  mercury.update();
  venus.draw();
  venus.update();
  mars.draw();
  mars.update();
  jupiter.draw();
  jupiter.update();
  saturn.draw();
  saturn.update();
  uranus.draw();
  uranus.update();
  neptune.draw();
  neptune.update();

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  sunEarthMoon.draw();
  sunEarthMoon.update();
  init()
  
});
