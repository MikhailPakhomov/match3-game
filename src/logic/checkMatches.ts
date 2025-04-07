import { FIELD_SIZE } from "./constants";

export const checkMatches = (board) => {
  let matches = [];

  // Проверяем горизонтальные совпадения
  for (let y = 0; y < FIELD_SIZE; y++) {
    for (let x = 0; x < FIELD_SIZE - 2; x++) {
      if (board[y][x] && board[y][x] === board[y][x + 1] && board[y][x] === board[y][x + 2]) {
        matches.push([y, x], [y, x + 1], [y, x + 2]);
      }
    }
  }

  // Проверяем вертикальные совпадения
  for (let x = 0; x < FIELD_SIZE; x++) {
    for (let y = 0; y < FIELD_SIZE - 2; y++) {
      if (board[y][x] && board[y][x] === board[y + 1][x] && board[y][x] === board[y + 2][x]) {
        matches.push([y, x], [y + 1, x], [y + 2, x]);
      }
    }
  }

  return matches;
};