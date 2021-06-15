const guessedLetterss = document.querySelector (".guessed-letters");
const guess = document.querySelector (".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = mangolia;
const guessedLetters = [];

// Display symbols as placeholders for the chosen word's letters
const palceholder = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

guessButton.addEventListener("click", function (e){
    e.preventDefault();
      // Empty message paragraph
      message.innerText = "";
      // Let's grab what was entered in the input
const valueOfInput = letterInput.value;
 // Let's make sure that it is a single letter
const goodGuess = validateInput(guess);
    if (goodGuess){
    // We've got a letter! Let's guess!
        makeGuess(guess);
    }
letterInput.value = "";
});

const validate = function (input){
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
    guess = guess.toUppercase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You already guessed that letter, silly. Try Again.";
    }else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    alreadyGuessed();
    updateWordInProgress(guessedLetters);
    }
};

const alreadyGuessed = function (){
     // Clear the list first
    guessedLetterss.innerHTML = "";
    for  (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    }
};

const updateWord = function(guessedLetters){
const wordUpper = word.toUppercase();
const wordArray = wordUpper.split("");
const showWord = [];
for (const letter of wordArray){

if (guessedLetters.includes(letter)){
    updateWord.push(letter.toUppercase());

}else{
    updateWord.push("●");
}
}
wordInProgress.innerText = updateWord.join("");
chackIfWon();
};

const checkIfWon = function(){
if (word.toUppercase() === wordInProgress.innerText){
    message.classList.add("win");
    message.innerHTML =  `<p class="highlight">You guessed the correct word! Congrats!</p>`;
}
};