import { Blocks } from "./blocks.js";
import Controls from './controls.js';

export default class Game {
  constructor(root) {
    this.root = root;
    this.canvas = null;
    this.blocks = null;
    this.ctx = null;
    this.loop = null;
    this.controls = null;
    this.FPS = 60;
    this.speed = 2;
    this.frameCounter = 0;
    this.isAccelerating = false;
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

    this.controls = new Controls(this);
    this.controls.init();
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
    this.speed = 2;
    this.isAccelerating = false;
  }

  stopLoop() {
    clearInterval(this.loop);
    this.loop = null;
  }

  update() {
    if (this.frameCounter >= this.FPS / this.speed) {
      this.blocks.update();
      this.frameCounter = 0;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.blocks.checkCollision(this.blocks.getCurrentBlock())) {
        this.blocks.addBlockToMap(this.blocks.getCurrentBlock());
        this.blocks.setCurrentBlock(this.blocks.generateBlock());
      }
      this.blocks.drawBlock();
      this.blocks.drawMap();
      // Rotar da problemas de colision
      // Se debe chequear que el bloque no colisione antes de rotarlo
      // blocks.getCurrentBlock().rotate();
      this.frameCounter += this.speed;
  }
}
