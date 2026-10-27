const STORAGE_KEY = 'ttt_backend_scores';

export const BackendScoreService = {
  async getScores() {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { xWins: 0, oWins: 0, draws: 0 };
  },

  async recordResult(result) {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const current = await this.getScores();
    if (result === 'X') current.xWins += 1;
    else if (result === 'O') current.oWins += 1;
    else if (result === 'draw') current.draws += 1;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return current;
  },

  async resetScores() {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const fresh = { xWins: 0, oWins: 0, draws: 0 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  },
};