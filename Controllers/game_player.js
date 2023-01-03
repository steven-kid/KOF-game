import { gameObject } from "./game_object";

class gamePlayer extends gameObject{
  constructor(root, info){
    super();
    this.root = root;

    this.id = info.id;
    this.x = info.x;
    this.y = info.y;
    this.width = info.width;
    this.height = info.height;
    this.color = info.color;

    // right 1, left 0
    this.direction = 1;
    this.vx = 0;
    this.vy = 0;

    this.gravity = 50;
    this.speedx = 300;
    this.speedy = 1000;
    this.ctx = this.root.gameMap.ctx;
    // idle 0
    // move front 1
    // move back 2
    // jump 3
    // attack 4
    // being attack 5
    // dead 6
    this.status = 3;
    this.pressKeys = this.root.gameMap.keyEvent.pressKeys;

    this.animations = new Map();
  }
  start(){

  }
  updateControl(){
    let w, a, s, d, space;
    // console.log(this.id);
    if(this.id == 0){
      w = this.pressKeys.has('w');
      a = this.pressKeys.has('a');
      s = this.pressKeys.has('s');
      d = this.pressKeys.has('d');
      space = this.pressKeys.has(' ');
    } else {
      w = this.pressKeys.has('ArrowUp');
      a = this.pressKeys.has('ArrowLeft');
      s = this.pressKeys.has('ArrowDown');
      d = this.pressKeys.has('ArrowRight');
      space = this.pressKeys.has('Enter');
    }
    if(this.status == 0 || this.status == 1 || this.status == 2){
      // console.log('here');
      if(w){
        if(d){
          this.vx = this.speedx;
        } else if(a){
          this.vx = -this.speedx;
        } else {
          this.vx = 0;
        }
        this.vy = -this.speedy;
        this.status = 3;
      } else if(d){
        this.vx = this.speedx;
        this.status = 1;
      } else if(a){
        this.vx = -this.speedx;
        this.status = 2;
      } else {
        this.vx = 0;
        this.status = 0;
      }
    }
    // console.log(w, a, s, d);
    // console.log(this.pressKeys);
    // console.log(this.pressKeys.has('w'), w);
  }

  updateMove(){
    this.vy += this.gravity;

    this.x += this.vx * this.timeDelta / 1000;
    this.y += this.vy * this.timeDelta / 1000;

    // hit floor
    if(this.y > 250){
      this.y = 250;
      this.vy = 0;
      this.status = 0;
    }
    // hit left wall
    if(this.x < 0)
    {
      this.vx = 0;
      this.x = 0;
      this.status = 0;
    }
    // console.log(this.root.gameMap.canvasDOM.width);
    if(this.x + this.width > this.root.gameMap.canvasDOM.width){
      this.vx = 0;
      this.x = this.root.gameMap.canvasDOM.width - this.width;
      this.status = 0;
    }
  }
  update(){
    this.updateControl();
    this.updateMove();
    this.render();
  }

  render(){
    this.ctx.fillStyle = this.color;
    // console.log(this.x, this.y, this.width, this.height)
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { gamePlayer };