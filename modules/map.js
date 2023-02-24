export default class BlockMap {
  constructor(blockSize) {
    this.blockSize = blockSize;
    this.map = [];
    this.rows = null;
    this.columns = null;
  }

  init(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    for (let i = 0; i < rows; i++) {
      this.map.push(new Array(columns).fill(0));
    }
    console.log(`Map loaded [${columns}x${rows}]`);
  }

  getMap() {
    return this.map;
  }

  checkLines() {
    let lines = 0;
    let indexes = [];
    for (const row of this.map) {
      const index = row.indexOf(0);
      if (index === -1) {
        indexes.push(this.map.indexOf(row));
        lines++;
      }
    }
    for (const index of indexes) {
      this.map.splice(index, 1);
      this.map.unshift(new Array(this.columns).fill(0));
    }
  }

  // Check de colision con otro bloque del mapa
  checkCollision(block, direction = 0) {
    const map = this.getMap();
    const blockSize = this.blockSize;
    const shape = block.getShape();
    const { x, y } = block.getPosition();
    const mapWidth = map[0].length;
    // por cada bloque de la figura comprobar si mapa ya tiene un bloque debajo
    // de la posicion del bloque
    let row = y / blockSize;

    for (const r of shape) {
      let column = x / blockSize;
      for (const c of r) {
        // CHECK COLISION VERTICAL
        if (
          !map[row + 1] ||
          (c && map[row + 1][column]) ||
          (c && map[row][column])
        ) {
          return true;
        }

        // CHECK COLISION LATERAL
        // position == valor del bloque en el mapa para valor de fila y columna
        let position = map[row][column + direction];
        if (
          (c && position) ||
          (direction < 0 && column + direction < 0) ||
          (direction > 0 && column + direction >= mapWidth || column >= mapWidth)
        ) return true;
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