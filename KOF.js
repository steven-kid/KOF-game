import { gameMap } from './Controllers/game_map';
import { Kyo } from './Players/kyo';
import { Orochi } from './Players/orochi'

class KOF {
  constructor(id) {
    this.kofDOM = document.querySelector(`#${id}`);
    this.gameMap = new gameMap(this);
    this.players = [
      new Orochi(this, 0),
      new Kyo(this, 1)
    ]
  }
  reset(){
    this.players[0].hp = 100;
    this.players[1].hp = 100;
    this.players[0].status = 1;
    this.players[1].status = 1;
    const hp0line = document.querySelector('#hp0-line');
    const hp1line = document.querySelector('#hp1-line');
    hp0line.style.width = '100%';
    hp1line.style.width = '100%';
    hp0line.style.backgroundColor = '#ee9619';
    hp1line.style.backgroundColor = '#ee9619';
  }
}

export {KOF}