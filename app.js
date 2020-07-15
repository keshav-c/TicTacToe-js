const board = (() => {
  const state = '_________';

  const isPositionEmpty = function(index) {
    return state.charAt(index) === '_';
  };

  const update = function(row, col, symbol) {
    const boardIndex = row * 3 + col;
    if (this.isPositionEmpty(boardIndex)) {
      if (boardIndex === 0) {
        this.state = symbol.concat(this.state.slice(1, 9));
      } else if (boardIndex === 8) {
        this.state = this.state.slice(0,8).concat(symbol);
      } else {
        this.state = this.state.slice(0, boardIndex).concat(symbol).concat(boardIndex + 1, -1);
      }
    }
  }

  return { update };

} () );