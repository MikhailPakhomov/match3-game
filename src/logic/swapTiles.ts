
export const swapTiles = (board, [y1, x1], [y2, x2]) => {
    let newBoard = board.map((row) => [...row]);
    [newBoard[y1][x1], newBoard[y2][x2]] = [newBoard[y2][x2], newBoard[y1][x1]];
    return newBoard;
  };