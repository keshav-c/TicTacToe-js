/* eslint-disable prefer-destructuring */
const board = ((() => {
  let state = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

  const isPositionEmpty = (index) => state[index] !== 'X' && state[index] !== 'O';

  const nextSymbol = () => {
    let numX = 0;
    let numO = 0;
    state.forEach(symbol => {
      if (symbol === 'X') {
        numX += 1;
      }
      if (symbol === 'O') {
        numO += 1;
      }
    });
    const symbol = numX <= numO ? 'X' : 'O';
    return symbol;
  };

  const getRowWinner = () => {
    let winner = [];
    if (state[0] === state[1] && state[1] === state[2] && state[0] !== '_') {
      winner = [0, 1, 2];
    } else if (state[3] === state[4] && state[4] === state[5] && state[3] !== '_') {
      winner = [3, 4, 5];
    } else if (state[6] === state[7] && state[7] === state[8] && state[6] !== '_') {
      winner = [6, 7, 8];
    }
    return winner;
  };

  const getColumnWinner = () => {
    let winner = [];
    if (state[0] === state[3] && state[3] === state[6] && state[0] !== '_') {
      winner = [0, 3, 6];
    } else if (state[1] === state[4] && state[4] === state[7] && state[1] !== '_') {
      winner = [1, 4, 7];
    } else if (state[2] === state[5] && state[5] === state[8] && state[2] !== '_') {
      winner = [2, 5, 8];
    }
    return winner;
  };

  const getDiagonalWinner = () => {
    let winner = [];
    if (state[0] === state[4] && state[4] === state[8] && state[0] !== '_') {
      winner = [0, 4, 8];
    } else if (state[2] === state[4] && state[4] === state[6] && state[2] !== '_') {
      winner = [2, 4, 6];
    }
    return winner;
  };

  const getWinner = () => {
    let winningSequence;
    winningSequence = getRowWinner();
    if (winningSequence.length > 0) {
      return winningSequence;
    }
    winningSequence = getColumnWinner();
    if (winningSequence.length > 0) {
      return winningSequence;
    }
    winningSequence = getDiagonalWinner();
    if (winningSequence.length > 0) {
      return winningSequence;
    }
    if (state.indexOf('_') > -1) {
      winningSequence = [];
    } else {
      winningSequence = ['D'];
    }
    return winningSequence;
  };

  const update = (row, col) => {
    const boardIndex = row * 3 + col;
    if (isPositionEmpty(boardIndex)) {
      state = state
        .slice(0, boardIndex)
        .concat(nextSymbol())
        .concat(state.slice(boardIndex + 1, 9));
    }
  };

  const getState = () => state;

  return {
    getState, update, nextSymbol, getWinner,
  };
})());

const controller = ((() => {
  let winner;
  let winningSequence;

  const fillBoard = () => {
    let row = 0;
    let col = 0;
    for (let i = 0; i < 9; i += 1) {
      row = Math.floor(i / 3) + 1;
      col = (i % 3) + 1;
      const query = `.r${row}c${col} span`;
      const cell = document.querySelector(query);
      const currentSymbol = board.getState()[i];
      cell.textContent = currentSymbol;
      if (currentSymbol === 'X' || currentSymbol === 'O') {
        cell.style.visibility = 'visible';
      } else {
        cell.style.visibility = 'hidden';
      }
    }
  };

  const isGameOver = () => {
    winningSequence = board.getWinner();
    let finished = false;
    if (winningSequence.length === 1) {
      winner = 'D';
      finished = true;
    }
    if (winningSequence.length === 3) {
      winner = board.getState()[winningSequence[0]];
      finished = true;
    }
    return finished;
  };

  const getWinner = () => winner;
  const getWinningSequence = () => winningSequence;

  return {
    fillBoard, isGameOver, getWinner, getWinningSequence,
  };
})());

controller.fillBoard();

const gameBoard = document.querySelector('#board-container');
gameBoard.addEventListener('click', event => {
  const element = event.target.closest('div');
  let row;
  let col;
  [row, col] = element.classList[1].match(/\d/g);
  row = parseInt(row, 10) - 1;
  col = parseInt(col, 10) - 1;
  board.update(row, col);
  controller.fillBoard();
  if (controller.isGameOver()) {
    const resultBox = document.querySelector('#result');
    const resultMessage = document.createElement('h2');
    const winner = controller.getWinner();
    if (winner === 'D') {
      resultMessage.textContent = 'Draw';
    } else {
      resultMessage.textContent = `${winner} won the game!`;
    }
    resultBox.appendChild(resultMessage);
  }
});
