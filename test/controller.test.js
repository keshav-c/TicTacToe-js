import controller from '../src/controller';
import board from '../src/board';


it('checks for game over', () => {
  board.setState(['X', 'O', 'O', '_', 'X', '_', '_', '_', '_']);
  expect(controller.isGameOver()).toBe(false);
  board.setState(['X', 'O', 'O', '_', 'X', '_', '_', '_', 'X']);
  expect(controller.isGameOver()).toBe(true);
});

it('gets the correct winner', () => {
  board.setState(['X', 'O', 'O', '_', 'X', '_', '_', '_', 'X']);
  controller.isGameOver();
  expect(controller.getWinner()).toBe('X');
  board.setState(['O', 'O', 'O', '_', 'X', '_', '_', '_', 'X']);
  controller.isGameOver();
  expect(controller.getWinner()).toBe('O');
});

it('gets the correct winning sequencee', () => {
  board.setState(['X', 'O', 'O', '_', 'X', '_', '_', '_', 'X']);
  controller.isGameOver();
  const returnedWinSequence = JSON.stringify(controller.getWinningSequence());
  const expectedWinSequence = JSON.stringify([0, 4, 8]);
  expect(returnedWinSequence).toBe(expectedWinSequence);
});

it('updates scoreboard correctly', () => {
  const oldScore = controller.getPlayerInfo().player1.score;
  expect(oldScore).toBe(0);
  controller.updateScoreBoard('X');
  const newScore = controller.getPlayerInfo().player1.score;
  expect(newScore).toBe(1);
});
