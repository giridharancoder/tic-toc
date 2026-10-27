export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Col 1
  [1, 4, 7], // Col 2
  [2, 5, 8], // Col 3
  [0, 4, 8], // Diagonal Top-Left -> Bottom-Right
  [2, 4, 6], // Diagonal Top-Right -> Bottom-Left
];

export const CORNERS = [0, 2, 6, 8];
export const SIDES = [1, 3, 5, 7];
export const CENTER = 4;
export const BOARD_SIZE = 9;