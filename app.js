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

  const win = (board) => {
    if row1 = 
    })
  };
  row1 = [0,1,2]
  row2 = [3,4,5]
  row3 = [6,7,8]
  col1 = [0, 3, 6]
  col2 = [1, 4, 7]
  col3 = [2, 5, 8]
  diagonal1 = [0,4,8]
  diagonal2 = [2,4,6]
  



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

  return { getState, update, nextSymbol };
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
});
