function resetGameStatus() {
    activePlayer = 0;
    gameIsOver = false;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = 
    'Congratulations <span id="winner-name">Player Name</span>, You Won!';
    gameOverElement.style.display = 'none';

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
        }
    }

    for(const gameFieldElement of gameFieldElements) {
        gameFieldElement.textContent = '';
        gameFieldElement.classList.remove('disabled');
    }
}

function startNewGame() {
    if (!players[0].name || !players[1].name) {
        alert('Please set names for both players!')
        return;
    }

    resetGameStatus();
    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}


function selectGameField(event) {
    // if(event.target.tagName !== 'LI') {
    //     return;
    // }

    if(gameIsOver) {
        return;
    }

    const selectedField = event.target;
    const selectedColumn = +selectedField.dataset.col;
    const selectedRow = +selectedField.dataset.row;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('Please select an empty field!')
        return;
    }

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disabled');


    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    
    const winnerId = checkForGameOver();
    if(winnerId !== 0) {
        endGame(winnerId);
        return;
    }

    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
    // Row check
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 && 
            gameData[i][0] == gameData[i][1] && 
            gameData[i][1] == gameData[i][2]) {
            return gameData[i][0];
        }
    }

    // Column check
    for (let i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 && 
            gameData[0][i] == gameData[1][i] && 
            gameData[1][i] == gameData[2][i]) {
            return gameData[0][i];
        }
    }

    // Diagonal Check
    if (gameData[0][0] > 0 && 
        gameData[0][0] == gameData[1][1] && 
        gameData[1][1] == gameData[2][2]) {
        return gameData[0][0];
    }
    if (gameData[0][2] > 0 && 
        gameData[0][2] == gameData[1][1] && 
        gameData[1][1] == gameData[2][0]) {
        return gameData[0][2];
    }

    if(currentRound === 9) {
        return -1;
    }

    return 0;
}

function endGame(winnerId) {
    gameOverElement.style.display = 'block';
    gameIsOver = true;

    if(winnerId > 0) {
        const winnerName = players[winnerId-1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!';
    }
}