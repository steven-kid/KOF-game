import { gameMap } from './Controllers/game_map';
import { Kyo } from './Players/kyo';
import { Orochi } from './Players/orochi'

class KOF {
  constructor(id) {
    this.kofDOM = document.querySelector(`#${id}`);
    this.gameMap = new gameMap(this);
    this.players = [
      new Kyo(this, {
        id: 0,
        x: 250,
        y: -100,
        width: 120,
        height: 170
      }),
      new Orochi(this, {
        id: 1,
        x: 750,
        y: -100,
        width: 120,
        height: 170
      })
    ]
  }
}

export {KOF}