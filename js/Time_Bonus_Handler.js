/**
 * initializes the time object
 */
function initTimeBonus() {
    time_bonus = {};
    time_bonus.id = 9;
    time_bonus.baseName = 'TIME_BONUS';
    time_bonus.show = false;
    setTimeBonusPosition();
}

/**
 * gets a position for the time object
 */
function setTimeBonusPosition() {
    let emptyCell = findRandomSpot(board_objects);
    while (isPointCell(emptyCell))
        emptyCell = findRandomSpot(board_objects);
    time_bonus.i = emptyCell.i;
    time_bonus.j = emptyCell.j;
}

/**
 * draws the time bonus on screen
 */
function drawTimeBonus() {
    if (time_bonus.show) {
        let ctx = CANVAS_CTX;
        let time_bonus_image = document.getElementById('TIME_BONUS');
        ctx.drawImage(time_bonus_image, 1.12 * LINE_SPAN_WIDTH + time_bonus.j * LINE_SPAN_WIDTH, 1.1 * LINE_SPAN_HEIGHT + time_bonus.i * LINE_SPAN_HEIGHT, 32, 32);
    }
}