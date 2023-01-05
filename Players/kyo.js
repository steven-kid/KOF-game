import { gamePlayer } from "../Controllers/game_player";
import { GIF } from "../utils/gif"

class Kyo extends gamePlayer{
  constructor(root, id){
    super(root, {
      id: id,
      width: 120,
      height: 210,
      atk: 15,
      attack1: {x: 120, w: 105},
      attack2: {y: 42, h: 25},
      attackFrame: new Set([15]),
      deadFrame: 57,
      attackMove: 0
    });
    this.init();
  }
  init(){
    let offsetY = [0, -22, -22, -140, 0, 0, 20]
    let offsetX = [0, 0, 0, -50, 0, 0, -50]
    for (let i = 0; i < 7; i++){
      let gif = GIF();
      gif.load(`../images/player/kyo/${i}.gif`);
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
        if(i === 3){
          obj.frameRate = 4;
        }
        obj.frameCnt = gif.frames.length;
        obj.loaded = true;
      }
    }
  }
}

export { Kyo }