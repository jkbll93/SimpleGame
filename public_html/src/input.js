export default class InputHandler {

    constructor(balls, game){
        document.addEventListener('keydown', event => {
            switch (event.keyCode){
                case 37:
                    balls[1].moveLeft();
                    break;
                case 38:
                    balls[1].moveUp();
                    break;
                case 39:
                    balls[1].moveRight();
                    break;
                case 40:
                    balls[1].moveDown();
                    break;                    
                case 32:
                    game.spacebarUse();
                    break;
                case 65:
                    balls[0].moveLeft();
                    break;
                case 68:
                    balls[0].moveRight();
                    break;
                case 83:
                    balls[0].moveDown();
                    break;
                case 87:
                    balls[0].moveUp();
                    break;                    
            }
        });
    
        document.addEventListener('keyup', event => {
            switch (event.keyCode){
                case 37:
                case 38:
                case 39:
                case 40:
                    balls[1].stop();
                    break;                
                case 65:
                case 68:
                case 83:
                case 87:
                    balls[0].stop();
                    break;
            }
        });
    }
}