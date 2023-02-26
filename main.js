import Game from './modules/game.js';
const container = document.getElementById("container");

container.style.height = window.innerHeight + "px";

const game = new Game();
game.init();
game.start();