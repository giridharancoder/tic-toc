import React, { useState } from 'react';
import { useTicTacToe } from './hooks/useTicTacToe';
import ModeSelector from './components/ModeSelector';
import Scoreboard from './components/Scoreboard';
import StatusBanner from './components/StatusBanner';
import Board from './components/Board';
import ActionControls from './components/ActionControls';
import MoveHistory from './components/MoveHistory';
import TestSuite from './components/TestSuite';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('game'); // 'game' | 'tests'

  const {
    board,
    turn,
    gameMode,
    scores,
    moveHistory,
    winner,
    winningLine,
    isDraw,
    isGameOver,
    isAiThinking,
    handleCellClick,
    resetGame,
    handleModeChange,
    handleResetScoreboard,
    handleUndo,
  } = useTicTacToe();

  return (
    <div className="ttt-app">
      <header className="ttt-header">
        <div className="header-content">
          <h1>React Tic Tac Toe</h1>
          
        </div>
        <nav className="tab-nav">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'game' ? 'active' : ''}`}
            onClick={() => setActiveTab('game')}
          >
            Play Game
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            Run Test Suite
          </button>
        </nav>
      </header>

      {activeTab === 'game' ? (
        <main className="ttt-main">
          <section className="controls-panel">
            <ModeSelector currentMode={gameMode} onModeChange={handleModeChange} />
            <Scoreboard
              scores={scores}
              gameMode={gameMode}
              onResetScores={handleResetScoreboard}
            />
          </section>

          <div className="game-layout">
            <div className="board-section">
              <StatusBanner
                winner={winner}
                isDraw={isDraw}
                turn={turn}
                isAiThinking={isAiThinking}
                gameMode={gameMode}
              />

              <Board
                board={board}
                winningLine={winningLine}
                isGameOver={isGameOver}
                isAiThinking={isAiThinking}
                onCellClick={handleCellClick}
              />

              <ActionControls
                onResetGame={resetGame}
                onUndo={handleUndo}
                canUndo={moveHistory.length > 0}
                isAiMode={gameMode === 'ai'}
                isAiThinking={isAiThinking}
              />
            </div>

            <MoveHistory moves={moveHistory} />
          </div>
        </main>
      ) : (
        <TestSuite />
      )}
    </div>
  );
}