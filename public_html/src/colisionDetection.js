export function detectColision(ball, gameObject){

    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y; 
    
    let topOfGameObject = gameObject.position.y;
    let leftSideOfGameObject = gameObject.position.x;
    let rightSideOfGameObject = gameObject.position.x + gameObject.width;
    let bottomOfGameObject = gameObject.position.y + gameObject.height;

    if(bottomOfBall >= topOfGameObject
        && topOfBall <= bottomOfGameObject
        && ball.position.x >= leftSideOfGameObject
        && ball.position.x + ball.size <= rightSideOfGameObject
    ){
        return true;
    } else {
        return false;
    }    
}