import { gameMap } from './Controllers/game_map';
import { gamePlayer } from './Controllers/game_player';

class KOF {
  constructor(id) {
    this.kofDOM = document.querySelector(`#${id}`);
    this.gameMap = new gameMap(this);
    let players = [
      new gamePlayer(this, {
        id: 0,
        x: 250,
        y: -100,
        width: 120,
        height: 170,
        color: 'red'
      }),
      new gamePlayer(this, {
        id: 1,
        x: 750,
        y: -100,
        width: 120,
        height: 170,
        color: 'blue'
      })
    ]
  }
}

export {KOF}