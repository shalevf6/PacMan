
/**************     GENERAL SETTINGS     ****************/
let CANVAS_CTX;
let intervals;
let game_on = false;

/**************     BOARD SIZE SETTINGS     ****************/
let BOARDER_WIDTH = 1000;
let BOARDER_HEIGHT = 800;
let LINE_SPAN_WIDTH = BOARDER_WIDTH/19;
let LINE_SPAN_HEIGHT = BOARDER_HEIGHT/22;
let BOARDER_WIDTH_DIFF = BOARDER_WIDTH-LINE_SPAN_WIDTH;
let BOARDER_HEIGHT_DIFF = BOARDER_HEIGHT-LINE_SPAN_HEIGHT;
let board_static = []; /* 0- open, 1- block, 2-up only, 3- pacman, 4- monster home , 5- 5 point, 15- 15 point, 25- 25 point */
let board_objects = []; /* 0- open, 1- block, 2-up only, 3- pacman, 6,7,8- ghosts, 50 - apple, 9 - time_bonus*/
let lives = 3;
let score = 0;
let new_time_bonus_bar;


/**************     PACMAN SETTINGS     ****************/
let pacman;
let apple;
let time_bonus;
let ghost1;
let ghost2;
let ghost3;

let keySettings;
let ALL_GHOSTS = [];


/**************     SOUND SETTINGS     ****************/
let game_music;
let eat_points_sound;
let caught_sound;
let eat_apple_sound;
let time_bonus_sound;


/**************     TMP SETTINGS     ****************/
// TODO: connect these settings to the settings handler
let ball_count;
if (!ball_5_color)
    ball_5_color  = 'yellow';
if (!ball_15_color)
    ball_15_color = 'white';
if (!ball_25_color)
    ball_25_color = 'red';
if (!ball_amount)
    ball_amount = 90;

enemy_amount = 2;
game_time = 20;


function setDefaults(){
    if (!up_key)
        up_key  = 'ArrowUp';
    if (!down_key)
        down_key = 'ArrowDown';
    if (!left_key)
        left_key = 'ArrowLeft';
    if (!right_key)
        right_key = 'ArrowRight';
}
/**
 * initializes a brand new game
 */
function initGame(continued) {
    game_on = true;

    let canvas = document.getElementById('canvas');
    canvas.setAttribute('width', BOARDER_WIDTH.toString());
    canvas.setAttribute('height', BOARDER_HEIGHT.toString());
    CANVAS_CTX = canvas.getContext('2d');

    setDefaults();
    keySettings = [];
    keySettings.push(up_key, down_key, left_key, right_key);

    lives = 3;
    score = 0;
    if (continued) {
        game_time = new_time_bonus_bar * 2;
    }
    else
        new_time_bonus_bar = Math.round(game_time * 0.5);
    ball_count = 0;

    intervals = {};

    initBoard();
    initSound();
    setPointBalls();
    initPacman();
    initGhosts();
    initApple();
    initTimeBonus();
    initTime();
    playGameMusic();

    setGameIntervals();
}

/**
 * function to set all game needed intervals
 */
function setGameIntervals(){
    intervals.pacmanUpdate = setInterval(updatePositionPacman, 251);
    intervals.ghostUpdate = setInterval(updatePositionGhosts, 333);
    intervals.appleUpdate = setInterval(updatePositionApple, 333);
    intervals.collisionDetection = setInterval(collisionDetection, 40);
    intervals.timeInterval = setInterval(updateTime,1000);
    intervals.pacmanAnimation = setInterval(pacmanInterval,250);
    intervals.appleAnimation = setInterval(appleInterval, 100);
}


/**
 * initializes the time of the current game
 */
function initTime() {
    $('#lblTime').val(game_time);
}

/*
3 functions needs to be moved to different JS file (Points_Handler.js)
 */
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

function updateTime() {
    if (game_time > 0){
        game_time--;
    }
    $('#lblTime').val(game_time);
}

/**
 * removes one life from the screen
 */
