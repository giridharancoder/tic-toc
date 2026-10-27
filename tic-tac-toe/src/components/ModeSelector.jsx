import React from 'react';

export default function ModeSelector({ currentMode, onModeChange }) {
  return (
    <div className="mode-selector">
      <label className="mode-label">Game Mode:</label>
      <div className="button-group">
        <button
          type="button"
          className={`btn-toggle ${currentMode === 'pvp' ? 'active' : ''}`}
          onClick={() => onModeChange('pvp')}
        >
          Two Player
        </button>
        <button
          type="button"
          className={`btn-toggle ${currentMode === 'ai' ? 'active' : ''}`}
          onClick={() => onModeChange('ai')}
        >
          Play Against Computer
        </button>
      </div>
    </div>
  );
}