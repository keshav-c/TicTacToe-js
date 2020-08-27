import './styles.css';

import board from './board';
import controller from './controller';

const gameBoard = document.querySelector('#board-container');
const newGameBtn = document.querySelector('#newgame');
const resetBtn = document.querySelector('#reset');

// eslint-disable-next-line no-unused-vars
resetBtn.addEventListener('click', (event) => {
  board.reset();
  controller.fillBoard();
});

const scoreboardNameUpdater = (event) => {
  const playerNum = Number(event.target.id.match(/\d/));
  const name = event.target.value;
  controller.changePlayer(name, playerNum);
};

const p1Input = document.forms['player-name'].querySelector('#p1');
p1Input.addEventListener('keyup', scoreboardNameUpdater);
const p2Input = document.forms['player-name'].querySelector('#p2');
p2Input.addEventListener('keyup', scoreboardNameUpdater);

const nextMove = (event) => {
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
    controller.updateScoreBoard(winner);
    controller.fillScoreBoard();
    if (winner === 'D') {
      resultMessage.textContent = 'Draw.';
    } else {
      controller.highlightWinningCells();
      resultMessage.textContent = `${winner} won!`;
    }
    resultBox.appendChild(resultMessage);
    gameBoard.removeEventListener('click', nextMove);
    newGameBtn.style.display = 'block';
    resetBtn.style.display = 'none';
  } else {
    newGameBtn.style.display = 'none';
    resetBtn.style.display = 'block';
  }
};

// eslint-disable-next-line no-unused-vars
newGameBtn.addEventListener('click', (event) => {
  board.reset();
  controller.fillBoard();
  gameBoard.addEventListener('click', nextMove);
  const resultBox = document.querySelector('#result');
  const resultMessage = document.querySelector('#result h2');
  resultBox.removeChild(resultMessage);
  newGameBtn.style.display = 'none';
  resetBtn.style.display = 'block';
});

gameBoard.addEventListener('click', nextMove);

controller.fillBoard();
