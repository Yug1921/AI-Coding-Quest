import { useEffect, useState } from 'react';
import api from '../api/client';

export default function DashboardPage() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    api.get('/users/progress?userId=guest').then((res) => setProgress(res.data));
  }, []);

  if (!progress) return <p>Loading dashboard...</p>;

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold">Your Progress</h2>
      <div className="card p-6">
        <div className="mb-3 flex items-center justify-between">
          <span>Total XP</span>
          <strong>{progress.totalXp}</strong>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <span>Challenges Solved</span>
          <strong>{progress.solvedCount} / {progress.totalChallenges}</strong>
        </div>
        <div>
          <div className="mb-2 text-sm">Completion: {progress.completionRate}%</div>
          <div className="h-3 rounded bg-slate-800">
            <div style={{ width: `${progress.completionRate}%` }} className="h-3 rounded bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
