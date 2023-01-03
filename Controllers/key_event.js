class keyEvent{
  constructor(canvasDOM){
    this.canvasDOM = canvasDOM;
    this.pressKeys = new Set();
    this.start();
  }
  start(){
    this.canvasDOM.onkeydown = (e) => {
      this.pressKeys.add(e.key);
      //console.log(this.pressKeys);
    }
    this.canvasDOM.onkeyup = (e) => {
      this.pressKeys.delete(e.key);
      //console.log(this.pressKeys);
    }
  }
}

export { keyEvent };