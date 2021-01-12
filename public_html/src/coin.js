import { detectColision } from './colisionDetection.js';

export default class Coin{

    constructor(game) {
        
        this.image = document.getElementById("img_coin");
        
        this.game = game;
        
        this.position = {};
        
        this.width = 20;
        this.height = 20;
        
        this.markedForDeletion = false;
        
        this.generateCoin();
    }
    
    generateCoin(){
        this.generatedX = Math.floor(Math.random() * 19);
        this.generatedY = Math.floor(Math.random() * 19);
        if(this.getValueFromLevelTable() === 0){
            this.position.x = 20 * this.generatedX;
            this.position.y = 20 * this.generatedY;
        } else {
            this.generateCoin();
        }
    }
    
    getValueFromLevelTable(){
        let array = this.game.levels[this.game.currentLevel];
        return array[this.generatedY][this.generatedX].valueOf();
    }
    
    update(){
        if(detectColision(this.game.balls[0], this)){
            this.markedForDeletion = true;
            this.generateCoin();
            this.game.playerOne.pointScored();
        }
        if(detectColision(this.game.balls[1], this)){
            this.markedForDeletion = true;
            this.generateCoin();
            this.game.playerTwo.pointScored();
        }
    }
    
    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}