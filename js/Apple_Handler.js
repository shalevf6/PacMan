/**
 * initializes the apple object
 */
function initApple() {
    apple = {};
    apple.id = 50;
    apple.baseName = 'APPLE_';
    apple.apple_image = 1;
    apple.direction = 'UP';
    apple.eaten = false;
    if (!apple.eaten){
        board_objects[19][16] = 50;
        apple.i = 19;
        apple.j = 16;
        apple.i_last = -1;
        apple.j_last = -1;
    }
}

/**
 * function to update position of the apple
 */
function updatePositionApple(){
    let possibleMoves = appleValidMoves();
    let chosenMoveNumber = Math.floor(Math.random() * possibleMoves.length);
    let chosenMove;

    if (possibleMoves.length !== 0)
        chosenMove = possibleMoves[chosenMoveNumber];

    if (chosenMove === undefined){
        chosenMove = {};
        chosenMove.x = apple.j;
        chosenMove.y = apple.i;
    }

    board_objects[apple.i][apple.j] = 0;

    apple.i_last = apple.i;
    apple.j_last = apple.j;
    apple.i = chosenMove.y;
    apple.j = chosenMove.x;

    // not really necessary
    draw();

    board_objects[apple.i][apple.j] = apple.id;
}

/**
 * function to get the valid moves of the apple
 * @returns {Array} - array of {x: x, y: y}
 */
function appleValidMoves(){
    let moves = [];
    let x = apple.j;
    let y = apple.i;
    if (x-1 >= 0 && clearPoint(x-1, y))
        moves.push({x: x-1, y: y});
    if (y-1 >= 0 && clearPoint(x, y-1))
        moves.push({x: x, y: y-1});
    if (x+1 <= 16 && clearPoint(x+1, y))
        moves.push({x: x + 1, y: y});
    if (y+1 <= 19 && clearPoint(x, y+1))
        moves.push({x: x, y: y+1});
    return moves;
}

/**
 * draws the apple on the canvas
 */
function drawApple() {
    let ctx = CANVAS_CTX;
    let apple_image = document.getElementById('APPLE_' + apple.apple_image);
    ctx.drawImage(apple_image, 1.2 * LINE_SPAN_WIDTH + apple.j * LINE_SPAN_WIDTH, 1.1 * LINE_SPAN_HEIGHT + apple.i * LINE_SPAN_HEIGHT, 29, 29);
}