import React, { useEffect, useState } from 'react';
import styles from './Level.module.css';

type Props = {};

const FIELD_SIZE: number = 8;
const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

const getRandomElement = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const generateField = () => {
  return Array.from({ length: FIELD_SIZE }, () =>
    Array.from({ length: FIELD_SIZE }, getRandomElement),
  );
};

const checkMatches = (board) => {
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

const removeMatches = (board, matches) => {
  matches.forEach(([y, x]) => (board[y][x] = null));
  return board;
};

const fillEmptySpaces = (board) => {
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

const swapTiles = (board, [y1, x1], [y2, x2]) => {
  let newBoard = board.map((row) => [...row]);
  [newBoard[y1][x1], newBoard[y2][x2]] = [newBoard[y2][x2], newBoard[y1][x1]];
  return newBoard;
};

const processBoard = (inputBoard) => {
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

const Level = (props: Props) => {
  const [board, setBoard] = useState(generateField);
  const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     let hasMatches = true;
//     let newBoard = [...board];

//     while (hasMatches) {
//       const matches = checkMatches(newBoard);
//       if (matches.length === 0) {
//         hasMatches = false;
//       } else {
//         newBoard = removeMatches(newBoard, matches);
//         newBoard = fillEmptySpaces(newBoard);
//       }
//     }

//     setBoard(newBoard);
//   }, [board]);

  const handleTileClick = (y, x) => {
    if (!selected) {
      setSelected([y, x]);
    } else {
      const [y1, x1] = selected;
      if ((Math.abs(y - y1) === 1 && x === x1) || (Math.abs(x - x1) === 1 && y === y1)) {
        const newBoard = swapTiles(board, [y1, x1], [y, x]);
        const matches = checkMatches(newBoard);
        if (matches.length > 0) {
            const processed = processBoard(newBoard);
          setBoard(processed);
        }
      }
      setSelected(null);
    }
  };

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: `repeat(${FIELD_SIZE}, 50px)`, gap: '10px' }}>
      {board.map((row, y) =>
        row.map((color, x) => (
          <div
            key={`${y}-${x}`}
            onClick={() => handleTileClick(y, x)}
            style={{
              width: 50,
              height: 50,
              borderRadius: '5px',
              backgroundColor: color,
              border:
                selected && selected[0] === y && selected[1] === x ? '2px solid white' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}></div>
        )),
      )}
    </div>
  );
};

export default Level;
