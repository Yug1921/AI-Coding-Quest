import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    api.get('/challenges').then((res) => setChallenges(res.data));
  }, []);

  return (
    <section>
      <h2 className="mb-4 text-3xl font-bold">Challenges</h2>
      <div className="space-y-3">
        {challenges.map((challenge) => (
          <article key={challenge.id} className="card flex items-center justify-between p-4">
            <div>
              <h3 className="font-semibold">{challenge.title}</h3>
              <p className="text-sm text-slate-300">{challenge.description}</p>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="rounded-full bg-slate-800 px-2 py-1">{challenge.difficulty}</span>
                <span className="rounded-full bg-slate-800 px-2 py-1">{challenge.xp} XP</span>
              </div>
            </div>
            <Link className="rounded bg-accent px-3 py-2 text-slate-900" to={`/challenges/${challenge.id}`}>
              Open
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
