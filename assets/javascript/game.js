// global variables
var wins = 0;
var losses = 0;
var word = '';
var image = '';

function coreGame() {

	var letterGuesses = [];
	var wrongLetters = [];
	var userGuess = "";

	// reset wins/losses
	wins = 0;
	document.querySelector('#wins').innerHTML = wins;
	losses = 0;
	document.querySelector('#losses').innerHTML = losses;

	// reset image
	document.querySelector('#image').setAttribute('src', 'assets/images/question-mark.png');
	
	// randomly selecting a word
	var options = {
		words: ['HONDA', 'MERCEDES', 'FORD', 'FERRARI', 'VOLKSWAGON', 'CADILLAC'],
		images: ['assets/images/honda.png', 'assets/images/mercedes.png', 'assets/images/ford.png', 'assets/images/ferrari.png', 'assets/images/volkswagon.png', 'assets/images/cadillac.png'],
	}
	word = options.words[Math.floor(Math.random() * options.words.length)];
	var wordArr = word.split('');

	// get image file
	var index = options.words.indexOf(word);
	image = options.images[index];

	// write "_ _ _" to screen
	var hiddenWordArr = [];
	for (var i = 0; i < wordArr.length; i++) {
		hiddenWordArr.push('_');
	}
	document.querySelector('#word').innerHTML = hiddenWordArr.join(' ');

	// set number of guesses
	var remainingGuesses = 6;
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
			document.getElementById('loseAudio').play();
			document.querySelector('#image').setAttribute('src', image);

			setTimeout(lose, 500);
		}

		// if user wins
		if (hiddenWordArr.join() == wordArr.join()) {
			remainingGuesses = 0;
			wins++;
			document.querySelector('#wins').innerHTML = wins;
			document.getElementById('winAudio').play();
			document.querySelector('#image').setAttribute('src', image);
			setTimeout(won, 500);
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