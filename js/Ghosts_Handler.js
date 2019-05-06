/**
 * initializes the ghosts objects
 */
function initGhosts(){
    ALL_GHOSTS = [];
    ghost1 = {};
    board_objects[0][0] = 6;
    ghost1.id = 6;
    ghost1.i = 0;
    ghost1.j = 0;
    ghost1.i_last = -1;
    ghost1.j_last = -1;
    ghost1.baseName = 'GHOST1_';
    ghost1.direction = 'UP';
    ALL_GHOSTS.push(ghost1);

    if (enemy_amount > 1){
        ghost2 = {};
        board_objects[0][16] = 7;
        ghost2.id = 7;
        ghost2.i = 0;
        ghost2.j = 16;
        ghost2.i_last = -1;
        ghost2.j_last = -1;
        ghost2.baseName = 'GHOST2_';
        ghost2.direction = 'UP';

        ALL_GHOSTS.push(ghost2);
    }

    if (enemy_amount > 2){
        ghost3 = {};
        board_objects[19][0] = 8;
        ghost3.id = 8;
        ghost3.i = 19;
        ghost3.j = 0;
        ghost3.i_last = -1;
        ghost3.j_last = -1;
        ghost3.baseName = 'GHOST3_';
        ghost3.direction = 'UP';
        ALL_GHOSTS.push(ghost3);
    }
}


/**
 * draws a given ghost object on the canvas
 * @param ghost - a given ghost object
 */
function drawGhost(ghost) {
    let ctx = CANVAS_CTX;
    let ghost_image = document.getElementById(getDirectionImage(ghost));
    ctx.drawImage(ghost_image, 1.15 * LINE_SPAN_WIDTH + ghost.j * LINE_SPAN_WIDTH, 1.15 * LINE_SPAN_HEIGHT + ghost.i * LINE_SPAN_HEIGHT, 32, 32);
}


/**
 * function to get the valid moves of a given ghost
 * @param ghost - the given ghost
 * @returns {Array} - array of {x: x, y: y}
 */
function validMoves(ghost){
    let moves = [];
    let x = ghost.j;
    let y = ghost.i;
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
 * function to check if a given coordinate is valid to be moved to
 * @param x - the x coordinate
 * @param y - the y coordinate
 * @returns {boolean}
 */
function clearPoint(x, y) {
    return board_objects[y][x] !== 1
        && board_objects[y][x] !== 3
        && board_objects[y][x] !== 2;
}

/**
 * method to find the manhattan distance
 * @param x1 - source
 * @param y1 - source
 * @param x2 - target
 * @param y2 - target
 * @returns {number}
 */
function manhattanDistance(x1, y1, x2, y2){
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}


/**
 * function to update position of all ghosts
 */
function updatePositionGhosts(){
    ALL_GHOSTS.forEach(function (element) {
        if (element === undefined)
            return;

        let possibleMoves = validMoves(element);
        let chosenMove;
        let curMin = Number.MAX_SAFE_INTEGER;
        possibleMoves.forEach(function (move) {
            if (move.x === element.j_last
                && move.y === element.i_last)
                return;
            const tmp_dist = manhattanDistance(pacman.j, pacman.i, move.x, move.y);
            if (tmp_dist<curMin){
                chosenMove = move;
                curMin = tmp_dist;
            }
            else if (tmp_dist === curMin){
                if (Math.random()> 0.5)
                    chosenMove = move;
            }
        });

        if (chosenMove === undefined){
            chosenMove = {};
            chosenMove.x = element.j;
            chosenMove.y = element.i;
        }

        // to determine which ghost image should be draw
        if (element.i < chosenMove.y)
            element.direction = 'DOWN';
        if (element.i > chosenMove.y)
            element.direction = 'UP';
        if (element.j < chosenMove.x)
            element.direction = 'RIGHT';
        if (element.j > chosenMove.x)
            element.direction = 'LEFT';

        board_objects[element.i][element.j] = 0;

        element.i_last = element.i;
        element.j_last = element.j;
        element.i = chosenMove.y;
        element.j = chosenMove.x;

        board_objects[element.i][element.j] = element.id;
    });
}