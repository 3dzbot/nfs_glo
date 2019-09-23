const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div');


start.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const settings = {
    start: false,
    score: 0,
    speed: 3
}

function startGame(){
    start.classList.add('hide');
    settings.start = true;
    gameArea.appendChild(car);
    car.classList.add('car');
    requestAnimationFrame(playGame);

}

function playGame(){
    console.log('play game');
    if (settings.start){
        requestAnimationFrame(playGame);
    }
}

function startRun(e){
    e.preventDefault();
    keys[event.key] = true;
    console.log(e.key);
}

function stopRun(e){
    e.preventDefault();
    keys[event.key] = false;
}

