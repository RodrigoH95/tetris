export default class Controls {
  constructor(game) {
    this.game = game;
    this.controls = null;
    this.buttons = null;
    this.movementLoop = null; // mobile
  }

  init() {
    console.log("Controls starting...");
    this.buttons = document.getElementById("buttons");
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
    addEventListener("touchstart", this.handleTouchStart.bind(this));
    addEventListener("touchend", this.handleTouchEnd.bind(this));
  }

  stopListeners() {
    removeEventListener("keydown", this.handleKeyDown.bind(this));
    removeEventListener("keyup", this.handleKeyUp.bind(this));
    removeEventListener("touchstart", this.handleTouchStart.bind(this));
    removeEventListener("touchend", this.handleTouchEnd.bind(this));
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

  handleTouchStart(elem) {
    if(!elem.target.classList.contains("button")) return;
    const id = elem.target.id;
    switch (id) {
      case "left":
        this.game.blocks.move(-1)
        this.movementLoop = setInterval(() => this.game.blocks.move(-1), 100);
        break;
      case "right":
        this.game.blocks.move(1)
        this.movementLoop = setInterval(() => this.game.blocks.move(1), 100);
        break;
      case "rotate":
        this.game.rotateBlock();
        break;
      case "down":
        if(this.game.isAccelerating) return;
        this.game.accelerate();
        break;
    }
  }

  handleTouchEnd(elem) {
    if(!elem.target.classList.contains("button")) return;
    const id = elem.target.id;
    switch (id) {
      case "left":
      case "right":
        clearInterval(this.movementLoop);
        break;
      case "down":
        if(!this.game.isAccelerating) return;
        this.game.slowDown();
        break;
    }
  }
}