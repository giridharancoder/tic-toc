import { checkGameStatus } from './gameLogic';
import { CENTER, CORNERS, SIDES } from '../types/game';

export function calculateBestMove(board) {
  const emptyIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (emptyIndices.length === 0) return null;

  // 1. Can O win in the next move?
  for (const idx of emptyIndices) {
    const clone = [...board];
    clone[idx] = 'O';
    if (checkGameStatus(clone).winner === 'O') {
      return idx;
    }
  }

  // 2. Can X win next move? Block X!
  for (const idx of emptyIndices) {
    const clone = [...board];
    clone[idx] = 'X';
    if (checkGameStatus(clone).winner === 'X') {
      return idx;
    }
  }

  // 3. Take center if available
  if (board[CENTER] === null) {
    return CENTER;
  }

  // 4. Take a corner if available
  const availableCorners = CORNERS.filter((idx) => board[idx] === null);
  if (availableCorners.length > 0) {
    return availableCorners[0];
  }

  // 5. Take an available side
  const availableSides = SIDES.filter((idx) => board[idx] === null);
  if (availableSides.length > 0) {
    return availableSides[0];
  }

  return emptyIndices[0];
}