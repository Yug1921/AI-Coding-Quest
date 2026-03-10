import { useEffect, useState } from 'react';
import api from '../api/client';

export default function LeaderboardPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get('/leaderboard').then((res) => setRows(res.data));
  }, []);

  return (
    <section>
      <h2 className="mb-4 text-3xl font-bold">Leaderboard</h2>
      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-sm text-slate-300">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">User</th>
              <th className="p-3">XP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.userId} className="border-t border-slate-800">
                <td className="p-3">#{idx + 1}</td>
                <td className="p-3">{row.userId}</td>
                <td className="p-3">{row.xp}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="p-4 text-slate-400" colSpan="3">No scores yet. Solve challenges to appear here.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
