export default class Brick{

    constructor(game, position) {
        
        this.image = document.getElementById("img_brick");
        
        this.game = game;
        
        this.position = position;
        
        this.width = 20;
        this.height = 20;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
        
}