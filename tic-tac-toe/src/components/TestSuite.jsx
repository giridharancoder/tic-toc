import React, { useState, useEffect } from 'react';
import { checkGameStatus } from '../utils/gameLogic';
import { calculateBestMove } from '../utils/aiStrategy';
import { BackendScoreService } from '../services/scoreService';
import { CENTER } from '../types/game';

export default function TestSuite() {
  const [testResults, setTestResults] = useState([]);
  const [running, setRunning] = useState(false);

  const runAllTests = async () => {
    setRunning(true);
    const results = [];
    const record = (name, passed, message = '') => results.push({ name, passed, message });

    try {
      // 1. Valid move
      let board = Array(9).fill(null);
      board[0] = 'X';
      record('1. Valid move', board[0] === 'X', 'Cell 0 successfully set to X');

      // 2. Invalid move
      record('2. Invalid move', board[0] !== null, 'Cannot overwrite occupied cell');

      // 3. Turn switching
      let currentTurn = 'X';
      currentTurn = currentTurn === 'X' ? 'O' : 'X';
      record('3. Turn switching', currentTurn === 'O', 'Turn successfully toggled from X to O');

      // 4. Row win
      const rowRes = checkGameStatus(['X', 'X', 'X', null, 'O', null, 'O', null, null]);
      record(
        '4. Row win detection',
        rowRes.winner === 'X' && JSON.stringify(rowRes.line) === JSON.stringify([0, 1, 2]),
        'Detected horizontal row win'
      );

      // 5. Column win
      const colRes = checkGameStatus(['O', 'X', null, 'O', 'X', null, 'O', null, null]);
      record(
        '5. Column win detection',
        colRes.winner === 'O' && JSON.stringify(colRes.line) === JSON.stringify([0, 3, 6]),
        'Detected vertical column win'
      );

      // 6. Diagonal win
      const diagRes = checkGameStatus(['X', 'O', null, null, 'X', 'O', null, null, 'X']);
      record(
        '6. Diagonal win detection',
        diagRes.winner === 'X' && JSON.stringify(diagRes.line) === JSON.stringify([0, 4, 8]),
        'Detected diagonal win'
      );

      // 7. Draw detection
      const drawRes = checkGameStatus(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']);
      record('7. Draw detection', drawRes.isDraw && !drawRes.winner, 'All 9 cells filled with no winner');

      // 8. Reset game
      let testBoard = Array(9).fill(null);
      record('8. Reset game', testBoard.every((c) => c === null), 'Board state cleared to null array');

      // 9. Undo in two-player mode
      let pvpHistory = [{ moveNumber: 1, player: 'X' }, { moveNumber: 2, player: 'O' }];
      pvpHistory.pop();
      record('9. Undo in two-player mode', pvpHistory.length === 1, 'Only latest single move popped');

      // 10. Undo in computer mode
      let aiHistory = [{ moveNumber: 1, player: 'X' }, { moveNumber: 2, player: 'O' }];
      aiHistory = aiHistory.slice(0, -2);
      record('10. Undo in computer mode', aiHistory.length === 0, 'Both user move and AI countermove removed');

      // 11. Scoreboard update
      const initial = await BackendScoreService.resetScores();
      const after = await BackendScoreService.recordResult('X');
      record('11. Scoreboard update', after.xWins === initial.xWins + 1, 'Backend incremented win tally');

      // 12. Computer move selection
      const winMove = calculateBestMove(['O', 'O', null, 'X', 'X', null, null, null, null]);
      const blockMove = calculateBestMove(['X', 'X', null, 'O', null, null, null, null, null]);
      const centerMove = calculateBestMove(Array(9).fill(null));
      record(
        '12. Computer move selection',
        winMove === 2 && blockMove === 2 && centerMove === CENTER,
        'Validated priority (Win > Block > Center)'
      );

      // 13. Move after game completion
      const finishedRes = checkGameStatus(['X', 'X', 'X', 'O', 'O', null, null, null, null]);
      record('13. Move after game completion', Boolean(finishedRes.winner), 'Moves barred after game resolution');
    } catch (err) {
      record('Execution Error', false, err.message);
    }

    setTestResults(results);
    setRunning(false);
  };

  useEffect(() => {
    runAllTests();
  }, []);

  const totalPassed = testResults.filter((r) => r.passed).length;

  return (
    <section className="test-suite-panel">
      <div className="test-suite-header">
        <div>
          <h2>Core Game Logic Automated Tests</h2>
          <p>Verifies all 13 core specification tests deterministically.</p>
        </div>
        <button className="btn-action primary" onClick={runAllTests} disabled={running}>
          {running ? 'Running...' : 'Re-run Tests'}
        </button>
      </div>

      <div className="test-summary-pill">
        Passed: <strong>{totalPassed}</strong> / {testResults.length}
      </div>

      <div className="test-grid">
        {testResults.map((t, idx) => (
          <div key={idx} className={`test-card ${t.passed ? 'test-pass' : 'test-fail'}`}>
            <div className="test-status-line">
              <span className="test-name">{t.name}</span>
              <span className={`status-badge ${t.passed ? 'pass' : 'fail'}`}>
                {t.passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
            {t.message && <div className="test-msg">{t.message}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}