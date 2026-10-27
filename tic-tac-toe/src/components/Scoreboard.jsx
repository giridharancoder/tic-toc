import React from 'react';

export default function Scoreboard({ scores, gameMode, onResetScores }) {
  return (
    <div className="scoreboard">
      <div className="score-card x-card">
        <span className="player-tag">Player X</span>
        <span className="score-number">{scores.xWins}</span>
      </div>
      <div className="score-card draw-card">
        <span className="player-tag">Draws</span>
        <span className="score-number">{scores.draws}</span>
      </div>
      <div className="score-card o-card">
        <span className="player-tag">
          {gameMode === 'ai' ? 'Computer (O)' : 'Player O'}
        </span>
        <span className="score-number">{scores.oWins}</span>
      </div>
      <button
        type="button"
        className="btn-link"
        onClick={onResetScores}
        title="Reset server scoreboard"
      >
        Reset Scores
      </button>
    </div>
  );
}