function removeLife() {
    let lifeToRemove;
    if (lives === 3) {
        lifeToRemove = document.getElementById('heart_three');
        lifeToRemove.style.display = "none";
        lives = 2;
    }
    else if (lives === 2) {
        lifeToRemove = document.getElementById('heart_two');
        lifeToRemove.style.display = "none";
        lives = 1;
    }
    else if (lives === 1) {
        lifeToRemove = document.getElementById('heart_one');
        lifeToRemove.style.display = "none";
        lives = 0;
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
    lives = 3;
}


/**
 * function to update score status based on pacman movement
 */
function updateScore() {
    if (board_static[pacman.i][pacman.j] === 5 ){
        score+=5;
        board_static[pacman.i][pacman.j] =0;
        playSound(eat_points_sound);
        ball_count--;
    }
    if (board_static[pacman.i][pacman.j] === 15 ){
        score+=15;
        board_static[pacman.i][pacman.j] =0;
        playSound(eat_points_sound);
        ball_count--;
    }
    if (board_static[pacman.i][pacman.j] === 25 ){
        score+=25;
        board_static[pacman.i][pacman.j] =0;
        playSound(eat_points_sound);
        ball_count--;
    }

    if (ball_count === 0){
        endGame(timesUp);
    }
}

/**
 * function to draw all elements
 */
function draw() {
    CANVAS_CTX.clearRect(0, 0, BOARDER_WIDTH, BOARDER_HEIGHT);
    drawBoard();
    drawPoints();
    drawPacman();
    drawGhosts();
    drawApple();
    drawTimeBonus();

    $('#lblScore').val(score.toString());
}

/**
 * function to draw all ghosts
 */
function drawGhosts() {
    ALL_GHOSTS.forEach(function (element){
        if (element !== undefined)
            drawGhost(element);
    });
}

/**
 * gets the right direction image of a given pacman / ghost image
 * @param image - a given image
 */
function getDirectionImage(image) {
    // it's a pacman
    if (image.baseName !== undefined && image.baseName === 'PACMAN')
        return 'PACMAN_' + getRealDirection(image.direction) + '_' + pacman.pacman_image;
    // it's a ghost
    else
        return image.baseName + image.direction;
}

/**
 * gets the real direction of a given key
 * @param key - a given direction
 */
function getRealDirection(key) {
    if (key === up_key)
        return 'UP';
    if (key === down_key)
        return 'DOWN';
    if (key === left_key || typeof (key) === 'undefined')
        return 'LEFT';
    if (key === right_key)
        return 'RIGHT';
}


/**
 * updates the id of the current apple image
 */
function appleInterval() {
    if (apple.apple_image === 4)
        apple.apple_image = 1;
    else
        apple.apple_image++;
}

/**
 * updates the id of the current pacman image
 */
function pacmanInterval() {
    if (pacman.pacman_image === 2)
        pacman.pacman_image = 1;
    else
        pacman.pacman_image++;
}

/**
 * function to detect weather pacman had collided with another character
 * TODO : ADD COLLISION AND SOUND WITH CLOCK
 */
function collisionDetection() {
    if (game_time === 0){
        endGame(timesUp);
    }
    if (game_time === new_time_bonus_bar)
        time_bonus.show = true;
    ALL_GHOSTS.forEach(function (ghost) {
        if (ghost === undefined)
            return;

        if (ghost.i === pacman.i
            && ghost.j === pacman.j){
            score -= 10;
            if (score < 0)
                score = 0;
            pacGotBusted();
        }
    });

    // handles catching the apple
    if (!apple.eaten)
        if (apple.i === pacman.i && apple.j === pacman.j) {
            board_objects[apple.i][apple.j] = 0;
            score += 50;
            apple.eaten = true;
            playSound(eat_apple_sound);
        }

    // handles catching the time bonus
    if (time_bonus.show)
        if (time_bonus.i === pacman.i && time_bonus.j === pacman.j) {
            board_static[time_bonus.i][time_bonus.j] = 0;
            game_time+=20;
            time_bonus.show = false;
            playSound(time_bonus_sound);
        }
}

/**
 * ends the current game
 * @param endReason - the reason the game ended
 */
function endGame(endReason) {
    game_on = false;
    clearIntervals();
    stopGameMusic();

    if (endReason !== undefined)
        endReason();
    // addMessageToGameOverWindow(endReason);
    // // shows the game over window
    // document.getElementById('game_over_div').style.display = "block";
}

/**
 * adds the appropriate message to the game over window
 */
function timesUp() {
    let game_over_message = document.getElementById('game_over_message');
    let game_over_points = document.getElementById('game_over_points');
    if (score < 150) {
        game_over_message.innerHTML = "You can do better..";
        game_over_points.innerHTML = "Points earned : " + score;
    }
    else {
        let game_over_headline = document.getElementById('game_over_headline');
        game_over_headline.innerHTML = "We have a Winner!!!";
        game_over_message.innerHTML = "Good job bro ;)";
        game_over_points.innerHTML = "Points earned : " + score;
    }

    $('#game_over_div').show();
}

/**
 * function to let the user know he lost
 */
function loseFunc(){
    $('#game_over_headline').html('You Lost ;(');
    $('#game_over_points').html('Your Points' + score.toString());
    $('#game_over_div').show();
}

/**
 * function to clear all intervals
 */
function clearIntervals(){
    Object.keys(intervals).forEach(function (key, index) {
        // in case the game really ended
        // if(lives === 0 || time_left <= 0) {
        clearInterval(intervals[key]);
        // }
        // // in case the pacman just got busted
        // else if (key !== "timeInterval" && key !== "gameInterval") {
        //     clearInterval(intervals[key]);
        // }
    });
}

/**
 * function that will handle when pac has gone busted
 */
function pacGotBusted() {
    clearCharactersFromBoard();
    clearIntervals();
    initPacman();
    initGhosts();
    stopGameMusic();

    playSound(caught_sound);

    removeLife();
    if (lives === 0){
        endGame(loseFunc);
    }
    else{
        draw();
        playGameMusic();
        // TODO: possible to add 'ready?' animation here
        setTimeout(setGameIntervals, 2200);
    }
}

/**
 * closes the game over screen
 */
function closeGameOverScreen() {
    document.getElementById('game_over_div').style.display = "none";
}