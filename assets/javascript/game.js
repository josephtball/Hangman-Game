// global variables
var wins = 0;
var losses = 0;
var word = '';


function coreGame() {

	var letterGuesses = [];
	var wrongLetters = [];
	var userGuess = "";
	
	// randomly selecting a word
	var words = ['HONDA', 'MERCEDES', 'FORD', 'FERRARI', 'VOLKSWAGON', 'CADILLAC'];
	word = words[Math.floor(Math.random() * words.length)];
	var wordArr = word.split('');

	// write "_ _ _" to screen
	var hiddenWordArr = [];
	for (var i = 0; i < wordArr.length; i++) {
		hiddenWordArr.push('_');
	}
	document.querySelector('#word').innerHTML = hiddenWordArr.join(' ');

	// set number of guesses
	var remainingGuesses = 12;
	document.querySelector('#remainingGuesses').innerHTML = remainingGuesses;

	// reset wrong letter guesses
	document.querySelector('#letterGuesses').innerHTML = wrongLetters;

	// function to get user's guess
	document.onkeyup = function(event) {
		var test = event.key.toUpperCase();
		var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

if (remainingGuesses > 0) {
		// test if input is a letter
		if (letters.indexOf(test) >=0 && letterGuesses.indexOf(test) == -1) {
			userGuess = test;
			letterGuesses.push(userGuess);

			// check if guess is a letter in word
			if (wordArr.indexOf(userGuess) >=0) {
				for (var i = 0; i < wordArr.length; i++) {
					if (wordArr[i] === userGuess) {
						hiddenWordArr[i] = userGuess
					}
				}
				document.querySelector('#word').innerHTML = hiddenWordArr.join(' ');
			} else {
				remainingGuesses--;
				document.querySelector('#remainingGuesses').innerHTML = remainingGuesses;
				wrongLetters.push(userGuess);
				document.querySelector('#letterGuesses').innerHTML = wrongLetters.join(', ');
			} // end if/else check
		} //end if test

		// if user loses
		if (remainingGuesses == 0) {
			losses++;
			document.querySelector('#losses').innerHTML = losses;
			setTimeout(lose, 50);
		}

		// if user wins
		if (hiddenWordArr.join() == wordArr.join()) {
			wins++;
			document.querySelector('#wins').innerHTML = wins;
			setTimeout(won, 50);
		}
}
	} // end get user's guess function
} // end coreGame function

// lost game message
function lose() {
	var again = confirm('You lose. The word was ' + word.toLowerCase() + '. Do you want to play again?');
	if (again) {
		coreGame();
	}
}

// won game message
function won() {
	var again = confirm('You win! The word was ' + word.toLowerCase() + '. Do you want to play again?');
	if (again) {
		coreGame();
	}
}