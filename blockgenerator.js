import {Block} from './blocks.js';
export default class BlockGenerator {
  constructor(canvas, blockSize) {
    this.shapes = [];
    this.colors = [];
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.blockSize = blockSize;
  }

  init() {
    // Shapes
    this.shapes.push(
      {
        type: "L",
        shape: [
          [1, 0],
          [1, 0],
          [1, 1],
        ],
        color: "green",
      },
      {
        type: "Z",
        shape: [
          [2, 2, 0],
          [0, 2, 2],
        ],
        color: "blue",
      },
      {
        type: "O",
        shape: [
          [3, 3],
          [3, 3],
        ],
        color: "orange",
      },
      { type: "I", shape: [[4], [4], [4], [4]], color: "red" },
      {
        type: "T",
        shape: [
          [5, 0],
          [5, 5],
          [5, 0],
        ],
        color: "yellow",
      }
    );

    this.colors = this.shapes.map((block) => block.color);
  }

  generateBlock() {
    const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
    const blockWidth = shape.shape[0].length * this.blockSize; // row width == block width
    const reversed = Math.floor(Math.random() * 2);
    // Formula para dibujar el bloque dentro de las paredes del juego (Podria reemplazarse para que simplemente aparezcan en el centro de la pantalla)
    const pos =
      Math.floor(
        (Math.random() * (this.width + this.blockSize - blockWidth)) /
          this.blockSize
      ) * this.blockSize;
    return new Block(this.canvas.getContext("2d"), pos, shape, reversed, this.blockSize);
  }
}
