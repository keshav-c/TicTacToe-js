import board from './board';

it('The board is initially clear', () => {
  const emptyBoard = JSON.stringify(['_', '_', '_', '_', '_', '_', '_', '_', '_']);
  expect(JSON.stringify(board.getState())).toBe(emptyBoard);
});

it('Updates the board', () => {
  board.update(1, 1);
  const newState = JSON.stringify(['_', '_', '_', '_', 'X', '_', '_', '_', '_']);
  expect(JSON.stringify(board.getState())).toBe(newState);
});

it('Does not update the board in the same position', () => {
  board.update(1, 1);
  board.update(1, 1);
  const state = JSON.stringify(['_', '_', '_', '_', 'O', '_', '_', '_', '_']);
  expect(JSON.stringify(board.getState())).not.toBe(state);
});

it('Returns winning Sequence', () => {
  board.setState(['X', 'X', 'X', '_', '_', '_', '_', '_', '_']);
  const returnedSequence = JSON.stringify(board.getWinner());
  const expectedSequence = JSON.stringify([0, 1, 2]);
  expect(returnedSequence).toBe(expectedSequence);
});

it('Identifies drawn match', () => {
  board.setState(['O', 'X', 'X', 'X', 'O', 'O', 'X', 'O', 'X']);
  const returnedSequence = JSON.stringify(board.getWinner());
  const expectedSequence = JSON.stringify(['D']);
  expect(returnedSequence).toBe(expectedSequence);
});
