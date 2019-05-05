
let settingsValidator;
let picked_key;

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
        // TODO : REFER TO GAME SCREEN, WITH THE CURRENT SETTINGS
        ShowSection("game_div");
        initBoard();
    },

    invalidHandler : function(form) {
        swal("Oops!", "One of the parameters inserted is missing / incorrect", "error");
    }
});

// get the random button
let random_button = document.getElementById('random_button');


// when the user clicks the random button, fill randomly the inputs
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