import { gameMap } from './Controllers/game_map';
import { Kyo } from './Players/kyo';
import { Orochi } from './Players/orochi'

class KOF {
  constructor(id) {
    this.kofDOM = document.querySelector(`#${id}`);
    this.gameMap = new gameMap(this);
    this.players = [
      new Kyo(this, 0),
      new Kyo(this, 1),
    ]
  }
}

export {KOF}