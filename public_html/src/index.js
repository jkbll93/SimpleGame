import Game from './game.js';
let gameCanvas = document.getElementById("gameScreen");
let scoreCanvas = document.getElementById("scoreBoard");

let gCtx = gameCanvas.getContext("2d");
let sCtx = scoreCanvas.getContext("2d");

const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

function gameLoop(){
    gCtx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    sCtx.clearRect(0, 0, 100, 100);
    
    game.update();
    game.draw(gCtx, sCtx);
        
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);