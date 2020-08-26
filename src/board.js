const board = ((() => {
  let state = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

  const reset = () => {
    state = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
  };

  const setState = (newState) => {
    state = newState;
  };

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
    getState,
    setState,
    update,
    nextSymbol,
    getWinner,
    reset,
  };
})());

export default board;