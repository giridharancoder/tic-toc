import React from 'react';

export default function StatusBanner({ winner, isDraw, turn, isAiThinking, gameMode }) {
  return (
    <div className={`status-banner ${winner ? 'winner' : isDraw ? 'draw' : ''}`}>
      {winner ? (
        <span className="highlight-text">🎉 Winner: Player {winner}!</span>
      ) : isDraw ? (
        <span className="highlight-text">🤝 Game Ended in a Draw!</span>
      ) : (
        <span>
          Current Turn:{' '}
          <strong className={`turn-tag ${turn.toLowerCase()}`}>
            {gameMode === 'ai' && turn === 'O' && isAiThinking
              ? 'Computer (O) is thinking...'
              : `Player ${turn}`}
          </strong>
        </span>
      )}
    </div>
  );
}