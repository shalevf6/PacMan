/**
 * initializes the pacman object
 */
function initPacman() {
    pacman = {};
    pacman.baseName = 'PACMAN';
    pacman.pacman_image = 2;

    addEventListener('keydown', function(e){
        if (keySettings.includes(e.key))
            pacman.direction = e.key;
    });
    let emptyCell = findRandomSpot(board_objects);
    while (isCornerCell(emptyCell))
        emptyCell = findRandomSpot(board_objects);
    board_objects[emptyCell.i][emptyCell.j] = 3;
    pacman.i = emptyCell.i;
    pacman.j = emptyCell.j;
}


function updatePositionPacman(){
    let direction = pacman.direction;
    let x = pacman.j;
    let y = pacman.i;
    if (typeof direction !== 'undefined'){
        board_objects[pacman.i][pacman.j] = 0;
        if (y>0 && direction === up_key && board_static[--y][x] !== 1){
            pacman.i--;
        }
        else if (y<19 && direction===down_key && board_static[++y][x]!==1 && board_static[y][x]!==2){
            pacman.i++;
        }
        else if (x>0 && direction===left_key && board_static[y][--x]!==1){
            pacman.j--;
        }
        else if (x<16 && direction===right_key && board_static[y][++x]!==1){
            pacman.j++;
        }
    }

    board_objects[pacman.i][pacman.j] = 3;

    updateScore();
    draw()
}

/**
 * checks whether a given cell is in the corner of the board
 * @param cell - a given cell
 */
function isCornerCell(cell) {
    return (cell[0] === 0 && cell[1] === 0) || (cell[0] === 0 && cell[1] === 16) || (cell[0] === 19 && cell[1] === 0) || (cell[0] === 19 && cell[1] === 19);
}


/**
 * draws the pacman on the canvas
 */
function drawPacman() {
    let ctx = CANVAS_CTX;
    let i = getDirectionImage(pacman);
    let pacman_image = document.getElementById(i);
    ctx.drawImage(pacman_image, 1.12 * LINE_SPAN_WIDTH + pacman.j * LINE_SPAN_WIDTH, 1.1 * LINE_SPAN_HEIGHT + pacman.i * LINE_SPAN_HEIGHT, 32, 32);
}