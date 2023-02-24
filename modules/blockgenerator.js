import { Block } from "./blocks.js";

export default class BlockGenerator {
  constructor(canvasWidth, blockSize) {
    this.shapes = [];
    this.colors = [];
    this.canvasWidth = canvasWidth;
    this.blockSize = blockSize;
  }

  init() {
    this.shapes.push(
      {
        shape: [
          [1, 0],
          [1, 0],
          [1, 1],
        ],
        color: "#F2E830",
      },
      {
        shape: [
          [2, 2, 0],
          [0, 2, 2],
        ],
        color: "#66E42E",
      },
      {
        shape: [
          [3, 3],
          [3, 3],
        ],
        color: "#296DFC",
      },
      {
        shape: [[4], [4], [4], [4]],
        color: "#FF4747",
      },
      {
        shape: [
          [5, 0],
          [5, 5],
          [5, 0],
        ],
        color: "#F553FF",
      },
      {
        shape: [
          [0, 6],
          [0, 6],
          [6, 6],
        ],
        color: "#FF9018",
      },
      {
        shape: [
          [0, 7, 7],
          [7, 7, 0],
        ],
        color: "#2AEDD5",
      }
    );

    this.colors = this.shapes.map((block) => block.color);
    console.log(`Block generator loaded (${this.shapes.length} blocks)`);
  }

  generateBlock() {
    const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
    const blockSize = this.blockSize;
    const rowWidth = shape.shape[0].length * blockSize;
    // Formula para dibujar el bloque dentro de las paredes del juego (Podria reemplazarse para que simplemente aparezcan en el centro de la pantalla)
    const pos = Math.floor((Math.random() * (this.canvasWidth - rowWidth + blockSize)) / blockSize) * blockSize;
    return new Block(pos, shape, blockSize);
  }
}
