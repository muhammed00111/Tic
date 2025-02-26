let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = false;

const gameBoard = document.getElementById('game-board');
const winnerPopup = document.getElementById('winner-popup');
const winnerText = document.getElementById('winner-text');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

function createCell(index) {
    const cell = document.createElement('div');
    cell.classList.add('cell', 'border', 'border-gray-400', 'flex', 'items-center', 'justify-center', 'text-4xl');
    cell.addEventListener('click', () => handleCellClick(index));
    gameBoard.appendChild(cell);
}

function handleCellClick(index) {
    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    renderBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            announceWinner(board[a]);
            return;
        }
    }

    if (!board.includes('')) {
        announceWinner('Draw');
    }
}

function announceWinner(winner) {
    isGameActive = false;
    winnerText.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`;
    winnerPopup.classList.remove('hidden');
}

function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    winnerPopup.classList.add('hidden');
    gameBoard.innerHTML = ''; // Clear the board
    for (let i = 0; i < 9; i++) {
        createCell(i);
    }
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
