const submitBtn = document.getElementById("submit");
const gameDiv = document.getElementById("game");
const formDiv = document.getElementById("player-form");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let board = Array(9).fill("");

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (!player1 || !player2) return;

  formDiv.style.display = "none";
  gameDiv.style.display = "block";

  currentPlayer = player1;
  messageDiv.innerText = `${currentPlayer}, you're up`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (board[index] !== "" || checkWinner()) return;

    board[index] = currentSymbol;
    cell.innerText = currentSymbol;

    if (checkWinner()) {
      messageDiv.innerText = `${currentPlayer} congratulations you won!`;
      highlightWinner();
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

function checkWinner() {
  return winningCombos.some(combo =>
    combo.every(index => board[index] === currentSymbol)
  );
}

function highlightWinner() {
  winningCombos.forEach(combo => {
    if (combo.every(index => board[index] === currentSymbol)) {
      combo.forEach(index => {
        cells[index].classList.add("win");
      });
    }
  });
}
