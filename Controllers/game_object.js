let game_object = [];

class gameObject{
  constructor(){
    game_object.push(this);
    this.timeDelta = 0;
    this.has_call_start = false;
  }
  // init
  start(){

  }
  // each time refresh
  updata(){

  }
  // delect object
  destroy(){
    for (let i in game_object){
      if(game_object[i] === this){
        game_object.splice(i, 1);
        break;
      }
    }
  }
}

let lastTimeStamp;
let frame = (timeStamp) => {
  for (let obj of game_object){
    if(!obj.has_call_start){
      obj.start();
      obj.has_call_start = true;
    } else {
      obj.timeDelta  = timeStamp - lastTimeStamp;
      obj.update();
    }
  }
  lastTimeStamp = timeStamp;
  requestAnimationFrame(frame);
}

// start recursion
requestAnimationFrame(frame);

export { gameObject };  