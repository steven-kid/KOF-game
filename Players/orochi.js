import { gamePlayer } from "../Controllers/game_player";
import { GIF } from "../utils/gif"

class Orochi extends gamePlayer{
  constructor(root,id){
    super(root, {
      id: id,
      width: 100,
      height: 210,
      atk: 30,
      attack1: {x: 100, w: 65},
      attack2: {y: 20, h: 30},
      attackFrame: new Set([14, 95]),
      deadFrame: 51,
      attackMove: 190
    });
    this.init();
  }
  init(){
    let offsetY = [0, 0, 0, -200, -35, -52, -52]
    let offsetX = [0, 0, 0, -30, -60, -230, -70]
    for (let i = 0; i < 7; i++ ){
      let gif = GIF();
      gif.load(`../images/player/orochi/${i}.gif`);
      this.animations.set(i, {
        gif: gif,
        frameCnt: 0,
        frameRate: 5,
        offsetY: offsetY[i],
        offsetX: offsetX[i],
        scale: 2,
        loaded: false
      });
      gif.onload = () => {
        let obj = this.animations.get(i);
        obj.frameCnt = gif.frames.length;
        if(i === 3) 
          obj.frameRate = 3;
        obj.loaded = true;
      }
    }
  }
}

export { Orochi }