//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameOver = false;

const winningCombos = [
  ["1","2","3"],
  ["4","5","6"],
  ["7","8","9"],
  ["1","4","7"],
  ["2","5","8"],
  ["3","6","9"],
  ["1","5","9"],
  ["3","5","7"]
];

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (!player1 || !player2) return;

  document.getElementById("setup").style.display = "none";
  document.querySelector(".board").style.display = "grid";

  currentPlayer = player1;
  document.querySelector(".message").innerText = `${currentPlayer}, you're up`;
});

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.innerText || gameOver) return;

    cell.innerText = currentSymbol;

    if (checkWinner()) {
      document.querySelector(".message").innerText =
        `${currentPlayer}, congratulations you won!`;
      gameOver = true;
      return;
    }

    currentSymbol = currentSymbol === "X" ? "O" : "X";
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    document.querySelector(".message").innerText =
      `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    if (
      document.getElementById(a).innerText &&
      document.getElementById(a).innerText ===
      document.getElementById(b).innerText &&
      document.getElementById(a).innerText ===
      document.getElementById(c).innerText
    ) {
      combo.forEach(id =>
        document.getElementById(id).classList.add("winner")
      );
      return true;
