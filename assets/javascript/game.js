// GLOBAL VARIABLES
//===================================================================
// Array and Variables for holding data

var moonOptions = ["newmoon", "waxingcrescent", "firstquarter", "waxinggibbous", "fullmoon", "waninggibbous", "thirdquarter", "waxingcrescent"];
var selectedWord = "";
var lettersInWord = [];
var letterGuessed;
var numberOfBlanks = 0;
var blanksAndGuesses = [];
var wrongGuesses = [];

// Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// FUNCTIONS
//===================================================================
function startGame() {
    selectedWord = moonOptions[Math.floor(Math.random() * moonOptions.length)];
    lettersInWord = selectedWord.split("");
    numberOfBlanks = lettersInWord.length;

    // Reset 
    guessesLeft = 9;
    wrongGuesses = [];
    blanksAndGuesses = [];

    // Populate blanks and guesses with correct number of blanks

    for (var i = 0; i < numberOfBlanks; i++) {
        blanksAndGuesses.push(" __ ");
    }

    // Update HTML

    document.getElementById('wordToGuess').innerHTML = blanksAndGuesses.join(" ");
    document.getElementById('numGuesses').innerHTML = guessesLeft;
    document.getElementById('winCounter').innerHTML = winCount;
    document.getElementById('lossCounter').innerHTML = lossCount;

    console.log(numberOfBlanks);
    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(blanksAndGuesses)
}

function checkLetters(letter) {
    // Check if letter exists
    var letterInword = false;

    for (var i = 0; i < numberOfBlanks; i++) {
        if (selectedWord[i] === letter) {
            letterInword = true;
            console.log("Letter found!" + letterInword);
        }
    }

    // Check for letter in word. Remove blanks from word with letter

    if (letterInword) {
        for (var i = 0; i < numberOfBlanks; i++) {
            if (selectedWord[i] === letter) {
                blanksAndGuesses[i] = letter;
            }
        }
    }
    else {
        wrongGuesses.push(letter);
        guessesLeft--;
    }
    console.log(blanksAndGuesses);
}

function scoring () {
    console.log("Win Count:" + winCount + " | Loss count: " + lossCount + " | Guesses Left: " + guessesLeft);

    document.getElementById('numGuesses').innerHTML = guessesLeft;
    document.getElementById('wordToGuess').innerHTML = blanksAndGuesses.join(" ");
    document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(" ")
    //Check if user won
    if (lettersInWord.toString() === blanksAndGuesses.toString()) {
        winCount++;
        console.log("You won!");
        document.getElementById('winCounter').innerHTML = winCount;
        startGame();
    }
    //Check if user lost
    else if (guessesLeft === 0){
        lossCount++;
        console.log("You lost!");
        document.getElementById('lossCounter').innerHTML = lossCount;
        startGame();
    }
}
// MAIN PROCESS
//===================================================================

// Start game and resets game
startGame();

// Get user key press

document.onkeyup = function (event) {
    letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed)
    scoring();
    console.log(letterGuessed);
}