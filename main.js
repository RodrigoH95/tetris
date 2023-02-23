import { Block, Blocks } from './blocks.js';

const root = document.getElementById("root");
const canvas = document.createElement("canvas");

canvas.height = 800;
canvas.width = 400;

root.appendChild(canvas);

const ctx = canvas.getContext("2d");
const blocks = new Blocks(canvas);

blocks.init();

// Bloque inicial
// Cuando se refactorice el codigo remover esto
// Actualmente setInterval no comprueba si hay un bloque activo y da error
blocks.setCurrentBlock(blocks.generateBlock());

//  Loop del juego (temporal)
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (blocks.checkCollision(blocks.getCurrentBlock())) {
    blocks.addBlockToMap(blocks.getCurrentBlock());
    blocks.setCurrentBlock(blocks.generateBlock());
  }
  blocks.drawBlock();
  blocks.drawMap();
  // Rotar da problemas de colision
  // Se debe chequear que el bloque no colisione antes de rotarlo
  // blocks.getCurrentBlock().rotate();
  blocks.update();
}, 150);
