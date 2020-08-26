import newPlayer from './player';

it('Creates new player with name and score 0', () => {
  const player = newPlayer('player1', 1);
  expect(player.getName()).toBe('player1');
  expect(player.getScore()).toBe(0);
});