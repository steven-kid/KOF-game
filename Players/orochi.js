import { gamePlayer } from "../Controllers/game_player";
import { GIF } from "../utils/gif"

class Orochi extends gamePlayer{
  constructor(root, info){
    super(root, info);
    this.init();
  }
  init(){
    let offsetY = [0, 0, 0, -200, -35, 0, 0]
    let offsetX = [0, 0, 0, -30, -60, 0, 0]
    for (let i = 0; i < 7; i++){
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
        obj.loaded = true;
      }
    }
  }
}

export { Orochi }