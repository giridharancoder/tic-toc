import React from 'react';

export default function MoveHistory({ moves }) {
  return (
    <aside className="history-section">
      <h3>Move History</h3>
      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Move</th>
              <th>Player</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {moves.length === 0 ? (
              <tr>
                <td colSpan={3} className="empty-state">
                  No moves made yet
                </td>
              </tr>
            ) : (
              moves.map((m) => (
                <tr key={m.moveNumber}>
                  <td>{m.moveNumber}</td>
                  <td>
                    <span className={`badge ${m.player.toLowerCase()}`}>
                      {m.player}
                    </span>
                  </td>
                  <td>{m.label}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </aside>
  );
}