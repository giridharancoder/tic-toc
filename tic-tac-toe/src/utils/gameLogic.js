import { WINNING_COMBINATIONS } from '../types/game';

/**
 * Checks for a winner or draw
 * @returns {{ winner: 'X' | 'O' | null, line: number[] | null, isDraw: boolean }}
 */
export function checkGameStatus(board) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: combo, isDraw: false };
    }
  }

  const isDraw = board.every((cell) => cell !== null);
  return { winner: null, line: null, isDraw };
}

/**
 * Converts a 0-indexed cell position to 1-based Row and Column
 */
export function indexToRowCol(index) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  return { row, col, label: `Row ${row}, Column ${col}` };
}