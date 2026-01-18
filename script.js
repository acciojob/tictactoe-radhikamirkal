let p1 = "";
let p2 = "";
let turn = "x";
let currentPlayer = "";
let gameOver = false;

const wins = [
  ["1","2","3"],
  ["4","5","6"],
  ["7","8","9"],
  ["1","4","7"],
  ["2","5","8"],
  ["3","6","9"],
  ["1","5","9"],
  ["3","5","7"]
];

document.getElementById("submit").addEventListener("click", function () {
  p1 = document.getElementById("player1").value;
  p2 = document.getElementById("player2").value;

  currentPlayer = p1;
  document.querySelector(".message").innerText =
    `${currentPlayer}, you're up`;
});

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", function () {
    if (cell.innerText || gameOver) return;

    cell.innerText = turn;

    if (checkWin()) {
      document.querySelector(".message").innerText =
        `${currentPlayer} congratulations you won!`;
      gameOver = true;
      return;
    }

    turn = turn === "x" ? "o" : "x";
    currentPlayer = currentPlayer === p1 ? p2 : p1;

    document.querySelector(".message").innerText =
      `${currentPlayer}, you're up`;
  });
});

function checkWin() {
  return wins.some(combo => {
    const [a,b,c] = combo;
    return (
      document.getElementById(a).innerText &&
      document.getElementById(a).innerText === document.getElementById(b).innerText &&
      document.getElementById(a).innerText === document.getElementById(c).innerText
    );
  });
}
