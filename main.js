import './style.css'
import {KOF} from './KOF'

let kof = new KOF('kof');

const canvasDom = document.querySelector('canvas');
const msg = document.querySelector('#msg')
const mask = document.querySelector('#mask')
const countDown = document.querySelector('#count-down');
const endDom = document.querySelector('#end');
console.log(endDom);
endDom.style.display = 'none';
canvasDom.focus();
canvasDom.style.outline = 'none';

msg.textContent = "Press \"Space\" to enter"

canvasDom.onkeypress = (e) => {
  if(e.key === ' '){
    msg.style.display = 'none';
    mask.style.display = 'none';
  }
}

const endGameCheck = () => {
  if(kof.players[0].hp === 0 || kof.players[1].hp === 0 || 
    (countDown.textContent === '0' && kof.players[0].hp !== kof.players[1].hp)){
    clearInterval(timer);
    endDom.style.display = 'flex';

  }
}

document.querySelector('button').addEventListener('click', () => {
  location.reload();
})

const timer = setInterval(function()  {
  countDown.textContent = Math.max(parseInt(countDown.textContent) - 1, 0);
  endGameCheck();
}, 1000);


