import './style.css'
import { KOF } from './KOF'
import { gsap } from 'gsap'

let kof = new KOF('kof');

const canvasDom = document.querySelector('canvas');
const msg = document.querySelector('#msg')
const mask = document.querySelector('#mask')
const countDown = document.querySelector('#count-down');
const endDom = document.querySelector('#end');
const winner = document.querySelector('#winner');
const extraTime = document.querySelector('#extra-time');
const name0 = document.querySelector('#name-0');
const name1 = document.querySelector('#name-1');
extraTime.style.display = 'none';
endDom.style.display = 'none'

document.querySelector('body').style.backgroundImage = 'url(./public/images/background/monitor.jpg)';

canvasDom.focus();
canvasDom.style.outline = 'none';

msg.textContent = "Press \"Space\" to enter"

let timer;

canvasDom.onkeypress = (e) => {
  if(e.key === ' '){
    msg.style.display = 'none';
    mask.style.opacity = '0';
    timer = setInterval(function()  {
      countDown.textContent = Math.max(parseInt(countDown.textContent) - 1, 0);
      endGameCheck();
    }, 1000);    
  }
}

const endGameCheck = () => {
  if(kof.players[0].hp === 0 || kof.players[1].hp === 0 || 
    (countDown.textContent === '0' && kof.players[0].hp !== kof.players[1].hp)){
    clearInterval(timer);
    if(kof.players[1].hp === 0 || kof.players[0].hp > kof.players[1].hp){
      winner.textContent = name0.textContent;
    } else {
      winner.textContent = name1.textContent;
    }
    setTimeout(() => {
      endDom.style.display = "flex";
      gsap.fromTo('#end',  {y: '-400px'}, {duration: 1.2, ease: 'bounce', y: '0'})
    }, 3000);
  }
  if(countDown.textContent === '0' && kof.players[0].hp === kof.players[1].hp){
    extraTime.style.display = 'flex';
    setTimeout(() => {
      extraTime.style.display = 'none';
    }, 1000);
    countDown.textContent = 20;
  }
}

document.querySelector('#restart').addEventListener('click', () => {
  location.reload();
})

document.querySelector('#rematch').addEventListener('click', () => {
  endDom.style.display = 'none'
  kof.reset();
  countDown.textContent = 60;
  timer = setInterval(function()  {
    countDown.textContent = Math.max(parseInt(countDown.textContent) - 1, 0);
    endGameCheck();
  }, 1000);   
  canvasDom.focus();
})

