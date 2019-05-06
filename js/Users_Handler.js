let registeredUsers = {
    'a' : 'a'
};

let registerValidator;
let loginValidator;

// to know if a user is logged in
let loggedIn = false;

document.getElementById("logout_button").style.display="none";

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
});

registerValidator = $('#register_form').validate({
    rules : {
        register_username : {
            required : true,
            notExist : true
        },
        register_password : {
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
        register_username: {
            required: 'You must enter a non-existing username'
        },
        fName: {required: 'Please enter your First Name'},
        lName: {required: 'Please enter your Last Name'},
        email: {
            required: 'Please enter your e-mail address',
            email: 'You must insert a valid e-mail address'
        }
    },

    submitHandler : function(form) {
        if (loggedIn)
            swal("Oops!", "You need to log out before registering!", "error");
        else {
            let username = $('#register_username').val();
            registeredUsers[username] = $('#register_password').val();
            updateUpperUser(username);
            clearForm(form.getAttribute('id'));
            swal("Congrats!", "You Registered Successfully!", "success");
            loggedIn = true;
            ShowSection("settings_div");
        }
    },

    invalidHandler : function(form) {
        swal("Oops!", "One of the parameters inserted is missing / incorrect", "error");
    }
});

$(document).ready(function() {

    loginValidator = $('#login_form').validate({
        rules : {
            login_password : {
                required: true,
            },
            login_username : {
                required : true
            },
        },

        messages: {
            login_username: {
                required: 'You must enter an existing user name'
            },
            login_password: {
                required: 'You must enter a valid password',
            }
        },

        submitHandler : function(form) {
            if (loggedIn)
                swal("Oops!", "You need to log out before logging in!", "error");
            else {
                let username = $('#login_username').val();
                let password = $('#login_password').val();
                let valid = false;
                if (username in registeredUsers) {
                    if (password === registeredUsers[username]) {
                        valid = true;
                    }
                }

                // the user exists
                if (valid) {
                    updateUpperUser(username);
                    clearForm(form.getAttribute('id'));
                    swal("Congrats!", "You Logged in Successfully!", "success");
                    loggedIn = true;
                    ShowSection("settings_div");
                }
                // the user doesn't exist
                else {
                    swal("Oops!", "The user name or the password are incorrect", "error");
                }
            }
        },

        invalidHandler : function(form) {
            swal("Oops!", "One of the parameters inserted is missing / incorrect", "error");
        }
    });
});

/**
 * changes the upper user's name, if logged in / Registered successfully
 */
function updateUpperUser(username) {
    let upperUser = document.getElementById('upper_user');
    upperUser.innerHTML = "Signed in as <b>" + username + "</b>";
    document.getElementById("logout_button").style.display="block";
}

/**
 * clears the given form
 * @param formId - a given form's id
 */
function clearForm(formId) {
    if (formId === "register_form")
        registerValidator.resetForm();
    if (formId === "login_form")
        loginValidator.resetForm();
    let formElements = document.getElementById(formId).elements;
    for (let i=0; i < formElements.length; i++) {
        let field_type = formElements[i].type.toLowerCase();
        switch (field_type) {
            case "text":
                formElements[i].value = "";
                break;
            case "password":
                formElements[i].value = "";
                break;
            case "date":
                formElements[i].valueAsDate = null;
                break;
            default:
                break;
        }
    }
}

/**
 * logs out the current logged in user
 */
function logout() {
    swal({
        title: "Are you sure you want to log out?",
        text: "Last chance..",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((logout) => {
            if (logout) {
                swal("Logged out successfully!", {
                    icon: "success",
                });
                loggedIn = false;
                ShowSection('welcome_div');
                document.getElementById("logout_button").style.display="none";
                document.getElementById('upper_user').innerHTML = "No user logged in";
            }
        });
}












/**
 * once submit has been pressed

 $('#register_form').submit(function (e) {

})*/


