let CANVAS_CTX;

/**************     BOARD SIZE SETTINGS     ****************/
let BOARDER_WIDTH = 1000;
let BOARDER_HEIGHT = 800;
let LINE_SPAN_WIDTH = BOARDER_WIDTH/19;
let LINE_SPAN_HEIGHT = BOARDER_HEIGHT/22;
let BOARDER_WIDTH_DIFF = BOARDER_WIDTH-LINE_SPAN_WIDTH;
let BOARDER_HEIGHT_DIFF = BOARDER_HEIGHT-LINE_SPAN_HEIGHT;
let board_static = []; /* 0- open, 1- block, 2-up only, 3- pacman, 4- monster home , 5- 5 point, 15- 15 point, 25- 25 point */
let board_objects = [];
let LIVES = 3;
let SCORE = 0;


/**************     PACMAN SETTINGS     ****************/
let pacman = {};
let apple = {};
let ghost1 = {};
let ghost2 = null;
let ghost3 = null;


/**************     POINTS SETTINGS     ****************/
let ball_count=0;
if (!ball_5_color)
    ball_5_color  = 'yellow';
if (!ball_15_color)
    ball_15_color = 'white';
if (!ball_25_color)
    ball_25_color = 'red';
if (!ball_amount)
    ball_amount = 90;

/**
 * initializes a new game
 */
function initGame() {
    pacman = {};
    ghost1 = {};
    ghost2 = null;
    ghost3 = null;
    apple = {};
    LIVES = 3;
    SCORE = 0;
    initBoard();
    drawBoardDoor();
    init_balls();
    drawBalls();
    init_ghost();
    drawGhost();
    init_pacman();
    set_interval();
}

/**
 * disables the up, down and space keys to prevent unnecessary scrolling
 */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


function setPointBalls() {
    let five_point = Math.floor(ball_amount*0.6);
    let fifteen_point = Math.floor(ball_amount*0.3);
    let twentyFive_point = Math.floor(ball_amount*0.1);
    let free_spot;

    while (ball_count < ball_amount){
        if (five_point > 0){
            free_spot = findRandomSpot(board_static);
            board_static[free_spot.i][free_spot.j] = 5;
            five_point--;
            ball_count++;
        }
        if (fifteen_point > 0){
            free_spot = findRandomSpot(board_static);
            board_static[free_spot.i][free_spot.j] = 15;
            fifteen_point--;
            ball_count++;
        }
        if (twentyFive_point > 0){
            free_spot = findRandomSpot(board_static);
            board_static[free_spot.i][free_spot.j] = 25;
            twentyFive_point--;
            ball_count++;
        }
        if (five_point === 0 && ball_count<ball_amount){
            five_point++;
        }
    }

}

function drawPoints() {
    for (let i =0; i<board_static.length; i++){
        for (let j=0; j<board_static.length; j++){
            //changeColor(ctx, i);
            if (board_static[i][j] === 5){
                drawBall(i, j, ball_5_color);
            }
            else if (board_static[i][j] === 15){
                drawBall(i, j, ball_15_color);
            }
            else if (board_static[i][j] === 25){
                drawBall(i, j, ball_25_color);
            }
        }
    }
}

