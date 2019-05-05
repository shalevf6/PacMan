
/****************   SAVED SETTINGS  ****************/
let up_key;
let down_key;
let left_key;
let right_key;
let ball_amount;
let enemy_amount;
let game_time;
let ball_5_color;
let ball_15_color;
let ball_25_color;
/**************** ---------------- *****************/

let settingsValidator;
let clicked_key;
let picked_key = document.getElementById('new_key');

$(document).ready(function() {

    $.validator.addMethod('numOfBallsChecker', function(value, element) {
        return this.optional(element) || (value>= 50 && value <= 90);
    });

    $.validator.addMethod('numOfEnemiesChecker', function(value, element) {
        return this.optional(element) || (value >= 1 && value <= 3);
    });

    $.validator.addMethod('gameTimeChecker', function(value, element) {
        return this.optional(element) || value >= 60;
    });
});

settingsValidator = $('#settings_form').validate({
    rules : {
        num_of_balls : {
            numOfBallsChecker: true,
            required: true
        },
        num_of_enemies : {
            numOfEnemiesChecker : true,
            required: true
        },
        game_time : {
            gameTimeChecker : true,
            required: true
        },
        point_color_25 : {
            required: true
        },
        point_color_15 : {
            required: true
        },
        point_color_5 : {
            required: true
        }
    },

    messages: {
        num_of_balls: {
            numOfBallsChecker: 'You must enter a number between 50 to 90',
            required: "This field is required"
        },
        num_of_enemies: {
            numOfEnemiesChecker: 'You must enter a number between 1 to 3',
            required: "This field is required"
        },
        game_time: {
            gameTimeChecker: 'The game has to be at least 60 seconds long',
            required: "This field is required"
        },
        point_color_25 : {
            required: "This field is required"
        },
        point_color_15 : {
            required: "This field is required"
        },
        point_color_5 : {
            required: "This field is required"
        }
    },

    submitHandler : function(form) {
        ball_amount = document.getElementById('num_of_balls').value;
        enemy_amount = document.getElementById('num_of_enemies').value;
        game_time = document.getElementById('game_time').value;
        ball_5_color = document.getElementById('point_color_5').value;
        ball_15_color = document.getElementById('point_color_15').value;
        ball_25_color = document.getElementById('point_color_25').value;
        clearSettings();
        ShowSection("game_div");
        initBoard();
    },

    invalidHandler : function(form) {
        swal("Oops!", "One of the parameters inserted is missing / incorrect", "error");
    }
});

// get the random button
let random_button = document.getElementById('random_button');

/**
 * when the user clicks the random button, fill randomly the inputs
 */
random_button.onclick = function() {
    document.getElementById('point_color_5').value = getRandomColor();
    document.getElementById('point_color_15').value = getRandomColor();
    document.getElementById('point_color_25').value = getRandomColor();
    document.getElementById('num_of_balls').value = Math.ceil(Math.random() * 40) + 50;
    document.getElementById('num_of_enemies').value = Math.ceil(Math.random() * 2) + 1;
    document.getElementById('game_time').value = Math.ceil(Math.random() * 180) + 60;
};

/**
 * gets a random color
 * @returns string random color
 */
function getRandomColor() { // TODO : add set random color from this link: https://stackoverflow.com/questions/1484506/random-color-generator
    let letters = '0123456789ABCDEF';
    let randomColor = '#';
    for (let i = 0; i < 6; i++) {
        randomColor += letters[Math.floor(Math.random() * 16)];
    }
    return randomColor;
}

/**
 * gets the key the user clicked to determine which key to replace
 */
document.getElementById('up_button').onclick = function() {
    clicked_key = 'UP';
};

/**
 * gets the key the user clicked to determine which key to replace
 */
document.getElementById('left_button').onclick = function() {
    clicked_key = 'LEFT';
};

/**
 * gets the key the user clicked to determine which key to replace
 */
document.getElementById('down_button').onclick = function() {
    clicked_key = 'DOWN';
};

/**
 * gets the key the user clicked to determine which key to replace
 */
document.getElementById('right_button').onclick = function() {
    clicked_key = 'RIGHT';
};

/**
 * sets a new key for the game controls
 */
picked_key.onkeydown = function (event) {
    let new_key = event.key;
    if (clicked_key == null)
        swal("You must click on one of the direction buttons before inserting the new key", "", "error");
    else {
        picked_key.value = new_key;
        swal({
            title: "Are you sure you want to replace the " + clicked_key + " key to the " + new_key + " key?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((confirm_switch) => {
                if (confirm_switch) {
                    let replaced_key = false;
                    if (clicked_key === "UP") {
                        up_key = new_key;
                        replaced_key = true;
                    }
                    if (clicked_key === "LEFT") {
                        left_key = new_key;
                        replaced_key = true;
                    }
                    if (clicked_key === "DOWN") {
                        down_key = new_key;
                        replaced_key = true;
                    }
                    if (clicked_key === "RIGHT") {
                        right_key = new_key;
                        replaced_key = true;
                    }
                    if (replaced_key) {
                        swal("keys switched successfully!", {
                            icon: "success",
                        });
                    }
                }
                picked_key.value = '';
            });
    }
};

/**
 * clears the settings form
 */
function clearSettings() {
    settingsValidator.resetForm();
    let settingsFormElements = document.getElementById('settings_form').elements;
    // num_of_balls value
    settingsFormElements[0].value = "";
    // num_of_enemies value
    settingsFormElements[1].value = "";
    // game_time value
    settingsFormElements[2].value = "";
    // point_color_5 value
    settingsFormElements[3].value = "#ffffff";
    // point_color_15 value
    settingsFormElements[4].value = "#14b716";
    // point_color_25 value
    settingsFormElements[5].value = "#e52929";
}