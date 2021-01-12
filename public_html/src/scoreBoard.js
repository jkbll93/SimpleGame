export default class ScoreBoard{
    
    constructor(playerOne, playerTwo){
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.points = playerOne + ":" + playerTwo;
    }
    
    draw(sCtx){
        sCtx.font = "40px Arial";
        sCtx.fillText(this.points, 20, 65);
    }
    
    update(playerOne, playerTwo){
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;      
        this.points = this.playerOne + ":" + this.playerTwo;
    }
}