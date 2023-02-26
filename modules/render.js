export default class Render {
  constructor(canvas, colors) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.colors = colors;
    this.score = document.getElementById("score");
    this.nextBlockCanvas = document.createElement("canvas");
    this.nextBlockGUI = document.getElementById("next");
  }

  drawSquare(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  drawMap(map, blockSize) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] > 0) {
          // Obtener colores de otra forma
          const color = this.colors[map[i][j] - 1];
          const x = j * blockSize;
          const y = i * blockSize;
          this.drawSquare(this.ctx, x, y, blockSize, color);
        }
      }
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBlock(block, ctx = this.ctx, toShow = false) {
    const color = block.color;
    const size = block.blockSize;
    let y = toShow ? 0 : block.y;
    if (!block.shape) return;
    for (let row of block.shape) {
      let x = toShow ? 0 : block.x;
      for (const square of row) {
        if (square) {
          this.drawSquare(ctx, x, y, size, color);
        }
        x += size;
      }
      y += size;
    }
  }

  showScore(score) {
    this.score.innerText = score.padStart(9, '0');
  }

  showNextBlock(block) {
    const blockWidth = block.getWidth();
    const blockHeight = block.getHeight();
    this.nextBlockCanvas.height = blockHeight;
    this.nextBlockCanvas.width = blockWidth;
    const ctx = this.nextBlockCanvas.getContext("2d");
    this.drawBlock(block, ctx, true);

    this.nextBlockGUI.src = this.nextBlockCanvas.toDataURL();
  }
}