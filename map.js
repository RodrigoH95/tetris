export default class BlockMap {
  constructor(blockSize) {
    this.blockSize = blockSize;
    this.map = [];
  }

  init(rows, columns) {
    for (let i = 0; i < rows; i++) {
      this.map.push(new Array(columns).fill(0));
    }
    console.log(`Map loaded [${columns}x${rows}]`);
  }

  getMap() {
    return this.map;
  }

    // Check de colision con otro bloque del mapa
  // *****ACTUALMENTE NO CONSIDERA SUPERPOSICION (CAMBIAR)*****
  checkCollision(block) {
    const map = this.getMap();
    const blockSize = this.blockSize;
    const shape = block.getShape();
    const { x, y } = block.getPosition();

    // por cada bloque de la figura comprobar si mapa ya tiene un bloque debajo
    // de la posicion del bloque
    let row = y / blockSize;

    for (const r of shape) {
      let column = x / blockSize;
      for (const c of r) {
        if (!map[row + 1] || (c && map[row + 1][column])) {
          return true;
        }
        column++;
      }
      row++;
    }
    return false;
  }

  // Actualizacion del mapa
  addBlockToMap(block) {
    const shape = block.getShape();
    const { x, y } = block.getPosition();

    let row = y / this.blockSize;

    for (const r of shape) {
      let column = x / this.blockSize;
      for (const c of r) {
        if (c) {
          this.map[row][column] = c;
        }
        column++;
      }
      row++;
    }
  }
}