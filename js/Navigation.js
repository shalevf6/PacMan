let divs = [
    'welcome_div', 'register_div', 'login_div', 'settings_div', 'game_div'
];


let menu_open = false;

/**
 * this function will hide all div's
 */
function hideDivs(){
    divs.forEach(function (div) {
        $('#' + div).hide();
    })
}


/**
 * function to show the desired div
 * @param id - of the desired div
 */
function ShowSection(id)
{
    if (game_on){
        endGame();
    }
    // preventing from accessing settings window before logging in
    if (id === 'settings_div' && !loggedIn) {
        swal("Oops!", "You need to log in before accessing the settings", "error");
    }
    else {
        if (!id in divs)
            return;

        hideDivs();

        if (menu_open)
            closeMenu();

        //show only one section
        $('#' + id).show();

        clearForm('register_form');
        clearForm('login_form');
        clearSettings();

    }
}

/**
 * the page's loaded when you enter the site
 */
function PageLoaded()
{
    ShowSection('welcome_div');
    // ShowSection('game_div');
    // initGame();
}


/************************   ABOUT MODAL WINDOW    **********************/

// get the modal window
let about_div = document.getElementById('about_div');

// get the element that opens the modal
let about_button = document.getElementById("about_button");

// get the <span> element that closes the modal
let close_modal_button = document.getElementById("close_modal_button");

// when the user clicks the button, open the modal
about_button.onclick = function() {
    about_div.style.display = "block";
    flipMenu();
};

// when the user clicks on <span> (x), close the modal
close_modal_button.onclick = function() {
    about_div.style.display = "none";
};

// when the user clicks anywhere outside of the modal, close the modal
window.onclick = function(event) {
    if (event.target === about_div) {
        about_div.style.display = "none";
    }
};

// when the user presses the ESC button, close tha modal
$(document).keydown(function(event) {
    if (event.keyCode === 27) {
        $('#about_div').hide();
    }
});


/************************   SIDE-MENU    **********************/
/**
 * method to flip the menu state
 */
function flipMenu(){
    if (menu_open)
        closeMenu();
    else
        openMenu();
    menu_open = !menu_open;
}

function openMenu() {
    document.getElementById("side-menu").style.width = "250px";
    document.getElementById("main-wrapper").style.marginLeft = "250px";
    document.getElementById("footer_wrapper").style.marginLeft = "250px";
}
function closeMenu() {
    document.getElementById("side-menu").style.width = "0";
    document.getElementById("main-wrapper").style.marginLeft= "0";
    document.getElementById("footer_wrapper").style.marginLeft= "0";
}