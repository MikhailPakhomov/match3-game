
export const removeMatches = (board, matches) => {
    matches.forEach(([y, x]) => (board[y][x] = null));
    return board;
  };