const submit = document.getElementById("submit");
const setup = document.getElementById("setup");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let current = "X";
let gameActive = true;

const wins = [
    ["1","2","3"],["4","5","6"],["7","8","9"],
    ["1","4","7"],["2","5","8"],["3","6","9"],
    ["1","5","9"],["3","5","7"]
];

submit.onclick = () => {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;

    setup.classList.add("hidden");
    game.classList.remove("hidden");

    message.textContent = `${player1}, you're up`;
};

cells.forEach(cell=>{
    cell.addEventListener("click",()=>{
        if(cell.textContent || !gameActive) return;

        cell.textContent = current;

        const winPattern = checkWin();

        if(winPattern){
            const winner = current==="X" ? player1 : player2;
            message.textContent = `${winner}, congratulations you won!`;
            gameActive = false;

            // highlight winning cells
            winPattern.forEach(id=>{
                document.getElementById(id).classList.add("winner");
            });

            return;
        }

        current = current==="X" ? "O" : "X";

        message.textContent = current==="X"
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