import { Block, Blocks } from './blocks.js';
import Game from './game.js';
const root = document.getElementById("root");

const game = new Game(root);
game.init(400, 800);
game.start();

