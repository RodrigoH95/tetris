const root = document.getElementById("root");
const canvas = document.createElement("canvas");

canvas.height = 800;
canvas.width = 400;

root.appendChild(canvas);

const ctx = canvas.getContext("2d");

class Block {
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
      let leftMargin = this.blockSize * row.findIndex(block => block > 0);
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
    return {x: this.x, y: this.y};
  }

  getShape() {
    return this.shape;
  }

  getBasePosition() {
    return this.shape.length * this.blockSize + this.y;
  }
}

class Blocks {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    // Es probable que mas tarde sea innecesario almacenar los bloques
    this.blocks = [];
    this.blockSize = 20;
    // Los colores de los bloques se deben administrar de una forma diferente
    // Ahora cada bloque tiene un numero distintivo
    this.shapes = [
      {
        type: "L",
        shape: [[1, 0], [1, 0], [1, 1]],
        color: "green"
      },
      {
        type: "Z",
        shape: [[2, 2, 0], [0, 2, 2]],
        color: "blue"
      },
      {
        type: "O",
        shape: [[3, 3], [3, 3]],
        color: "orange"
      },
      { type: "I", shape: [[4], [4], [4], [4]], color: "red" },
    ];
    this.currentBlock = null;
  }

  generateBlock() {
    const shape = shapes[Math.floor(Math.random() * this.shapes.length)];
    const blockWidth = shape.shape[0].length * this.blockSize; // row width == block width
    const reversed = Math.floor(Math.random() * 2)
    // Formula para dibujar el bloque dentro de las paredes del juego (Podria reemplazarse para que simplemente aparezcan en el centro de la pantalla)
    const pos = Math.floor(Math.random() * (this.canvas.width + this.blockSize - blockWidth) / this.blockSize) * this.blockSize;
    return new Block(this.ctx, pos, shape, reversed, this.blockSize);
  }

  addBlock(block) {
    this.currentBlock = block;
    this.blocks.push(block);
  }

  getBlocks() {
    return this.blocks;
  }

  getCurrentBlock() {
    return this.currentBlock;
  }

  draw() {
    this.getBlocks().forEach(block => block.draw());
  }

  update() {
    this.currentBlock.update();
  }

  // // EN DESUSO
  // currentBlockInFloor() {
  //   return this.currentBlock.getBasePosition() === this.canvas.height;
  // }
}

let blocks = new Blocks(canvas);

// Bloque inicial
// Cuando se refactorice el codigo remover esto
// Actualmente setInterval no comprueba si hay un bloque activo y da error
blocks.addBlock(blocks.generateBlock()); 

// MOVER ESTAS FUNCIONES A UNA NUEVA CLASE
// ============================================= //

// Generacion del mapa
const rows = canvas.height / 20; // 20 == block size
const columns = canvas.width / 20;
const map = [];

for (let i = 0; i < rows; i++) {
  map.push(new Array(columns).fill(0));
}

// Check de colision con otro bloque del mapa
function checkCollision(block, map) {
  const blockSize = 20; // Temporal
  const shape = block.getShape();
  const {x, y} = block.getPosition();
  // por cada bloque de la figura comprobar si mapa ya tiene un bloque debajo
  // de la posicion del bloque
  let row = y / blockSize;

  for (const r of shape) {
    let column = x / blockSize;
    for (const block of r) {
      if (!map[row + 1] || block && map[row + 1][column]) {
        console.log("Collision");
        return true;
      }
      column++;
    }
    row++;
  }
  return false;
}

// Actualizacion del mapa
function addBlockToMap(block) {
  const blockSize = 20; // Temporal
  const shape = block.getShape();
  const {x, y} = block.getPosition();

  let row = y / blockSize;
  
  for(const r of shape) {
    let column = x / blockSize;
    for (const block of r) {
      if (block) {
        map[row][column] = block;
      }
      column++;
    }
    row++;
  }
}

//  Loop del juego (temporal)
setInterval(() => {
  if (checkCollision(blocks.getCurrentBlock(), map)) {
    addBlockToMap(blocks.getCurrentBlock());
    blocks.addBlock(blocks.generateBlock());
    // Add to map
    counter = 0
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blocks.draw();
  blocks.update();

  counter++
}, 150);

// ============================================= //
