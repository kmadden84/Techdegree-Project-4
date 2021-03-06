class Game {
    constructor(missed, phrases, activePhrase) {
        this.phrases = [
                'HEAD IN THE CLOUDS', 
                'DEAD AS A DOORNAIL', 
                'DUMB AS A ROCK', 
                'LET SLEEPING DOGS LIE', 
                'BACK TO THE DRAWING BOARD'
        ];
        this.activePhrase = null;
        this.missed = 0;

    }
    startGame() {
        // hide overlay
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';

        // restore hearts
        $('#scoreboard ol li').removeClass('tried').addClass('tries');
        $('.tries img').attr('src', 'images/liveHeart.png');

        //random phrase
        this.activePhrase = this.getRandomPhrase();

        //on restart, clear exixing phrase
        $('#phrase ul li').remove();

        // on restart, reset life count
        this.missed = 0;

        // add new phrase
        phrase.addPhraseToDisplay(this.activePhrase);

        //on restart, re-enable button if disabled
            $('button.key').prop("disabled", false);

        //on restart, remove wrong/disabled class if present
            $('button.key').removeClass('wrong chosen');

        //on restart, remove win/lose classes if present
        $('#overlay').removeClass('win lose');

        }  
    getRandomPhrase() {
        // randomly retrieves one phrase from the phrases array
        const randomNumber = Math.floor(Math.random() * 5);
        const selectedPhrase = this.phrases[randomNumber];
        let letter = '';

        // creates HTML from array of prases
        for (let i = 0; i < selectedPhrase.length; i += 1) {
            var letterClass = selectedPhrase[i];
            if (letterClass != ' ') {
                letter += `<li class="hide letter ${letterClass}">${letterClass}</li>`;
            } else {
                letter += `<li class="space">${letterClass}</li>`;
            }
        }
        return letter;
    }

    handleInteraction(click, keyPress, upperKeyPress) {

        const selection = click;
        const selectionUpper = $(selection).text().toUpperCase();
        const selector = "#phrase li:contains(" + selectionUpper + ")";
        const selectedKey = "#phrase li:contains(" + upperKeyPress + ")";

        //if button text not contained in phrase, add wrong class to button {
        if ($(selector).length <= 0) {
            $(selection).addClass('wrong');
        }
        if ($(selectedKey).length <= 0) {
            $("#qwerty button:contains(" + keyPress + ")").addClass('wrong');
        }

        //send key selection and phrase arguments to checkLetter Method
        phrase.checkLetter(selectionUpper, upperKeyPress, this.activePhrase);

        //disable key button on click
        $(selection).attr('disabled', true).addClass('chosen');
        $("#qwerty button:contains(" + keyPress + ")").attr('disabled', true).addClass('chosen');
    }
    checkForWin() {
        var winner = $("li").not("li.space").hasClass('hide');
        if ($(winner).length <= 0) {
            this.gameOver();
            return true;
        }
    }
    removeLife() {
        this.missed += 1;
        $('#scoreboard ol').children('li.tries:first').removeClass('tries').addClass('tried');
        $('.tried img').attr('src', 'images/lostHeart.png');
        if (this.missed == 5) {
            this.gameOver()
        }
    }
    gameOver() {
        const overlay = document.getElementById('overlay');
        if (this.missed >= 5) {
            $(overlay).removeClass('win')
            $(overlay).addClass('lose')
        } else {
            $(overlay).removeClass('lose')
            $(overlay).addClass('win')
        }
        overlay.style.display = 'block';
    }
}