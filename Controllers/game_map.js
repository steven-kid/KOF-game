import { gameObject } from './game_object'
import { keyEvent } from './key_event';

class gameMap extends gameObject {
  constructor(root){
    super();
    this.root = root;
    this.canvasDOM = document.createElement('canvas');
    this.canvasDOM.width = 1080;
    this.canvasDOM.height = 500;
    this.canvasDOM.tabIndex = 0;
    this.canvasDOM.focus();
    this.ctx = this.canvasDOM.getContext('2d');
    this.root.kofDOM.append(this.canvasDOM);
    this.keyEvent = new keyEvent(this.canvasDOM);
  }
  start(){

  }
  update(){
    // console.log(this.keyEvent.pressKeys);
    this.render();
  }
  render(){
    // console.log(this.ctx.canvas.width)
    // console.log(this.ctx.fillStyle)
    // this.ctx.fillStyle = 'black';
    // this.ctx.fillRect(0, 0, this.canvasDOM.width, this.canvasDOM.height);
    this.ctx.clearRect(0, 0, this.canvasDOM.width, this.canvasDOM.height);
  }
}

export {gameMap};