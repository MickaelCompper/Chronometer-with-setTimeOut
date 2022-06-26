'use strict'

let chronoDom;

// We launch the update every 10 thousandths of a second or every hundredths of a second
let updateSpead = 10;

// Initialization of the chronometer to 0
const chrono = {
    minuts : 0,
    seconds : 0,
    hundredths : 0
}

// Timer ID
let timerId = null;

document.addEventListener('DOMContentLoaded',function(){

    chronoDom = document.querySelector('#chrono');

    // Start/stop button
    let domStartButton = document.querySelector('#start');

    // Reset button
    let domResetButton = document.querySelector('#reset');
    
    // We initialize the display to 0
    updateDisplay();

// Click event on the button. We start or stop the chrono and we change the text
    domStartButton.addEventListener('click', function(){
        if (timerId === null) {
            timerId = window.setTimeout(updateChrono, updateSpead);
            domStartButton.innerText = 'Stop';
        }
        else
        {
            window.clearTimeout(timerId);
            timerId = null;
            domStartButton.innerText = 'Start';
        }
    });

// Click event on the reset button. We initialize the values
    domResetButton.addEventListener('click', function () {
        chrono.minuts = 0;
        chrono.seconds = 0;
        chrono.hundredths = 0;

        domStartButton.innerText = 'Start';
        window.clearTimeout(timerId);
        timerId = null;
        updateDisplay();
    });


});

/** Update the chrono display in the HTML page
 ** 
 */
function updateChrono()
{

// Modify the values to display
    if (chrono.hundredths < 99) {
        chrono.hundredths++;
    } 
    else if (chrono.seconds < 59) {
        chrono.hundredths = 0;
        chrono.seconds++;
    } 
    else {
        chrono.hundredths = 0;
        chrono.seconds = 0;
        chrono.minuts++;
    }

    updateDisplay();

// we restart the update of the chrono
    timerId = window.setTimeout(updateChrono, updateSpead);
}

/** Display values in HTML */
function updateDisplay()
{
// we update the display
    chronoDom.innerText = `${(chrono.minuts < 10) ? '0' + chrono.minuts : chrono.minuts} : ${(chrono.seconds < 10) ? '0' + chrono.seconds : chrono.seconds
        } : ${(chrono.hundredths < 10) ? '0' + chrono.hundredths : chrono.hundredths}`;
}