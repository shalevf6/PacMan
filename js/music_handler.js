

document.getElementById("music_off_button").onclick = function() {
    document.getElementById("eat").muted = true;
    document.getElementById("caught").muted = true;
    this.style.display = "none";
    document.getElementById("music_off_label").style.display = "none";
    document.getElementById("music_on_button").style.display = "inline-block";
    document.getElementById("music_on_label").style.display = "inline-block";
};

document.getElementById("music_on_button").onclick = function() {
    document.getElementById("eat").muted = false;
    document.getElementById("caught").muted = false;
    this.style.display = "none";
    document.getElementById("music_on_label").style.display = "none";
    document.getElementById("music_off_button").style.display = "inline-block";
    document.getElementById("music_off_label").style.display = "inline-block";
};