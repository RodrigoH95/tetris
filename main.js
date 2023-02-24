import Game from './modules/game.js';
const root = document.getElementById("root");

const game = new Game(root);
game.init(400, 800);
game.start();