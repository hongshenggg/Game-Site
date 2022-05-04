const userChoiceDisplay = document.getElementById("userChoice");
const computerChoiceDisplay = document.getElementById("computerChoice");
const resultDisplay = document.getElementById("resultDisplay");
const yourScoreDisplay = document.querySelector(".yourScore");
const computerScoreDisplay = document.querySelector(".computerScore");
const totalTriesDisplay = document.querySelector(".totalTries");
let yourScore = 0;
let computerScore = 0;
let totalTries = 0;
let userChoice;
let computerChoice;

const possibleChoices = document.querySelectorAll("button");
possibleChoices.forEach(choice => choice.addEventListener('click', handleClick));

function handleClick(e) {
  userChoice = e.target.textContent.trim();
  userChoiceDisplay.innerText = userChoice;
  generateComputerChoice();
  resultDisplay.innerText = getResult();
}

function generateComputerChoice() {
  const randomNum = Math.floor(Math.random() * possibleChoices.length);
  computerChoice = possibleChoices.item(randomNum).textContent.trim();
  computerChoiceDisplay.innerText = computerChoice;
}

function getResult() {
  totalTries++;
  totalTriesDisplay.innerText = totalTries;
  if (computerChoice === userChoice) {
    return "It's a draw!";
  } else if ((computerChoice === "Rock" && userChoice === "Paper") 
  || (computerChoice === "Paper" && userChoice === "Scissors") 
  || (computerChoice === "Scissors" && userChoice === "Rock")) {
    yourScore++;
    yourScoreDisplay.innerText = yourScore;
    return "You win!";
  } else {
    computerScore++;
    computerScoreDisplay.innerText = computerScore;
    return "Computer wins!";
  }
}