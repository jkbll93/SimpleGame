import { detectColision } from './colisionDetection.js';
export default class Ball {

    constructor(id, gameWidth, gameHeight, level) {
        
        this.id = id;
        
        this.image = this.setImage(id);
        
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.size = 20;        
        
        this.level = level;

        this.maxSpeed = 5;

        this.reset(level);
    }
    
    setImage(id){
       if (id == 1){ return document.getElementById("img_first_player"); }
       if (id == 2){ return document.getElementById("img_second_player"); }
    }
    
    reset(level){
        this.level = level;

        this.position = this.getPositionInBegin();
        this.stop();
    }

    getPositionInBegin(){
        let firstPlayerPosition;
        let secondPlayerPosition;
        this.level.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {        
                if (cell === 'p'){
                    firstPlayerPosition = { x: 20 * cellIndex, y: 20 * rowIndex};
                }
                if (cell === 'd'){
                    secondPlayerPosition = { x: 20 * cellIndex, y: 20 * rowIndex};
                }
            });
        });
        
        if (this.id == 1) return firstPlayerPosition;
        if (this.id == 2) return secondPlayerPosition;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
    
    moveUp(){
        this.verticalSpeed = -this.maxSpeed;
    }
    
    moveDown(){
        this.verticalSpeed = this.maxSpeed;
    }
    
    moveRight(){
        this.horizonalSpeed = this.maxSpeed;    
    }
    
    moveLeft(){
        this.horizonalSpeed = -this.maxSpeed;
    }
    
    stop(){
        this.verticalSpeed = 0;
        this.horizonalSpeed = 0;
    }    

    update(){
        
        let bottomWall = this.position.y + this.size;
        let bottomWallInGrid = Math.floor(bottomWall / 20);

        let topWallAfterMoveUp = Math.floor(this.position.y - this.maxSpeed);
        let topWallAfterMoveUpInGrid = Math.floor(topWallAfterMoveUp / 20);
        let topWallInGrid = Math.floor(this.position.y / 20);
            
        let leftWallInGrid = Math.floor(this.position.x / 20);
        let leftWallAfterMoveLeft = Math.floor(this.position.x - this.maxSpeed);
        let leftWallAfterMoveLeftInGrid = Math.floor(leftWallAfterMoveLeft / 20);
        
        let rightWall = this.position.x + this.size;
        let rightWallInGrid = Math.floor(rightWall / 20);
        
        
        if(Math.sign(this.verticalSpeed) === -1){
            if((!this.checkOneCellRange(topWallAfterMoveUpInGrid)) ||
                    this.checkColisionWithBrick(leftWallInGrid, topWallAfterMoveUpInGrid, rightWall, rightWallInGrid, topWallAfterMoveUpInGrid)){
                this.verticalSpeed = 0;
            } else {
                this.position.y += this.verticalSpeed;
            }
        }
        
        if(Math.sign(this.verticalSpeed) === 1){
            if((!this.checkOneCellRange(bottomWallInGrid)) || 
                    this.checkColisionWithBrick(leftWallInGrid, bottomWallInGrid, rightWall, rightWallInGrid, bottomWallInGrid)){
                this.verticalSpeed = 0;
            } else {
                this.position.y += this.verticalSpeed;
            }        
        }
        
        if(Math.sign(this.horizonalSpeed) === -1){
            if((!this.checkOneCellRange(leftWallAfterMoveLeftInGrid)) || 
                    this.checkColisionWithBrick(leftWallAfterMoveLeftInGrid, topWallInGrid, bottomWall, leftWallAfterMoveLeftInGrid, bottomWallInGrid)){
                this.horizonalSpeed = 0;
            } else {
                this.position.x += this.horizonalSpeed;
            }
        }
        
        if(Math.sign(this.horizonalSpeed) === 1){
            if((!this.checkOneCellRange(rightWallInGrid)) || 
                    this.checkColisionWithBrick(rightWallInGrid, topWallInGrid, bottomWall, rightWallInGrid, bottomWallInGrid)){
                this.horizonalSpeed = 0;
            } else {
                this.position.x += this.horizonalSpeed;
            }
        }
    }

    checkOneCellRange(cell){
        if(cell < 0) {
                return false;
        }
        else if(cell > 19) {
                return false;
        }
        else return true;
    }
    
    checkColisionWithBrick(xCell, yCell, wall, nextXCell, nextYCell){      
        if((this.level[yCell][xCell] === 1) 
                || (((wall) % 20 !== 0) 
                && (this.level[nextYCell][nextXCell] === 1))
            ){
            return true;
        } else {
            return false;
        }
    }
}