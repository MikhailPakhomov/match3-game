import { checkMatches } from "./checkMatches";
import { removeMatches } from "./removeMatches";
import { fillEmptySpaces } from "./fillEmptySpaces";

export const processBoard = (inputBoard) => {
    let boardCopy = [...inputBoard.map(row => [...row])];
    let hasMatches = true;

    while (hasMatches) {
      const matches = checkMatches(boardCopy);
      if (matches.length === 0) {
        hasMatches = false;
      } else {
        boardCopy = removeMatches(boardCopy, matches);
        boardCopy = fillEmptySpaces(boardCopy);
      }
    }

    return boardCopy;
  };