function drawBall(i, j, color) {
    let ctx = CANVAS_CTX;

    ctx.beginPath();
    ctx.arc(1.5*LINE_SPAN_WIDTH + j * LINE_SPAN_WIDTH, 1.5*LINE_SPAN_HEIGHT + i * LINE_SPAN_HEIGHT, 6, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

/**
 * function to init the entire board
 */
function initBoard() {
    let canvas = document.getElementById('canvas');
    canvas.setAttribute('width', BOARDER_WIDTH.toString());
    canvas.setAttribute('height', BOARDER_HEIGHT.toString());

    CANVAS_CTX = canvas.getContext('2d');

    resetLives();
    setLogicBoard();
    drawBoard();
    setPointBalls();
    drawPoints();

}

/**
 * function to set logic board - 20X17
 */
function setLogicBoard(){
    board_static[0] = [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0];
    board_static[1] = [0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0];
    board_static[2] = [0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0];
    board_static[3] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    board_static[4] = [0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0];
    board_static[5] = [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0];
    board_static[6] = [0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0];
    board_static[7] = [0,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,0];
    board_static[8] = [0,1,1,0,1,0,1,2,2,2,1,0,1,0,1,1,0];
    board_static[9] = [0,0,0,0,0,0,1,4,4,4,1,0,0,0,0,0,0];
    board_static[10] = [0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0];
    board_static[11] = [0,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,0];
    board_static[12] = [0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0];
    board_static[13] = [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0];
    board_static[14] = [0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0];
    board_static[15] = [0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0];
    board_static[16] = [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1];
    board_static[17] = [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0];
    board_static[18] = [0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0];
    board_static[19] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    board_objects[0] = [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0];
    board_objects[1] = [0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0];
    board_objects[2] = [0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0];
    board_objects[3] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    board_objects[4] = [0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0];
    board_objects[5] = [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0];
    board_objects[6] = [0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0];
    board_objects[7] = [0,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,0];
    board_objects[8] = [0,1,1,0,1,0,1,2,2,2,1,0,1,0,1,1,0];
    board_objects[9] = [0,0,0,0,0,0,1,4,4,4,1,0,0,0,0,0,0];
    board_objects[10] = [0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0];
    board_objects[11] = [0,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,0];
    board_objects[12] = [0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0];
    board_objects[13] = [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0];
    board_objects[14] = [0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0];
    board_objects[15] = [0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0];
    board_objects[16] = [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1];
    board_objects[17] = [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0];
    board_objects[18] = [0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0];
    board_objects[19] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    // console.log(board_static[1][2]);

}

/**
 * function to draw the game board
 */
function drawBoard() {
    let ctx = CANVAS_CTX;
    let next_x = 0;
    let next_y = 0;
    let start_x = 0;
    let start_y = 0;

    // Create gradient
    let grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
    grd.addColorStop(0, "blue");
    grd.addColorStop(1, "white");

    // Fill with gradient
    ctx.fillStyle = 'blue';

    // fill boarders
    // ctx.fillRect(0, 0, BOARDER_WIDTH, LINE_SPAN);
    // ctx.fillRect(BOARDER_WIDTH_DIFF,0, LINE_SPAN ,BOARDER_HEIGHT);
    // ctx.fillRect(0,0, LINE_SPAN, BOARDER_HEIGHT);
    // ctx.fillRect(0,BOARDER_HEIGHT_DIFF, BOARDER_WIDTH, LINE_SPAN);
    roundRect( 0,0,BOARDER_WIDTH, LINE_SPAN_HEIGHT, 7, true, false);
    roundRect( BOARDER_WIDTH_DIFF,0, LINE_SPAN_WIDTH,BOARDER_HEIGHT, 7, true, false);
    roundRect( 0,0, LINE_SPAN_WIDTH, BOARDER_HEIGHT, 7, true, false);
    roundRect( 0,BOARDER_HEIGHT_DIFF, BOARDER_WIDTH, LINE_SPAN_HEIGHT, 7, true, false);

    function changeColor(ctx, i) {
        let colors = ['yellow', 'red', 'green', 'purple', 'orange'];
        ctx.fillStyle = colors[i/4];
    }

    ctx.fillStyle = 'green';

    for (let i =0; i<board_static.length; i++){
        for (let j=0; j<board_static.length; j++){
            //changeColor(ctx, i);
            if (board_static[i][j] === 1){
                ctx.fillRect(j*LINE_SPAN_WIDTH + LINE_SPAN_WIDTH, i*LINE_SPAN_HEIGHT + LINE_SPAN_HEIGHT, LINE_SPAN_WIDTH, LINE_SPAN_HEIGHT);
            }
        }
    }

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(8*LINE_SPAN_WIDTH, 9*LINE_SPAN_HEIGHT+2);
    ctx.lineTo(7*LINE_SPAN_WIDTH+4*LINE_SPAN_WIDTH, 9*LINE_SPAN_HEIGHT + 2);
    ctx.closePath();
    ctx.stroke();

    /*
        // fill upper bounds
        ctx.fillStyle = 'red';
        next_x += 2*LINE_SPAN;
        next_y += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, 2*LINE_SPAN);
        next_x += 3*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 3*LINE_SPAN, 2*LINE_SPAN);
        next_x += 4*LINE_SPAN;
        ctx.fillRect(next_x, LINE_SPAN, LINE_SPAN, 3*LINE_SPAN);
        next_x += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 3*LINE_SPAN, 2*LINE_SPAN);
        next_x += 4*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, 2*LINE_SPAN);

        // fill medium up
        ctx.fillStyle = 'green';
        start_x = next_x = 2*LINE_SPAN;
        start_y = next_y = 5*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, LINE_SPAN);
        next_y += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, 3*LINE_SPAN);
        next_x += 3*LINE_SPAN;
        next_y = start_y;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 5*LINE_SPAN);
        next_x += LINE_SPAN;
        next_y += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, LINE_SPAN);
        next_x += LINE_SPAN;
        next_y = start_y;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, LINE_SPAN);
        next_x += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 3*LINE_SPAN); // middle
        next_x += LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, LINE_SPAN);
        next_y += 2*LINE_SPAN;
        next_x += LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, LINE_SPAN);
        next_x += 2*LINE_SPAN;
        next_y = start_y;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 5*LINE_SPAN);
        next_x += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, LINE_SPAN);
        next_y += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, 3*LINE_SPAN);

        //fill monsters zone
        ctx.fillStyle = 'yellow';
        start_x = next_x = 7*LINE_SPAN;
        start_y = next_y = 9*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 3*LINE_SPAN);
        next_y += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y,5*LINE_SPAN, LINE_SPAN);
        next_y = start_y;
        next_x += 4*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 3*LINE_SPAN);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = '3';
        ctx.beginPath();
        ctx.moveTo(start_x+LINE_SPAN, start_y+2);
        ctx.lineTo(start_x +4*LINE_SPAN, start_y+2);
        ctx.closePath();
        ctx.stroke();

        // fill middle down
        ctx.fillStyle = 'green';
        start_x = next_x = 2*LINE_SPAN;
        start_y = next_y = 11*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, 3*LINE_SPAN);
        next_x += 3*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 3*LINE_SPAN);
        next_x += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y+(2*LINE_SPAN), 5*LINE_SPAN, LINE_SPAN);
        next_x += 6*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 3*LINE_SPAN);
        next_x += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 2*LINE_SPAN, 3*LINE_SPAN);

        // fill lower down
        start_x = next_x = 2*LINE_SPAN;
        start_y = next_y += 4*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, LINE_SPAN);
        next_x += LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 3*LINE_SPAN);
        next_x += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 3*LINE_SPAN, LINE_SPAN);
        next_x += 4*LINE_SPAN;
        ctx.fillRect(next_x, next_y-LINE_SPAN, LINE_SPAN, 2*LINE_SPAN); // middle
        next_x += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 3*LINE_SPAN, LINE_SPAN);
        next_x += 4*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 3*LINE_SPAN);
        next_x += LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, LINE_SPAN);

        // fill lower 3 row down
        ctx.fillStyle = 'red';
        start_x = next_x = LINE_SPAN;
        start_y = next_y += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, LINE_SPAN);
        next_x += 4*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 2*LINE_SPAN);
        next_x += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 5*LINE_SPAN, LINE_SPAN);
        next_x += 6*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, 2*LINE_SPAN);
        next_x += 4*LINE_SPAN;
        ctx.fillRect(next_x, next_y, LINE_SPAN, LINE_SPAN);

        // fill final down
        start_x = next_x = 2*LINE_SPAN;
        start_y = next_y += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 6*LINE_SPAN, LINE_SPAN);
        next_x += 7*LINE_SPAN;
        ctx.fillRect(next_x, next_y-LINE_SPAN, LINE_SPAN, 2*LINE_SPAN);
        next_x += 2*LINE_SPAN;
        ctx.fillRect(next_x, next_y, 6*LINE_SPAN, LINE_SPAN);
    */
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(x, y, width, height, radius, fill, stroke) {
    let ctx = CANVAS_CTX;
    if (typeof stroke == 'undefined') {
        stroke = false;
    }
    // if (typeof  fill === 'undefined'){
    //     fill = true;
    // }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}

/**
 * function that will return an empty spot based on the board given
 * @param board - given board
 * @returns {{i: number, j: number}} - return object
 */
function findRandomSpot(board){
    function findSpot(i){
        return Math.floor(Math.random() * i);
    }

    let i = findSpot(20);
    let j = findSpot(17);
    while (board[i][j] !== 0) {
        i = findSpot(20);
        j = findSpot(17);
    }
    return {i: i, j: j};
}

/**
 * removes one life from the screen
 */
function removeLife() {
    let lifeToRemove;
    if (LIVES === 3) {
        lifeToRemove = document.getElementById('heart_three');
        lifeToRemove.style.display = "none";
        LIVES = 2;
    }
    else if (LIVES === 2) {
        lifeToRemove = document.getElementById('heart_two');
        lifeToRemove.style.display = "none";
        LIVES = 1;
    }
    else if (LIVES === 1) {
        lifeToRemove = document.getElementById('heart_one');
        lifeToRemove.style.display = "none";
        LIVES = 0;
        // TODO : handle losing the game
    }
}

/**
 * resets the lives of the user
 */
function resetLives() {
    let lifeToRemove;
    lifeToRemove = document.getElementById('heart_three');
    lifeToRemove.style.display = "inline-block";
    lifeToRemove = document.getElementById('heart_two');
    lifeToRemove.style.display = "inline-block";
    lifeToRemove = document.getElementById('heart_one');
    lifeToRemove.style.display = "inline-block";
    LIVES = 3;
}

/**
 * initializes the pacman object
 */
function initPacman() {
    let emptyCell = findRandomSpot();
    board_objects[emptyCell[0]][emptyCell[1]] = 3;
    pacman.i = emptyCell[0];
    pacman.j = emptyCell[1];
}

/**
 * initializes the ghosts objects
 */
function initGhosts(){
    board_objects[0][0] = 6;
    ghost1.id = 6;
    ghost1.i = 0;
    ghost1.j = 0;
    ghost1.i_last = -1;
    ghost1.j_last = -1;

    if (enemy_amount > 1){
        ghost2 = {};
        board_objects[0][16] = 7;
        ghost2.id = 7;
        ghost2.i = 0;
        ghost2.j = 16;
        ghost2.i_last = -1;
        ghost2.j_last = -1;
    }

    if (enemy_amount > 2){
        ghost3 = {};
        board_objects[19][0] = 8;
        ghost3.id = 7;
        ghost3.i = 19;
        ghost3.j = 0;
        ghost3.i_last = -1;
        ghost3.j_last = -1;
    }
}

/**
 * initializes the apple object
 */
function initApple() {
    if (!apple.eaten){
        board_objects[19][19] = 50;
        apple.id = 50;
        apple.i = 19;
        apple.j = 19;
        apple.i_last = -1;
        apple.j_last = -1;
    }
}