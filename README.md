# Modular React Tic Tac Toe (with AI Mode & Automated Test Suite)

A clean, decoupled, and production-ready 3×3 Tic Tac Toe web application built strictly in React. The codebase separates game domain logic, prioritized AI strategy, async scoreboard persistence, and view presentation into modular, reusable components and custom hooks.

---

## 1. Project Overview

This project delivers a feature-complete Tic Tac Toe platform supporting two distinct play styles: **Two-Player Mode** and an intelligent **Play Against Computer** mode. Key highlights include full state management with history tracking, mode-aware undo capabilities (single-ply for PvP and two-ply turn pair for AI), an emulated REST backend service for session scoreboard tracking, and an integrated in-browser test harness covering 13 critical acceptance criteria.

---

## 2. Tech Stack

- **Framework**: React 18+ (Hooks: `useState`, `useEffect`, `useCallback`, `useMemo`)
- **Architecture**: Decoupled Presentational & Container Pattern with Custom Hook (`useTicTacToe`)
- **Styling**: CSS3 with CSS Custom Properties (Theme variables, CSS Grid, Flexbox)
- **Data Persistence**: Simulated Asynchronous REST Service using Web Storage API (`localStorage`)
- **Testing**: In-browser deterministic test harness and assertion runner

---

## 3. Features Implemented

1. **3×3 Game Board**:
   - Dynamic 3×3 cell grid rendering.
   - Interactive empty cells with locking upon move entry.
   - Winning path highlight animation (`Row`, `Col`, `Diagonal`).
2. **Turn Management & Status**:
   - Real-time turn indicator with dedicated styles for Player `X` and Player `O`.
   - Automated turn switching; guards against clicks on occupied cells or completed games.
3. **Win & Draw Detection**:
   - Constant-time evaluation across 8 winning line combinations.
   - Distinct banners for game win or full-board draw outcomes.
4. **Move History Table**:
   - Chronological move audit log tracking: Move Number, Player (`X` or `O`), and Human-Readable Grid Position (`Row R, Column C`).
5. **Mode-Aware Undo Mechanics**:
   - **Two-Player Mode**: Pops the latest single move and passes the active turn back to that player.
   - **Computer Mode**: Reverts the computer's countermove and the player's prior move simultaneously (2-ply rollback), returning the turn to Player `X`.
   - **Deterministic State Reconstruction**: Replays the remaining move history from scratch rather than mutating board diffs, preventing stale win states.
6. **Backend-Served Scoreboard**:
   - Session-level tracking for `X Wins`, `O Wins`, and `Draws`.
   - Single-increment guard per finished game session.
   - Independent Scoreboard Reset action that persists via REST-like endpoints.
7. **Rule-Based Prioritized Computer AI**:
   - Automatic move scheduling with a natural human-perception delay (350ms).
   - Strict prioritization engine:
     1. **Win**: Complete an open 3-in-a-row for `O`.
     2. **Block**: Stop `X` from completing a winning line on the subsequent move.
     3. **Center**: Take index `4` if unoccupied.
     4. **Corner**: Take any unoccupied corner (`0`, `2`, `6`, `8`).
     5. **Sides**: Fill remaining side cells (`1`, `3`, `5`, `7`).
8. **Automated Test Runner**:
   - Built-in test suite executing 13 independent unit and state validation scenarios directly in the browser UI.

---

## 4. How to Run the Backend Locally

The application comes bundled with `BackendScoreService` in `src/services/scoreService.js`, which exposes an asynchronous Promise-based REST contract persisted via browser `localStorage`.

If you prefer running a dedicated **Node.js Express** backend server:

1. Create a `server/` directory and install dependencies:
   ```bash
   mkdir server && cd server
   npm init -y
   npm install express cors