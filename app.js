const board = ((() => {
  let state = '_________';

  const isPositionEmpty = (index) => state.charAt(index) === '_';

  const update = (row, col, symbol) => {
    const boardIndex = row * 3 + col;
    if (isPositionEmpty(boardIndex)) {
      if (boardIndex === 0) {
        state = symbol.concat(state.slice(1, 9));
      } else if (boardIndex === 8) {
        state = state.slice(0, 8)
          .concat(symbol);
      } else {
        state = state
          .slice(0, boardIndex)
          .concat(symbol)
          .concat(state.slice(boardIndex + 1, -1));
      }
    }
  };

  const getState = () => state.slice(0, 3)
    .concat(';')
    .concat(state.slice(3, 6))
    .concat(';')
    .concat(state.slice(6, 9));

  return { getState, update };
})());
