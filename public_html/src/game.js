import InputHandler from './input.js';
import Ball from './ball.js';
import Coin from './coin.js';
import Player from './player.js';
import ScoreBoard from './scoreBoard.js';

import {buildLevel, level0, level1, level2 } from './levels.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNIG: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEXTLEVEL: 4
};

export default class Game {

    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gamestate = GAMESTATE.MENU;
        
        this.gameObjects = [];
        
        this.bricks = [];

        this.levels = [ level0, level1, level2 ];
        this.currentLevel = 0;
        this.pointsToNextLevel = 3;
        this.pointsToEndGame = this.levels.length * this.pointsToNextLevel;
        this.winner = "";
        
        this.playerOne = new Player(1, gameWidth, gameHeight);
        this.playerTwo = new Player(2, gameWidth, gameHeight);
        
        this.playerOne.ball = new Ball(1, this.gameWidth, this.gameHeight, 
            this.levels[this.currentLevel]);
        
        this.playerTwo.ball = new Ball(2, this.gameWidth, this.gameHeight, 
            this.levels[this.currentLevel]);        

        this.balls = [ this.playerOne.ball, this.playerTwo.ball ];            
        new InputHandler(this.balls, this);
    }
    
    start(){
        if (this.gamestate !== GAMESTATE.MENU 
                && this.gamestate !== GAMESTATE.NEXTLEVEL
            )
        return;
    
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);

        this.scoreBoard = new ScoreBoard(this.playerOne.points, this.playerTwo.points);
        
        this.balls.forEach((object) => object.reset(this.levels[this.currentLevel]));

        this.coin = new Coin(this);

        this.gameObjects = [...this.balls, this.coin];

        this.gamestate = GAMESTATE.RUNNIG;
    }
    
    update(){

        if (this.checkIfSwichLevel()) {
            this.nextLevel();
        }
        
        if (this.checkIfSomeoneEndGame()){
            this.gamestate = GAMESTATE.GAMEOVER;
        }
        
        if (this.gamestate === GAMESTATE.PAUSED 
                || this.gamestate === GAMESTATE.MENU
                || this.gamestate === GAMESTATE.GAMEOVER) 
            return;

        [...this.gameObjects].forEach((object) => object.update() );
        
        this.scoreBoard.update(this.playerOne.points, this.playerTwo.points);
    }
    
    nextLevel(){
        this.currentLevel = ++this.currentLevel % 3;
        this.gamestate = GAMESTATE.NEXTLEVEL;
        this.start();
    }
    
    draw(ctx, sCtx){
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx) );
        
        if(this.gamestate === GAMESTATE.PAUSED){
            this.gamestatePausedAction(ctx);
            return;
        }
        
        if(this.gamestate === GAMESTATE.MENU){
            this.gamestateMenuAction(ctx);
        }
        
        if(this.gamestate === GAMESTATE.GAMEOVER){
            this.gamestateGameOverAction(ctx);
        }
        
        if(this.gamestate === GAMESTATE.RUNNIG){
            this.coin.draw(ctx);
            this.scoreBoard.draw(sCtx);
        }
    }
    
    gamestatePausedAction(ctx){
        this.setTextAttributes(ctx);
        this.fillText(ctx, "PAUSED", this.gameWidth / 2, this.gameHeight /2);
    }
    
    gamestateMenuAction(ctx){
        this.setTextAttributes(ctx);
        this.fillText(ctx, "Press spacebar to start", this.gameWidth / 2, this.gameHeight /2 );
    }
    
    gamestateGameOverAction(ctx){
        this.setTextAttributes(ctx);

        let text = "GAMEOVER\nPlayer " + this.winner + " win!";
        let lines = text.split('\n');
        let lineHeigth = 45;
        for (let i = 0; i < lines.length; i++){
            this.fillText(ctx, lines[i], this.gameWidth / 2, this.gameHeight /3 + (i * lineHeigth));
        }
    }
    
    setTextAttributes(ctx){
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        this.fillStyle(ctx);
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
    }
    
    fillStyle(ctx){
        switch (this.gamestate){
            case GAMESTATE.PAUSED:
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                break;
            case GAMESTATE.MENU:
                ctx.fillStyle = "rgba(0,0,0,1)";
                break;            
            case GAMESTATE.GAMEOVER:
                ctx.fillStyle = "rgba(0,0,0,1)";
                break;                
        }
    }
    
    fillText(ctx, text, beginX, beginY){
        ctx.fillText(text, beginX, beginY);
    }
    
    spacebarUse(){
        if (this.gamestate == GAMESTATE.MENU){
            this.start();
        } else if (this.gamestate == GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNIG;
        } else if (this.gamestate == GAMESTATE.GAMEOVER){
            this.gamestate = GAMESTATE.MENU;
        } else{
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

    checkPointsOfPlayerOne(){
        return this.playerOne.points == (1 + this.currentLevel) * this.pointsToNextLevel;
    }

    checkPointsOfPlayerTwo(){
        return this.playerTwo.points == (1 + this.currentLevel) * this.pointsToNextLevel;
    }
    
    checkIfSwichLevel(){
        return (this.checkPointsOfPlayerOne() || this.checkPointsOfPlayerTwo()) && !this.checkIfSomeoneEndGame();
    }
    
    checkIfSomeoneEndGame(){
        if (this.playerOne.points == this.pointsToEndGame){
            this.winner = "One";
            return true;
        }
        if (this.playerTwo.points == this.pointsToEndGame){
            this.winner = "Two";
            return true;
        }
        return false;
    }
}