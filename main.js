import './style.css'
import {KOF} from './KOF'

let kof = new KOF('kof');

const canvasDom = document.querySelector('canvas');
const msg = document.querySelector('#msg')
const mask = document.querySelector('#mask')

canvasDom.focus();
canvasDom.style.outline = 'none';

msg.textContent = "Press \"Space\" to enter"

canvasDom.onkeypress = (e) => {
  if(e.key === ' '){
    msg.style.display = 'none';
    mask.style.display = 'none';
  }
}