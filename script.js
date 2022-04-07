'use strict'

// Game data structures
const X = Symbol("X");
const O = Symbol("O");
const EMPTY = Symbol("EMPTY");

const startingState = new Map([
    [0, EMPTY],
    [1, EMPTY],
    [2, EMPTY],
    [3, EMPTY],
    [4, EMPTY],
    [5, EMPTY],
    [6, EMPTY],
    [7, EMPTY],
    [8, EMPTY],
]);

const winningIds = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

const playerToSymbolMap = new Map([
    [0, X],
    [1, O]
]);

let currentPlayer = 0;
let currentState = new Map(startingState);

// DOM variables
const gridContainer = document.querySelector('.grid-container');
const newGameButton = document.getElementById('btn-new');
const squares = [];

// Functions
function switchPlayer() {
    currentPlayer = currentPlayer === 0? 1 : 0;
}

function isSquareFilled(square) {
    return square.classList.contains('filled')
}

function displaySquareImage(square, currentPlayer) {
    square.src = `player-${currentPlayer}.png`;
}

// This function returns a new immutable game state after a player places their symbol in a square
function generateStateAfterPlacement(squareId, currentPlayer, currentState) {

    const resultState = new Map(currentState);

    for (const key of resultState.keys()) {
        if (key === Number(squareId)) {
            resultState.set(key, playerToSymbolMap.get(currentPlayer));
        }
    }

    return resultState;
}

// winnerX, winnerO, draw, noWinner
function evaluateState(currentState) {
    let resultString = '';
    for (const winningSet of winningIds) {

        if (
            currentState.get(winningSet[0]) === X &&
            currentState.get(winningSet[1]) === X &&
            currentState.get(winningSet[2]) === X) {

            resultString = 'Player X won!';

        } else if (
            currentState.get(winningSet[0]) === O &&
            currentState.get(winningSet[1]) === O &&
            currentState.get(winningSet[2]) === O) {

            resultString = 'Player O won!';
        }

    }

    return resultString;
}

for (let i = 0; i < 9; i++) {
    squares[i] = document.createElement('img');
    squares[i].classList.add('square');

    // Mark each square with its position
    // Coordinate system origin (0, 0) is top-left corner
    // X-axis values increment from left to right
    // Y-axis values increment from top to down
    squares[i].setAttribute('square-id', `${i}`);
    console.log(squares[i].getAttribute('square-id'));
    gridContainer.appendChild(squares[i]);

    squares[i].addEventListener('click', () => {
        if (!isSquareFilled(squares[i])) {
            displaySquareImage(squares[i], currentPlayer);
            squares[i].classList.add('filled');

            // Game logic starts here
            // Update the game state based on the symbol that was placed and its location on the board
            currentState = new Map(generateStateAfterPlacement(
                squares[i].getAttribute('square-id'),
                currentPlayer,
                currentState
            ));

            console.log(currentState);
            // Check if newly-placed symbol wins the game
            console.log(evaluateState(currentState));


            // Otherwise, switch player
            switchPlayer();
        }
    });
}

newGameButton.addEventListener('click', () => {
    currentPlayer = 0;

    for (const square of squares) {
        square.classList.remove('filled');
        square.src = 'empty.png';
    }
});



