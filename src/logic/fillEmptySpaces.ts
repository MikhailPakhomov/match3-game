
import { FIELD_SIZE } from "./constants";
import { getRandomElement } from "./getRandomElement";

export const fillEmptySpaces = (board) => {
  let changed;
  do {
    changed = false;
    for (let x = 0; x < FIELD_SIZE; x++) {
      for (let y = FIELD_SIZE - 1; y > 0; y--) {
        if (!board[y][x] && board[y - 1][x]) {
          board[y][x] = board[y - 1][x];
          board[y - 1][x] = null;
          changed = true;
        }
      }
      if (!board[0][x]) {
        board[0][x] = getRandomElement();
        changed = true;
      }
    }
  } while (changed);
  return board;
};