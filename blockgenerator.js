import { Block } from "./blocks.js";
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
        shape: [
          [1, 0],
          [1, 0],
          [1, 1],
        ],
        color: "#7FFF00",
      },
      {
        shape: [
          [2, 2, 0],
          [0, 2, 2],
        ],
        color: "#00008B",
      },
      {
        shape: [
          [3, 3],
          [3, 3],
        ],
        color: "#FF8C00",
      },
      { 
        shape: [[4], [4], [4], [4]],
        color: "#DC143C" },
      {
        shape: [
          [5, 0],
          [5, 5],
          [5, 0],
        ],
        color: "#00BFFF",
      }
      // {
      //   type: "+",
      //   shape: [
      //     [0, 6, 0],
      //     [6, 6, 6],
      //     [0, 6, 0],
      //   ],
      //   color: "cyan",
      // }
    );

    this.colors = this.shapes.map((block) => block.color);
    console.log(`Block generator loaded (${this.shapes.length} blocks)`);
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
    return new Block(
      this.canvas.getContext("2d"),
      pos,
      shape,
      reversed,
      this.blockSize
    );
  }
}
