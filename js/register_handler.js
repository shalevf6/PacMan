let registeredUsers = {
    'a' : 'a'
};
let registerValidator;


$(document).ready(function() {

    $.validator.addMethod("notExist", function(value, element) {
        return this.optional(element) || !(value in registeredUsers);
    }, 'This Username is already taken');

    $.validator.addMethod('okPassword', function(value, element){
        return this.optional(element) || (
            /[A-Za-z]/i.test(value)
        && /\d/.test(value)
        );
    }, 'Password must contain at least 1 letter and 1 digit');

    $.validator.addMethod('passwordLength', function(value, element) {
        return this.optional(element) || value.length >= 8;
    });

    $.validator.addMethod( "lettersonly", function( value, element ) {
        return this.optional( element ) || /^[a-z]+$/i.test( value );
    }, "Letters only please" );


    registerValidator = $('#register_form').validate({
        rules : {
            username : {
                required : true,
                notExist : true
            },
            password : {
                required:  true,
                passwordLength: true,
                okPassword: true
            },
            fName : {
                required: true,
                lettersonly: true
            },
            lName: {
                required: true,
                lettersonly: true
            },
            email: {
                required: true,
                email: true
            },
            birthday : {
                required: true
            }
        },

        messages: {
            username: {
                required: 'You must enter a non-existing username'
            },
            fName: {required: 'Please enter your First Name'},
            lName: {required: 'Please enter your Last Name'},
            email: {
                required: 'Please enter your e-mail address',
                email: 'You must insert a valid e-mail address'
            }
        }
    });
});















/**
 * once submit has been pressed

$('#register_form').submit(function (e) {

})*/


