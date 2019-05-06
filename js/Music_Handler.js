/**
 * initializes all the sound elements of the game
 */
function initSound() {
    game_music = document.getElementById("game_music");
    game_music.loop = true;
    eat_sound = document.getElementById("eat");
    caught_sound = document.getElementById("caught");
    initGameMusic();
}

document.getElementById("music_off_button").onclick = function() {
    eat_sound.muted = true;
    caught_sound.muted = true;
    game_music.muted = true;
    this.style.display = "none";
    document.getElementById("music_on_button").style.display = "inline-block";
};

document.getElementById("music_on_button").onclick = function() {
    eat_sound.muted = false;
    caught_sound.muted = false;
    game_music.muted = false;
    this.style.display = "none";
    document.getElementById("music_off_button").style.display = "inline-block";
};


/**
 * plays the eat sounds
 */
function playEat() {
    eat_sound.pause();
    eat_sound.currentTime = 0;
    eat_sound.play();
}

/**
 * plays the game music
 */
function initGameMusic() {
    game_music.play();
}

/**
 * stops game music
 */
function stopGameMusic() {
    game_music.pause();
    game_music.currentTime = 0;
}
