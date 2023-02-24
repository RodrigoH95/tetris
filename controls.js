export default class Controls {
  constructor(game) {
    this.game = game;
    this.controls = null;
  }

  init() {
    console.log("Controls starting...");
    this.enableControls(true);
  }

  enableControls(enable) {
    if (enable) {
      console.log("Controls enabled")
      this.startListeners();
    } else {
      console.log("Removing controls");
      this.stopListeners();
    }
  }

  startListeners() {
    addEventListener("keydown", this.handleKeyDown.bind(this));
    addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  stopListeners() {
    removeEventListener("keydown", this.handleKeyDown.bind(this));
    removeEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleKeyDown(key) {
    switch (key.code) {
      case "KeyP":
        this.game.loop ? this.game.stopLoop() : this.game.startLoop();
        break;
      case "KeyA":
      case "ArrowLeft": 
        this.game.blocks.move(-1);
        break;
      case "KeyD":
      case "ArrowRight":
        this.game.blocks.move(1);
        break;
      case "KeyS":
      case "ArrowDown":
        if(this.game.isAccelerating) return;
        this.game.accelerate();
        break;
      case "Space":
        this.game.rotateBlock();
      }
  }

  handleKeyUp(key) {
    switch (key.code) {
      case "KeyS":
      case "ArrowDown":
        if(!this.game.isAccelerating) return;
        this.game.slowDown();
        break;
    }
  }
}

