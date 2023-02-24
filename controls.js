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
        console.log("Move Left");
        this.game.blocks.getCurrentBlock().move(-1);
        break;
      case "KeyD":
      case "ArrowRight":
        console.log("Move Right");
        this.game.blocks.getCurrentBlock().move(1);
        break;
      case "KeyS":
      case "ArrowDown":
        if(this.game.isAccelerating) return;
        console.log("Accelerating");
        this.game.accelerate();
        break;
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

