import React, { useEffect, useState } from 'react';
import styles from './Level.module.css';

import { FIELD_SIZE } from '../../logic/constants';

import { generateField } from '../../logic/generateField';
import { swapTiles } from '../../logic/swapTiles';
import { checkMatches } from '../../logic/checkMatches';
import { processBoard } from '../../logic/processBoard';

type Props = {};

const Level = (props: Props) => {
  const [board, setBoard] = useState(generateField);
  const [selected, setSelected] = useState(null);

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

  useEffect(() => {
    const matches = checkMatches(board);
    if (matches.length > 0) {
      const processed = processBoard(board);
      setBoard(processed);
    }
  }, [board]);

  return (
    <div className={styles.field}>
      {board.map((row, y) =>
        row.map((color, x) => (
          <div
            key={`${y}-${x}`}
            onClick={() => handleTileClick(y, x)}
            className={styles.element}
            style={{
              '--color': color,
              border:
                selected && selected[0] === y && selected[1] === x ? '2px solid white' : 'none',
            }}></div>
        )),
      )}
    </div>
  );
};

export default Level;
