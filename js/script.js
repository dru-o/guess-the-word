const guessedLetterss = document.querySelector (".guessed-letters");
const guessButton = document.querySelector (".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "mangolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function(){
const response = await fetch( "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"); 
const words = await response.text();
const wordArray = words.split("\n");
const randomIndex =  Math.floor(Math.random() * wordArray.length);
word = wordArray[randomIndex].trim();
placeholder(word);
};

// Fire off the game.
getWord();

// Display symbols as placeholders for the chosen word's letters
const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


guessButton.addEventListener("click", function (e){
    e.preventDefault();
      // Empty message paragraph
      message.innerText = "";
      // Let's grab what was entered in the input
const guess = letterInput.value;
 // Let's make sure that it is a single letter
const goodGuess = validateInput(guess);
    if (goodGuess){
    // We've got a letter! Let's guess!
        makeGuess(guess);
    }
letterInput.value = "";
});

const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        //Is the input empty?
        message.innerText = "Please enter a letter.";

    }else if (input.length > 1){
        //Did you type more than one letter?
        message.innerText = "Please enter a single letter."
    }else if (!input.match(acceptedLetter)){
        //Did you type a number, a special character or some other non letter thing?
        message.innerText = "Please enter a letter from A to Z."

    }else{
        //we finally got a single letter!!
    return input;
    }
};

const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You already guessed that letter, silly. Try Again.";
    }else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    countRemaining(guess);
    alreadyGuessed();
    updateWord(guessedLetters);
    }
};

const alreadyGuessed = function (){
     // Clear the list first
    guessedLetterss.innerHTML = "";
    for  (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetterss.append(li);
    }
};

const updateWord = function(guessedLetters){
const wordUpper = word.toUpperCase();
const wordArray = wordUpper.split("");
const showWord = [];
for (const letter of wordArray){

if (guessedLetters.includes(letter)){
    showWord.push(letter.toUpperCase());

}else{
    showWord.push("●");
}
}
wordInProgress.innerText = showWord.join("");
checkIfWon();
};

const countRemaining = function (guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    }else{
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
    
    if (remainingGuesses === 0){
        message.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`;
        startOver();
    }else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    }else{
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }

};

const checkIfWon = function(){
if (word.toUpperCase() === wordInProgress.innerText){
    message.classList.add("win");
    message.innerHTML =  `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    
    startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLetterss.classList.add("hide");
    playAgain.classList.remove("hide");
  };
  
  playAgain.addEventListener("click", function () {
    // reset all original values - grab new word
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLetterss.innerHTML = "";
    message.innerText = "";
    // Grab a new word
    getWord();
  
    // show the right UI elements
    guessButton.classList.remove("hide");
    playAgain.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLetterss.classList.remove("hide");
  });

