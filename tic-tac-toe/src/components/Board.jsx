import React from 'react';
import Cell from './Cell';

export default function Board({ board, winningLine, isGameOver, isAiThinking, onCellClick }) {
  return (
    <div className="board-grid" role="grid" aria-label="Tic Tac Toe Board">
      {board.map((cellValue, index) => {
        const isWinningCell = winningLine && winningLine.includes(index);
        const isDisabled = cellValue !== null || isGameOver || isAiThinking;

        return (
          <Cell
            key={index}
            index={index}
            value={cellValue}
            isWinningCell={isWinningCell}
            isDisabled={isDisabled}
            onClick={onCellClick}
          />
        );
      })}
    </div>
  );
}