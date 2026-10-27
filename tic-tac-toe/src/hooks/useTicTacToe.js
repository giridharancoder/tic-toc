import { useState, useEffect, useCallback, useMemo } from 'react';
import { BOARD_SIZE } from '../types/game';
import { checkGameStatus, indexToRowCol } from '../utils/gameLogic';
import { calculateBestMove } from '../utils/aiStrategy';
import { BackendScoreService } from '../services/scoreService';

export function useTicTacToe() {
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp' | 'ai'
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill(null));
  const [turn, setTurn] = useState('X');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [scores, setScores] = useState({ xWins: 0, oWins: 0, draws: 0 });
  const [scoreRecordedForThisGame, setScoreRecordedForThisGame] = useState(false);

  // Sync initial scores from backend
  useEffect(() => {
    BackendScoreService.getScores().then(setScores);
  }, []);

  const { winner, line: winningLine, isDraw } = useMemo(
    () => checkGameStatus(board),
    [board]
  );
  const isGameOver = Boolean(winner || isDraw);

  // Record outcome to backend when finished
  useEffect(() => {
    if (isGameOver && !scoreRecordedForThisGame) {
      const outcome = winner ? winner : 'draw';
      BackendScoreService.recordResult(outcome).then((updated) => {
        setScores(updated);
        setScoreRecordedForThisGame(true);
      });
    }
  }, [isGameOver, winner, scoreRecordedForThisGame]);

  const executeMove = useCallback(
    (index, player) => {
      if (board[index] !== null || isGameOver) return false;

      const newBoard = [...board];
      newBoard[index] = player;

      const { row, col, label } = indexToRowCol(index);
      const newMove = {
        moveNumber: moveHistory.length + 1,
        player,
        index,
        row,
        col,
        label,
      };

      setBoard(newBoard);
      setMoveHistory((prev) => [...prev, newMove]);
      setTurn(player === 'X' ? 'O' : 'X');
      return true;
    },
    [board, isGameOver, moveHistory.length]
  );

  const handleCellClick = (index) => {
    if (isGameOver || board[index] !== null || isAiThinking) return;
    if (gameMode === 'ai' && turn !== 'X') return;
    executeMove(index, turn);
  };

  // AI Turn automation
  useEffect(() => {
    if (gameMode === 'ai' && turn === 'O' && !isGameOver) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const bestMove = calculateBestMove(board);
        if (bestMove !== null && board[bestMove] === null) {
          executeMove(bestMove, 'O');
        }
        setIsAiThinking(false);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [gameMode, turn, isGameOver, board, executeMove]);

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(null));
    setTurn('X');
    setMoveHistory([]);
    setScoreRecordedForThisGame(false);
    setIsAiThinking(false);
  };

  const handleModeChange = (newMode) => {
    if (newMode === gameMode) return;
    setGameMode(newMode);
    resetGame();
  };

  const handleResetScoreboard = async () => {
    const fresh = await BackendScoreService.resetScores();
    setScores(fresh);
    setScoreRecordedForThisGame(false);
  };

  const handleUndo = () => {
    if (moveHistory.length === 0 || isAiThinking) return;

    const removeCount = gameMode === 'pvp' ? 1 : moveHistory.length >= 2 ? 2 : 1;
    const targetHistory = moveHistory.slice(0, -removeCount);

    const reconstructedBoard = Array(BOARD_SIZE).fill(null);
    targetHistory.forEach((move) => {
      reconstructedBoard[move.index] = move.player;
    });

    setBoard(reconstructedBoard);
    setMoveHistory(targetHistory);

    if (targetHistory.length === 0) {
      setTurn('X');
    } else {
      const lastPlayer = targetHistory[targetHistory.length - 1].player;
      setTurn(lastPlayer === 'X' ? 'O' : 'X');
    }

    const status = checkGameStatus(reconstructedBoard);
    if (!status.winner && !status.isDraw) {
      setScoreRecordedForThisGame(false);
    }
  };

  return {
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
  };
}