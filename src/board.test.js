import board from './board';

it('The board is initially clear', () => {
  const emptyBoard = JSON.stringify(['_', '_', '_', '_', '_', '_', '_', '_', '_']);
  expect(JSON.stringify(board.getState())).toBe(emptyBoard);
});
