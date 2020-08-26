import board from './board';
import newPlayerInstance from './player';

const controller = ((() => {
  let winner;
  let winningSequence;
  const players = [newPlayerInstance('Player 1', 1), newPlayerInstance('Player 2', 2)];

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
      cell.style.color = 'black';
      if (currentSymbol === 'X' || currentSymbol === 'O') {
        cell.style.visibility = 'visible';
      } else {
        cell.style.visibility = 'hidden';
      }
      controller.fillScoreBoard();
    }
  };

  const highlightWinningCells = () => {
    if (winner === 'X' || winner === 'O') {
      winningSequence.forEach(cellNumber => {
        const row = Math.floor(cellNumber / 3) + 1;
        const col = (cellNumber % 3) + 1;
        const cell = document.querySelector(`.r${row}c${col} span`);
        cell.style.color = 'yellow';
      });
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

  const fillScoreBoard = () => {
    players.forEach(player => {
      const playerNameQuery = `.player${player.getId()}-name h3`;
      const playerNameElement = document.querySelector(playerNameQuery);
      playerNameElement.textContent = player.getName();
      const playerScoreQuery = `.player${player.getId()}-score h3`;
      const playerScoreElement = document.querySelector(playerScoreQuery);
      playerScoreElement.textContent = player.getScore();
    });
  };

  const updateScoreBoard = (winningChar) => {
    if (winningChar === 'X') {
      players[0].incrementScore();
    }
    if (winningChar === 'O') {
      players[1].incrementScore();
    }
  };

  const changePlayer = (name, playerNum) => {
    const player = players[playerNum - 1];
    player.resetPlayer(name);
    controller.fillScoreBoard();
  };

  const getWinner = () => winner;
  const getWinningSequence = () => winningSequence;

  return {
    fillBoard,
    isGameOver,
    getWinner,
    getWinningSequence,
    highlightWinningCells,
    changePlayer,
    fillScoreBoard,
    updateScoreBoard,
  };
})());

export default controller;
