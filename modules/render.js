export default class Render {
  constructor(canvas, colors) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.colors = colors;
    this.score = document.getElementById("score");
  }

  drawSquare(x, y, size, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.rect(x, y, size, size);
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  }

  drawMap(map, blockSize) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] > 0) {
          // Obtener colores de otra forma
          const color = this.colors[map[i][j] - 1];
          const x = j * blockSize;
          const y = i * blockSize;
          this.drawSquare(x, y, blockSize, color);
        }
      }
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBlock(block) {
    const color = block.color;
    const size = block.blockSize;
    let y = block.y;
    if (!block.shape) return;
    for (let row of block.shape) {
      let x = block.x;
      for (const square of row) {
        if (square) {
          this.drawSquare(x, y, size, color);
        }
        x += size;
      }
      y += size;
    }
  }

  showScore(score) {
    this.score.innerText = score.padStart(9, '0');
  }
}