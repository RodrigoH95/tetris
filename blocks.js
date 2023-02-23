import BlockMap from './map.js';
import BlockGenerator from './blockgenerator.js'

export class Block {
  constructor(ctx, x, data, reversed = false, size = 10) {
    // data = {type, shape, color}
    this.x = x;
    this.y = 0;
    this.ctx = ctx;
    this.blockSize = size;
    this.shape = reversed ? [...data.shape].reverse() : [...data.shape];
    this.color = data.color;
  }

  draw() {
    let height = 0;
    this.ctx.fillStyle = this.color;
    for (let row of this.shape) {
      const blocks = row.filter((block) => block > 0).length;
      let leftMargin = this.blockSize * row.findIndex((block) => block > 0);
      if (blocks) {
        this.ctx.fillRect(
          this.x + leftMargin,
          this.y + height,
          this.blockSize * blocks,
          this.blockSize
        );
        height += this.blockSize;
      }
    }
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
}

export class Blocks {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.blockSize = 20;
    this.blocks = new BlockMap(this.blockSize);
    this.blockGenerator = new BlockGenerator(this.canvas, this.blockSize);
    this.shapes = [];
    this.currentBlock = null;
  }

  init() {
    const rows = this.canvas.height / this.blockSize;
    const columns = this.canvas.width / this.blockSize;

    this.blockGenerator.init();

    // Generacion del mapa
    this.blocks.init(rows, columns);
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
    return this.blocks.getMap();
  }

  drawBlock() {
    // Draw currentBlock
    this.getCurrentBlock().draw();
  }

  // Check de colision con otro bloque del mapa
  // *****ACTUALMENTE NO CONSIDERA SUPERPOSICION (CAMBIAR)*****
  checkCollision(block) {
    return this.blocks.checkCollision(block);
  }

  // Actualizacion del mapa
  addBlockToMap(block) {
    this.blocks.addBlockToMap(block);
  }

  drawMap() {
    const map = this.getMap();
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] > 0) {
          const color = this.blockGenerator.colors[map[i][j] - 1];
          this.ctx.fillStyle = color;
          this.ctx.fillRect(
            j * this.blockSize,
            i * this.blockSize,
            this.blockSize,
            this.blockSize
          );
        }
      }
    }
  }

  update() {
    this.currentBlock.update();
  }
}