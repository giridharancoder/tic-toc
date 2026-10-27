import React from 'react';

export default function ActionControls({
  onResetGame,
  onUndo,
  canUndo,
  isAiMode,
  isAiThinking,
}) {
  return (
    <div className="actions-bar">
      <button type="button" className="btn-action primary" onClick={onResetGame}>
        Reset Game
      </button>
      <button
        type="button"
        className="btn-action secondary"
        onClick={onUndo}
        disabled={!canUndo || isAiThinking}
      >
        Undo Last Move {isAiMode ? '(2-Ply)' : ''}
      </button>
    </div>
  );
}