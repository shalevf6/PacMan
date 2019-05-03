let divs = [
    'welcome_div', 'signup_div', 'login_div', 'settings_div', 'game_div'
];


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
    if (!id in divs)
        return;

    hideDivs();

    if(menu_open)
        closeMenu();

    //show only one section
    $('#' + id).show();
}


/************************   MENU    **********************/
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
}
function closeMenu() {
    document.getElementById("side-menu").style.width = "0";
    document.getElementById("main-wrapper").style.marginLeft= "0";
}