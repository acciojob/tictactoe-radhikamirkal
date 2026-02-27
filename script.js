const submit = document.getElementById("submit");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let current = "x";
let gameActive = true;
let started = false;

const wins = [
    ["1","2","3"],["4","5","6"],["7","8","9"],
    ["1","4","7"],["2","5","8"],["3","6","9"],
    ["1","5","9"],["3","5","7"]
];

submit.addEventListener("click", () => {
    player1 = document.getElementById("player1").value || "Player1";
    player2 = document.getElementById("player2").value || "Player2";

    started = true;

    document.getElementById("setup").style.display = "none";   // ⭐ FIX

    message.textContent = `${player1}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener("click", () => {

        if(!started) return;
        if(cell.textContent || !gameActive) return;

        cell.textContent = current;

        const winPattern = checkWin();

        if(winPattern){
            const winner = current === "x" ? player1 : player2;
            message.textContent = `${winner} congratulations you won!`;
            gameActive = false;
            return;
        }

        current = current === "x" ? "o" : "x";

        message.textContent = current === "x"
            ? `${player1}, you're up`
            : `${player2}, you're up`;
    });
});

function checkWin(){
    for(let pattern of wins){
        if(pattern.every(id =>
            document.getElementById(id).textContent === current
        )){
            return pattern;
        }
    }
    return null;
}