let CANVAS_CTX;

/**************     BOARD SIZE SETTINGS     ****************/
let BOARDER_WIDTH = 550;
let BOARDER_HEIGHT = 550;
let LINE_SPAN_WIDTH = BOARDER_WIDTH/19;
let LINE_SPAN_HEIGHT = BOARDER_HEIGHT/22;
let BOARDER_WIDTH_DIFF = BOARDER_WIDTH-LINE_SPAN_WIDTH;
let BOARDER_HEIGHT_DIFF = BOARDER_HEIGHT-LINE_SPAN_HEIGHT;
let board_static = [];
let board_objects = [];



/**************     PACMAN SETTINGS     ****************/
let pacman = {};



/**
 * function to init the entire board
 */
function initBoard() {
    let canvas = document.getElementById('canvas');
    canvas.setAttribute('width', BOARDER_WIDTH.toString());
    canvas.setAttribute('height', BOARDER_HEIGHT.toString());

    CANVAS_CTX = canvas.getContext('2d');

    setLogicBoard();
    drawBoard();

}

/**
 * function to set logic board
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
    board_static[9] = [0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0];
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
    board_objects[9] = [0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0];
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
 * function to find an empty spot in the board
 * @returns {number[]}
 */
function findRandomSpot(){
    function findSpot(i){
        return Math.floor((Math.random() * i) + 1);
    }

    let i = findSpot(17);
    let j = findSpot(20);
    while (board_static[i][j] !== 1) {
        i = findSpot(17);
        j = findSpot(20);
    }
    return [i, j];
}