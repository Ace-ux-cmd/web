const board = document.getElementById("board");
const startBtn = document.getElementById("startBtn");
const difficultySelect = document.getElementById("difficulty");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resultDiv = document.getElementById("result");

let secret = "";
let digits = 4;
let tries = 10;
let currentTry = 0;

function createBoard(digits, tries) {
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${digits}, 40px)`;
  for (let row = 0; row < tries; row++) {
    for (let col = 0; col < digits; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      board.appendChild(cell);
    }
  }
}

function generateSecret(digits) {
  const numbers = "0123456789".split("");
  let secret = "";
  for (let i = 0; i < digits; i++) {
    const index = Math.floor(Math.random() * numbers.length);
    secret += numbers.splice(index, 1)[0];
  }
  return secret;
}

function checkGuess(secret, guess) {
  let correctPositions = 0;
  let correctDigits = 0;
  
  let secretCopy = secret.split("");
  
for (let i = 0; i < secret.length; i++) {
  if (secret[i] == guess[i]) correctPositions++
}
// Step 2: count correct digits (anywhere in secret, but avoid double-counting)
for (let i = 0; i < secret.length; i++) {
  if (secret.includes(guess[i])) correctDigits++
}
return { correctDigits, correctPositions };

  }
  
function fillRow(guess, result) {
  const rowStart = currentTry * digits;
  for (let i = 0; i < digits; i++) {
    const cell = board.children[rowStart + i];
    cell.textContent = guess[i];
    if (guess[i] === secret[i]) {
      cell.classList.add("correct-position");
    } else if (secret.includes(guess[i])) {
      cell.classList.add("correct-digit");
    }
  }
}

startBtn.addEventListener("click", () => {
  [digits, tries] = difficultySelect.value.split("-").map(Number);
  createBoard(digits, tries);
  secret = generateSecret(digits);
  currentTry = 0;
  resultDiv.innerHTML = "";
  guessInput.value = "";
  console.log("Secret:", secret);
  document.getElementById("diffContainer").style.display="none"
  document.getElementById("guessContainer").style.display="block"
  document.getElementById("restart").style.display="block"
});

document.getElementById("restart").addEventListener("click", () => {
  if(confirm ("Are you sure you want to restart? Warning: This will overwrite your current Game")){
      document.getElementById("diffContainer").style.display="block"
  document.getElementById("guessContainer").style.display="none"
  document.getElementById("restart").style.display="none"
  }
  document.getElementById("board").style.display="none"
})

guessBtn.addEventListener("click", () => {
  const guess = guessInput.value.trim();
  if (guess.length !== digits) {
    alert(`Enter exactly ${digits} digits`);
    return;
  }
  if (currentTry >= tries) {
    alert("No more tries left!");
    return;
  }
  
  const result = checkGuess(secret, guess);
  fillRow(guess, result);
  currentTry++;
  
  if (result.correctPositions === digits) {
    resultDiv.innerHTML = `🎉 Congratulations! You guessed the number ${secret} in ${currentTry} tries.`;
    guessInput.disabled = true;
    guessBtn.disabled = true;
  } else if (currentTry === tries) {
    resultDiv.innerHTML = `💀 Game over! The secret number was ${secret}.`;
  } else {
    resultDiv.innerHTML = `Correct digits: ${result.correctDigits}, Correct positions: ${result.correctPositions}`;
  }
  
  guessInput.value = "";
  guessInput.focus();
});
