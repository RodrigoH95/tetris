import { Blocks } from "./blocks.js";
import Controls from "./controls.js";
import Render from "./render.js";

export default class Game {
  constructor(root) {
    this.root = root;
    this.canvas = null;
    this.blocks = null;
    this.ctx = null;
    this.loop = null;
    this.controls = null;
    this.FPS = 60;
    this.minSpeed = 2;
    this.speed = this.minSpeed;
    this.frameCounter = 0;
    this.isAccelerating = false;
    this.render = null;
    // this.lastLoop = null;
  }

  init(width, height) {
    console.log("Game starting...");
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    this.root.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.blocks = new Blocks(this.canvas);
    this.blocks.init();

    let colors = this.blocks.blockGenerator.colors; // Lista de colores
    this.render = new Render(this.canvas, colors);

    this.controls = new Controls(this);
    this.controls.init();

    // this.lastLoop = new Date();
  }

  start() {
    this.blocks.setCurrentBlock(this.blocks.generateBlock());
    this.startLoop();
  }

  startLoop() {
    this.loop = setInterval(this.update.bind(this), 1000 / this.FPS);
  }

  accelerate() {
    this.speed *= 4;
    this.isAccelerating = true;
  }

  slowDown() {
    this.speed = this.minSpeed;
    this.isAccelerating = false;
  }

  rotateBlock() {
    const orig = this.blocks.getCurrentBlock();
    const blockCopy = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig);
    blockCopy.rotate();
    if (!this.blocks.map.checkLateralCollision(blockCopy, 0)) {
      orig.rotate();
    }
  }

  stopLoop() {
    clearInterval(this.loop);
    this.loop = null;
  }

  draw() {
    this.render.clear();
    this.render.drawBlock(this.blocks.getCurrentBlock());
    this.render.drawMap(this.blocks.getMap(), this.blocks.blockSize);
  }

  update() {
    this.draw()

    if (this.frameCounter >= this.FPS / this.speed) {
      if (this.blocks.checkCollision(this.blocks.getCurrentBlock())) {
        this.blocks.addBlockToMap(this.blocks.getCurrentBlock());
        this.blocks.checkLines();
        this.blocks.setCurrentBlock(this.blocks.generateBlock());
      }
      this.blocks.update();
      this.frameCounter = 0;
    }

    this.frameCounter += this.speed;
  }
}