const statusDisplay = document.querySelector('.game-status');
//we will use gameactive to pause the game in case of an end scenario
let gameActive = true; 

//we will store our current player here
let currentPlayer = "X";

//we will store our game status here

let gameState = ["","","","","","","","",""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => 'Game ended in a draw!';
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//we set the initial message to let the player know whose turn it is

statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell,clickCellIndex){
gameState[clickCellIndex] = currentPlayer;
clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChanged(){
currentPlayer = currentPlayer === "X" ? "O" : "X";
statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation(){
let roundWon = false;
for(let i=0; i<=7; i++){
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if(a === '' || b === '' || c === ''){
        continue;
    }
    if(a === b && b === c){
        roundWon = true;
        break
    }
}
if(roundWon){
    statusDisplay.innerHTML  =winningMessage();
    gameActive  = false;
    return;
}

let roundDraw = !gameState.includes("");
if(roundDraw){
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
}


handlePlayerChanged();
}
function handleCellClick(clickedCellEvent){

    const clickedCell = clickedCellEvent.target;
    const clickCellIndex  = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    if(gameState[clickCellIndex] !== "" || !gameActive){
        return;
    }
    handleCellPlayed(clickedCell,clickCellIndex);
    handleResultValidation();
}
function handleRestartGame(){
gameActive = true;
currentPlayer = "X";
gameState = ["","","","","","","","",""];
statusDisplay.innerHTML = currentPlayerTurn();
document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");

}

//and finally we add our event listeners to the actual game cells

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click',handleCellClick));
document.querySelector('.game-restart').addEventListener('click',handleRestartGame);

