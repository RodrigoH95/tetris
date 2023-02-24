import BlockMap from "./map.js";
import BlockGenerator from "./blockgenerator.js";

export class Block {
  constructor(ctx, x, data, reversed = false, size = 10) {
    this.x = x;
    this.y = 0;
    this.ctx = ctx;
    this.blockSize = size;
    this.shape = reversed ? [...data.shape].reverse() : [...data.shape];
    this.color = data.color;
  }

  rotate() {
    let [row] = this.shape;
    this.shape = row
      .map((value, column) => this.shape.map((row) => row[column]))
      .reverse();
  }

  update() {
    this.y += this.blockSize;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getShape() {
    return this.shape;
  }

  getBasePosition() {
    return this.shape.length * this.blockSize + this.y;
  }

  move(direction) {
    // Direction = -1 || 1;
    this.x += direction * this.blockSize;
  }
}

export class Blocks {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.blockSize = 20;
    this.map = new BlockMap(this.blockSize);
    this.blockGenerator = new BlockGenerator(this.canvas, this.blockSize);
    this.shapes = [];
    this.currentBlock = null;
  }

  init() {
    console.log("=======================");
    console.log("Blocks starting...");
    const rows = this.canvas.height / this.blockSize;
    const columns = this.canvas.width / this.blockSize;

    this.blockGenerator.init();

    // Generacion del mapa
    this.map.init(rows, columns);
    console.log("Blocks finished");
    console.log("=======================");
  }

  generateBlock() {
    return this.blockGenerator.generateBlock();
  }

  getCurrentBlock() {
    return this.currentBlock;
  }

  setCurrentBlock(block) {
    this.currentBlock = block;
  }

  getMap() {
    return this.map.getMap();
  }

  // Check de colision con otro bloque del mapa
  checkCollision(block) {
    return this.map.checkCollision(block);
  }

  // Actualizacion del mapa
  addBlockToMap(block) {
    this.map.addBlockToMap(block);
  }

  move(direction) {
    const currentBlock = this.currentBlock;
    const blockWidth = currentBlock.getShape()[0].length * this.blockSize; // ancho de una fila

    if (!this.map.checkCollision(currentBlock, direction)) {
      currentBlock.move(direction);
    }
  }

  checkLines() {
    this.map.checkLines();
  }

  update() {
    this.currentBlock.update();
  }
}
