/**
 * initializes all the sound elements of the game
 */
function initSound() {
    game_music = document.getElementById("game_music");
    game_music.loop = true;
    eat_points_sound = document.getElementById("eat_points");
    eat_apple_sound = document.getElementById("eat_apple");
    time_bonus_sound = document.getElementById("eat_extra");
    caught_sound = document.getElementById("caught");
}

/**
 * mutes all sounds in the game
 */
document.getElementById("music_off_button").onclick = function() {
    eat_points_sound.muted = true;
    eat_apple_sound.muted = true;
    time_bonus_sound.muted = true;
    caught_sound.muted = true;
    game_music.muted = true;
    this.style.display = "none";
    document.getElementById("music_on_button").style.display = "inline-block";
};

/**
 * unmutes all sounds in the game
 */
document.getElementById("music_on_button").onclick = function() {
    eat_points_sound.muted = false;
    eat_apple_sound.muted = false;
    time_bonus_sound.muted = false;
    caught_sound.muted = false;
    game_music.muted = false;
    this.style.display = "none";
    document.getElementById("music_off_button").style.display = "inline-block";
};

/**
 * plays a game sound
 */
function playSound(eatSound) {
    eatSound.pause();
    eatSound.currentTime = 0;
    eatSound.play();
}

/**
 * plays the game music
 */
function playGameMusic() {
    game_music.play();
}

/**
 * stops game music
 */
function stopGameMusic() {
    game_music.pause();
    game_music.currentTime = 0;
}
