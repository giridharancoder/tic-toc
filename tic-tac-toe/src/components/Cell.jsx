import React from 'react';

export default function Cell({ index, value, isWinningCell, isDisabled, onClick }) {
  return (
    <button
      type="button"
      className={`cell ${value ? value.toLowerCase() : ''} ${
        isWinningCell ? 'winning-cell' : ''
      }`}
      onClick={() => onClick(index)}
      disabled={isDisabled}
      aria-label={`Cell ${index + 1}, ${value ? `Value ${value}` : 'Empty'}`}
    >
      {value}
    </button>
  );
}