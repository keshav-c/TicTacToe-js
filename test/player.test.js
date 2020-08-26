import newPlayer from '../src/player';

it('Creates new player with name and score 0', () => {
  const player = newPlayer('player1', 1);
  expect(player.getName()).toBe('player1');
  expect(player.getScore()).toBe(0);
});

it('increaments score', () => {
  const player = newPlayer('player1', 1);
  player.incrementScore();
  expect(player.getScore()).toBe(1);
});

it('resets player', () => {
  const player = newPlayer('Iryn', 1);
  player.incrementScore();
  player.incrementScore();
  player.resetPlayer('Keshav');
  expect(player.getName()).toBe('Keshav');
  expect(player.getScore()).toBe(0);
});