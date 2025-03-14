//Kendra Mannes 03/14/2025
/*Adapted from https://javascript30.com/ */
/*Javascript Drum Kit*/
/* New Information:
    changed drum kit to bird sound board
    added a click event
    added specific image for each bird
    added specific sound for each bird
*/


function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}
/* added code to have image of specific bird appear and disappear*/
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    const image = key.querySelector('.bird-image');
    if (!audio) return;

    key.classList.add('playing');
    if (image) image.style.display = 'block';

    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
        if (image) image.style.display = 'none';
    }, 5000);  
}
/*added code to have the birds be able to be clicked on for the image and the sound*/
function playSoundClick(e) {
    const letterClicked = e.target.id;
    if(!letterClicked) return;

    const key = e.target;
    const image = key.querySelector('.bird-image');
    e.target.parentNode.classList.add('playing');
    if(image) image.style.display = 'block';
    switch (letterClicked) {
        case "e":
            document.getElementById("audioe").currentTime = 0;
            document.getElementById("audioe").play();
            break;
        case "a":
            document.getElementById("audioa").currentTime = 0;
            document.getElementById("audioa").play();
        break;
        case "r":
            document.getElementById("audior").currentTime = 0;
            document.getElementById("audior").play();
            break;
        case "l":
            document.getElementById("audiol").currentTime = 0;
            document.getElementById("audiol").play();
            break;
        case "y":
            document.getElementById("audioy").currentTime = 0;
            document.getElementById("audioy").play();
            break;
        case "b":
            document.getElementById("audiob").currentTime = 0;
            document.getElementById("audiob").play();
            break;
        case "i":
            document.getElementById("audioi").currentTime = 0;
            document.getElementById("audioi").play();
            break;
        case "d":
            document.getElementById("audiod").currentTime = 0;
            document.getElementById("audiod").play();
            break;
    }
    setTimeout(() => {
        if (image) image.style.display = 'none';
    }, 5000);
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
keys.forEach(key => {
    key.addEventListener('click', playSoundClick);
});
