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
    speed: 8,
    traffic: 3
};

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement;
}

function startGame() {
    start.classList.add('hide');
    gameArea.innerHTML = '';

    score.style.top = '';

    for (let i = 0; i < getQuantityElements(100)+0.2; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;

        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
        const enemy = document.createElement('div');
        let enemyImg = Math.floor(Math.random()*2)+1;
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.background = `transparent url(./image/enemy${enemyImg}.png) center / cover no-repeat`;
        gameArea.appendChild(enemy)
    }

    settings.score = 0;
    settings.start = true;
    gameArea.appendChild(car);
    car.classList.add('car');

    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2 + 'px';
    car.style.top = 'auto';
    car.style.bottom = 10 + 'px';

    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    settings.score += settings.speed;
    score.textContent = 'Score: ' + settings.score;
    moveRoad();
    moveEnemy();
    if (settings.start) {
        if (keys.ArrowLeft && settings.x > 0) {
            settings.x -= settings.speed;
        }
        if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
            settings.x += settings.speed;
        }
        if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
            settings.y += settings.speed;
        }
        if (keys.ArrowUp && settings.y > 0) {
            settings.y -= settings.speed;
        }
        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';

        requestAnimationFrame(playGame);
    }
}

function startRun(e) {
    e.preventDefault();
    if(keys.hasOwnProperty(event.key)){
        keys[event.key] = true;
    }
}

function stopRun(e) {
    e.preventDefault();
    if(keys.hasOwnProperty(event.key)){
        keys[event.key] = false;
    }
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += settings.speed;
        line.style.top = line.y + 'px';
        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    })
}

function moveEnemy() {
    let enemys = document.querySelectorAll('.enemy');
    enemys.forEach(function (enemy) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();

        if(carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top
        ){
            settings.start = false;
            start.classList.remove('hide');
            score.style.top = start.offsetHeight + 'px';
        }

        enemy.y += settings.speed / 2;
        enemy.style.top = enemy.y + 'px';

        if (enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -100 * settings.traffic;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });


}
