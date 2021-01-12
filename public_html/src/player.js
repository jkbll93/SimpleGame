import Ball from './ball.js';

export default class Player{
        
    constructor(playerId, gameWidth, gameHeight){
        this.playerId = playerId;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.points = 0;
        this.ball;
    }
    
    pointScored(){
        this.points++;
    }
}