import Game from './modules/game.js';
const root = document.getElementById("root");


// 20 x 40 MAP
const height = Math.floor(window.innerHeight / 40) * 40;
const width = Math.floor(height / 2);
console.log(width, height);

const game = new Game(root);
game.init(width, height);
game.start();