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
    let winner = -1;
    if (state[0] === state[1] && state[1] === state[2] && state[0] !== '_') {
      winner = 0;
    } else if (state[3] === state[4] && state[4] === state[5] && state[3] !== '_') {
      winner = 3;
    } else if (state[6] === state[7] && state[7] === state[8] && state[6] !== '_') {
      winner = 6;
    }
    return winner;
  };

  const getColumnWinner = () => {
    let winner = -1;
    if (state[0] === state[3] && state[3] === state[6] && state[0] !== '_') {
      winner = 0;
    } else if (state[1] === state[4] && state[4] === state[7] && state[1] !== '_') {
      winner = 1;
    } else if (state[2] === state[5] && state[5] === state[8] && state[2] !== '_') {
      winner = 2;
    }
    return winner;
  };

  const getDiagonalWinner = () => {
    let winner = -1;
    if (state[0] === state[4] && state[4] === state[8] && state[0] !== '_') {
      winner = 0;
    } else if (state[2] === state[4] && state[4] === state[6] && state[2] !== '_') {
      winner = 2;
    }
    return winner;
  };

  const getWinner = () => {
    const rw = getRowWinner();
    if (rw >= 0) {
      console.log(`${state[rw]} won`);
      return;
    }
    const cw = getColumnWinner();
    if (cw >= 0) {
      console.log(`${state[cw]} won`);
      return;
    }
    const dw = getDiagonalWinner();
    if (dw >= 0) {
      console.log(`${state[dw]} won`);
      return;
    }
    if (state.indexOf('_') > -1) {
      console.log('Game ongoing');
      return;
    }
    console.log('Draw');
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

  return { getState, update, nextSymbol, getWinner };
})());

const controller = ((() => {
  const fillBoard = () => {
    let row = 0;
    let col = 0;
    for (let i = 0; i < 9; i += 1) {
      row = Math.floor(i / 3) + 1;
      col = (i % 3) + 1;
      const query = `.row${row} .col${col} span`;
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

  return { fillBoard };
})());

controller.fillBoard();

const gameBoard = document.querySelector('#board-container');
gameBoard.addEventListener('click', event => {
  const element = event.target.closest('div');
  const col = parseInt(element.classList[1].match(/\d/)[0], 10) - 1;
  const row = parseInt(element.parentElement.classList[1].match(/\d/)[0], 10) - 1;
  board.update(row, col);
  controller.fillBoard();
  board.getWinner();
});
