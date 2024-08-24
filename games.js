const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

let playerSpeed = 10;
let score = 0;
let lives = 3;
let gameInterval;
let objectInterval;

function startGame() {
    document.addEventListener('keydown', movePlayer);
    gameInterval = setInterval(updateGame, 20);
    objectInterval = setInterval(createObject, 1000);
}

function movePlayer(event) {
    const playerRect = player.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();
    
    if (event.key === 'ArrowLeft' && playerRect.left > containerRect.left) {
        player.style.left = player.offsetLeft - playerSpeed + 'px';
    }
    if (event.key === 'ArrowRight' && playerRect.right < containerRect.right) {
        player.style.left = player.offsetLeft + playerSpeed + 'px';
    }
}

function createObject() {
    const object = document.createElement('div');
    object.classList.add('object');
    object.style.left = Math.random() * (gameContainer.clientWidth - 30) + 'px';
    object.style.top = '0px';
    gameContainer.appendChild(object);
}

function updateGame() {
    const objects = document.getElementsByClassName('object');
    
    for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        object.style.top = object.offsetTop + 5 + 'px';
        
        if (isCollision(player, object)) {
            score++;
            scoreDisplay.textContent = score;
            object.remove();
        } else if (object.offsetTop > gameContainer.clientHeight) {
            object.remove();
            lives--;
            livesDisplay.textContent = lives;
            
            if (lives === 0) {
                endGame();
            }
        }
    }
}

function isCollision(player, object) {
    const playerRect = player.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();
    
    return !(
        playerRect.top > objectRect.bottom ||
        playerRect.bottom < objectRect.top ||
        playerRect.left > objectRect.right ||
        playerRect.right < objectRect.left
    );
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(objectInterval);
    alert('¡Juego Terminado! Tu puntaje es: ' + score);
    window.location.reload();
}

window.onload = startGame;
