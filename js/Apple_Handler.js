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

    if (!checkIfEaten()) {
        let possibleMoves = appleValidMoves();
        let chosenMoveNumber = Math.floor(Math.random() * possibleMoves.length);
        let chosenMove;

        chosenMove = possibleMoves[chosenMoveNumber];
        if (possibleMoves.length === 1) {
            // checking if its the last move or undefined
            if (chosenMove === undefined || (chosenMove.x === apple.j_last && chosenMove.y === apple.i_last)) {
                chosenMove = {};
                chosenMove.x = apple.j;
                chosenMove.y = apple.i;
            }
        } else
        // checking if its the last move
            while (chosenMove.x === apple.j_last && chosenMove.y === apple.i_last) {
                chosenMoveNumber = Math.floor(Math.random() * possibleMoves.length);
                chosenMove = possibleMoves[chosenMoveNumber];
            }

        board_objects[apple.i][apple.j] = 0;


        apple.i_last = apple.i;
        apple.j_last = apple.j;
        apple.i = chosenMove.y;
        apple.j = chosenMove.x;

        board_objects[apple.i][apple.j] = apple.id;
    }
}

/**
 * function to get the valid moves of the apple
 * @returns {Array} - array of {x: x, y: y}
 */
function appleValidMoves(){
    let moves = [];
    let x = apple.j;
    let y = apple.i;
    if (x-1 >= 0 && appleClearPoint(x-1, y))
        moves.push({x: x-1, y: y});
    if (y-1 >= 0 && appleClearPoint(x, y-1))
        moves.push({x: x, y: y-1});
    if (x+1 <= 16 && appleClearPoint(x+1, y))
        moves.push({x: x + 1, y: y});
    if (y+1 <= 19 && appleClearPoint(x, y+1))
        moves.push({x: x, y: y+1});
    return moves;
}

/**
 * function to check if a given coordinate is valid to be moved to
 * @param x - the x coordinate
 * @param y - the y coordinate
 * @returns {boolean}
 */
function appleClearPoint(x, y) {
    return board_objects[y][x] !== 1
        && board_objects[y][x] !== 3
        && board_objects[y][x] !== 2;
}

/**
 * draws the apple on the canvas
 */
function drawApple() {
    if (!checkIfEaten()) {
        let ctx = CANVAS_CTX;
        let apple_image = document.getElementById('APPLE_' + apple.apple_image);
        ctx.drawImage(apple_image, 1.2 * LINE_SPAN_WIDTH + apple.j * LINE_SPAN_WIDTH, 1.1 * LINE_SPAN_HEIGHT + apple.i * LINE_SPAN_HEIGHT, 29, 29);
    }
}

/**
 * checks if the pacman got to the apple
 */
function checkIfEaten() {
    if (apple.eaten)
        return true;
    else {
        if (apple.i === pacman.i && apple.j === pacman.j) {
            board_objects[apple.i][apple.j] = 0;
            score += 50;
            apple.eaten = true;
            playSound(eat_apple_sound);
            return true;
        }
        return false;
    }
}