const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const gameDiv = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let board = Array(9).fill("");

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  if (!player1 || !player2) return;

  playerForm.style.display = "none";
  gameDiv.style.display = "block";

  currentPlayer = player1;
  messageDiv.innerText = `${currentPlayer}, you're up`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (board[index] !== "") return;

    board[index] = currentSymbol;
    cell.innerText = currentSymbol;

    if (checkWin()) {
      messageDiv.innerText = `${currentPlayer} congratulations you won!`;
      highlightWin();
      return;
    }

    if (currentSymbol === "x") {
      currentSymbol = "o";
      currentPlayer = player2;
    } else {
      currentSymbol = "x";
      currentPlayer = player1;
    }

    messageDiv.innerText = `${currentPlayer}, you're up`;
  });
});

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === currentSymbol)
  );
}

function highlightWin() {
  winPatterns.forEach(pattern => {
    if (pattern.every(i => board[i] === currentSymbol)) {
      pattern.forEach(i => cells[i].classList.add("win"));
    }
  });
}
