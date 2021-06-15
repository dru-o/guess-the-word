const guessedLetters = document.querySelector (".guessed-letters");
const guess = document.querySelector (".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = mangolia;

const palceholder = function(){
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
const valueOfInput = letterInput.value;
console.log(valueOfInput);
letterInput.value = "";
});