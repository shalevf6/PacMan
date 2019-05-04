
let settingsValidator;

$(document).ready(function() {

    $.validator.addMethod('numOfBallsChecker', function(value, element) {
        return this.optional(element) || (value.length >= 50 && value.length <= 90);
    });

    $.validator.addMethod('numOfEnemiesChecker', function(value, element) {
        return this.optional(element) || (value.length >= 1 && value.length <= 3);
    });

    $.validator.addMethod('gameTimeChecker', function(value, element) {
        return this.optional(element) || (value.length >= 1 && value.length <= 3);
    });
});

settingsValidator = $('#settings_form').validate({
    rules : {
        num_of_balls : {
            numOfBallsChecker: true
        },
        num_of_enemies : {
            numOfEnemiesChecker : true
        },
        game_time : {
            gameTimeChecker : true
        }
    },

    messages: {
        num_of_balls: {
            numOfBallsChecker: 'You must enter a number between 50 to 90'
        },
        num_of_enemies: {
            numOfEnemiesChecker: 'You must enter a number between 1 to 3',
        },
        game_time: {
            gameTimeChecker: 'The game has to be at least 60 seconds long',
        }
    },

    submitHandler : function(form) {
        // TODO : REFER TO GAME SCREEN, WITH THE CURRENT SETTINGS
        ShowSection("game_div");
    },

    invalidHandler : function(form) {
        swal("Oops!", "One of the parameters inserted is missing / incorrect", "error");
    }
});

// get the random button
let random_button = document.getElementById('random_button');

// when the user clicks the random button, fill randomly the inputs
random_button.onclick = function() {
    // TODO : FILL RANDOMLY THE INPUTS
};
