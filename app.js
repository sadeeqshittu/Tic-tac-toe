
let gameBoard;
let newDiv;
let col;
let player = 'X';
let container = document.querySelector('.container');
let cells;
let isFilled = false;
let winnerFound = false;
let isDraw = false
let winingCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]

    ];
let playerCombo = [];
let aiCombo = [];


function generateGrid(n) {
	container = document.querySelector('.container');
	let counter = 0;

	for (let i = 0; i < n; i++) {
		newDiv = document.createElement('div');
		newDiv.className = "tile";
		container.appendChild(newDiv);

		for (let j = 0; j < n - 1; j++){
			col = document.createElement('div');
			col.className = "tile";
			container.appendChild(col);

		}

	}	
}


function init() {
	gameBoard = Array.from(Array(9).keys());
     initializeCellId();
}


// adds click events to each cell on game grid.
function initializeCellId() {
	cells = document.querySelectorAll('.tile');
	let counter = 0;
    for (let i = 0; i < cells.length; i++) {
    	cells[i].id = counter++;
    	cells[i].addEventListener('click', switchPlayer, {once: true});
    }
}

   


function switchPlayer(cell) {
     turn(cell.target.id, player);
}

function turn(cellID, mark) {
	//we need to place mark on game board.
	//we need to switch
    //check for winner and endgame;
    //check for draw and endgame;
     gameBoard[cellID] = mark;
     checkWinner();
     swap(cellID);
     document.getElementById(cellID).innerText = mark;
    
     
}

function swap(cellID) {
	if(player == 'X') {
        player = 'O';
        isFilled = true;
        document.getElementById(cellID).innerText = 'O';
    } else if(player == 'O') {
        player = 'X';
        isFilled = true;
        document.getElementById(cellID).innerText = 'X';
    } else {isFilled = false;}
}

function checkWinner() {

   for (let i = 0; i < winingCombo.length; i++) {
        let combos = winingCombo[i];
        let p1 = gameBoard[combos[0]];
        let p2 = gameBoard[combos[1]];
        let p3 = gameBoard[combos[2]];

        if (p1 == p2 && p2 == p3 && p3 == p1) {
            alert(`${player} has won the game!`);
            winnerFound = true;
        }
   }
   reset();
   return winnerFound;
}

function checkDraw(draw) {
    if (winnerFound === false && isFilled === true) {
        draw = true;
        alert(`we have a draw!`);
    } 
}

function reset() {
    if (winnerFound) {
        document.querySelectorAll('.tile').forEach((current) => {
        current.innerText = '';
    });
    }
    
    isFilled = false;
    winnerFound = false;
    isDraw = false;

}

generateGrid(3);
init();
