import { gameObject } from "./game_object";

class gamePlayer extends gameObject{
  constructor(root, info){
    super();
    this.root = root;
    this.id = info.id;
    if(this.id === 0)
    {
      this.x = 250,
      this.y = -100
    } else if(this.id === 1) {
      this.x =  750,
      this.y =  -100
    }
    this.width = info.width;
    this.height = info.height;
    this.atk = info.atk;
    this.attack1 = info.attack1;
    this.attack2 = info.attack2;
    this.attackFrame = info.attackFrame;
    this.attackMove = info.attackMove;
    this.deadFrame = info.deadFrame;

    // right 1, left 0
    this.direction = 1;
    this.vx = 0;
    this.vy = 0;

    this.gravity = 50;
    this.speedx = 300;
    this.speedy = 800;
    this.ctx = this.root.gameMap.ctx;
    // idle 0
    // move front 1
    // move back 2
    // jump 3
    // attack 4
    // being attack 5
    // dead 6
    this.status = 3;
    this.hp = 100;
    this.pressKeys = this.root.gameMap.keyEvent.pressKeys;

    this.animations = new Map();
    this.frameRenderCount = 0;
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
      if(space){
        this.status = 4;
        this.vx = 0;
        this.frameRenderCount = 0;
      } else if(w){
        this.frameRenderCount = 0;
        if(d){
          this.vx = this.speedx;
        } else if(a){
          this.vx = -this.speedx;
        } else {
          this.vx = 0;
        }
        // not at wall
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
    if(this.direction === -1 && (this.status === 1 || this.status === 2)){
      this.status = 3 - this.status;
    }
    // console.log(w, a, s, d);
    // console.log(this.pressKeys);
    // console.log(this.pressKeys.has('w'), w);
  }

  updateMove(){
    // add gravity
    if(this.status === 6) return;
    this.vy += this.gravity;

    this.x += this.vx * this.timeDelta / 1000;
    this.y += this.vy * this.timeDelta / 1000;

    // hit floor
    if(this.y > 250){
      this.y = 250;
      this.vy = 0;
      // jump status
      if(this.status === 3)
        this.status = 0;
    }
    // hit left wall
    if(this.x < 0){
      this.vx = 0;
      this.x = 0;
    }
    // hit right wall
    if(this.x + this.width > this.root.gameMap.canvasDOM.width){
      this.vx = 0;
      this.x = this.root.gameMap.canvasDOM.width - this.width;
    }
  }

  collision(r1, r2){
    if(Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2))
      return false;
    if(Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2))
      return false;
    return true;
  }

  updateDirection(){
    if(this.status === 6) return;
    let players = this.root.players;
    if(players[0] && players[1]){
      let me = this, you = players[1^this.id];
      if(me.x < you.x) me.direction = 1;
      else me.direction = -1;
    }
  }

  updateAttack(){
    // attacking
    if(this.status === 4 && this.attackFrame.has(this.frameRenderCount)){
      let players = this.root.players;
      if(players[0] && players[1]){
        let me = this, you = players[1^this.id];
        let r1 = {}, r2 = {};
        if(me.direction === 1){
          r1 = {
            x1: this.x + this.attack1.x,
            y1: this.y + this.attack2.y, 
            x2: this.x + this.attack1.x + this.attack1.w, 
            y2: this.y + this.attack2.y + this.attack2.h
          };
          r2 = {
            x1: you.x,
            y1: you.y, 
            x2: you.x + you.width, 
            y2: you.y + you.height
          }
        } else {
          r1 = {
            x1: this.x - this.attack1.w,
            y1: this.y + this.attack2.y,
            x2: this.x,
            y2: this.y + this.attack2.y + this.attack2.h
          };
          r2 = {
            x1: you.x,
            y1: you.y, 
            x2: you.x + you.width, 
            y2: you.y + you.height
          }
        }
        if(this.collision(r1, r2)){
          // already dead
          if(you.status === 6) return;
          you.status = 5;
          you.frameRenderCount = 0;
          you.hp = Math.max(you.hp - this.atk, 0);
          if(you.hp === 0)
            you.status = 6;
        }
      }
    }
  }

  update(){
    this.updateDirection();
    this.updateControl();
    this.updateAttack();
    this.updateMove();
    this.render();
  }

  render(){
    // console.log(this.x, this.y, this.width, this.height)
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);
    let obj = this.animations.get(this.status);
    
    if(obj && obj.loaded){
      if(this.direction > 0){
        // this.ctx.fillRect(this.x + this.attack1.x, this.y + this.attack2.y, this.attack1.w, this.attack2.h);
        let k = parseInt(this.frameRenderCount / obj.frameRate) % obj.frameCnt;
        let image = obj.gif .frames[k].image;
        this.ctx.drawImage(image, this.x + obj.offsetX, this.y + obj.offsetY, image.width * obj.scale, image.height * obj.scale);
      } else {
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.root.gameMap.canvasDOM.width, 0);
        // this.ctx.fillRect(this.root.gameMap.canvasDOM.width - this.x + this.width - this.attack1.x, this.y + this.attack2.y, this.attack1.w, this.attack2.h);
        let k = parseInt(this.frameRenderCount / obj.frameRate) % obj.frameCnt;
        let image = obj.gif .frames[k].image;
        this.ctx.drawImage(image, obj.offsetX + this.root.gameMap.canvasDOM.width - this.width - this.x, this.y + obj.offsetY, image.width * obj.scale, image.height * obj.scale);
        this.ctx.restore();
      }
      
    }
    // A gif loaded done
    if((this.status === 4 || this.status === 5) && this.frameRenderCount === obj.frameRate * (obj.frameCnt - 1)){
      // dead should not go back
      if(this.status === 5){
        this.x -= this.attackMove * this.direction;
      }
      this.status = 0;
    }
    if(this.status === 6 && this.frameRenderCount === this.deadFrame){
      this.frameRenderCount -- ;
    }
    this.frameRenderCount ++ ;
  }
}

export { gamePlayer };