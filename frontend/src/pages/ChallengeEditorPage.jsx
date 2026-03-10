import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';

export default function ChallengeEditorPage() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [mentorHint, setMentorHint] = useState(null);

  useEffect(() => {
    api.get(`/challenges/${id}`).then((res) => {
      setChallenge(res.data);
      setCode(res.data.starterCode);
    });
  }, [id]);

  const submitCode = async () => {
    const res = await api.post('/submissions', { challengeId: id, code, userId: 'guest' });
    setResult(res.data);
  };

  const askMentor = async () => {
    const res = await api.post('/mentor', { challengeId: id, code, userId: 'guest' });
    setMentorHint(res.data);
  };

  if (!challenge) return <p>Loading challenge...</p>;

  return (
    <section className="space-y-4">
      <div className="card p-5">
        <h2 className="text-2xl font-bold">{challenge.title}</h2>
        <p className="mt-2 text-slate-300">{challenge.description}</p>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="min-h-[260px] w-full rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-sm"
      />

      <div className="flex gap-3">
        <button onClick={submitCode} className="rounded bg-primary px-4 py-2 font-medium">Submit Code</button>
        <button onClick={askMentor} className="rounded bg-accent px-4 py-2 font-medium text-slate-900">Ask AI Mentor</button>
      </div>

      {result && (
        <div className="card p-4">
          <h3 className="font-semibold">Submission Result: {result.passed ? '✅ Passed' : '❌ Try again'}</h3>
          <p className="text-sm text-slate-300">XP Earned: {result.earnedXp}</p>
          {result.runtimeError && <p className="mt-2 text-red-400">Runtime Error: {result.runtimeError}</p>}
          {result.hint && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-200">
              <li><strong>Conceptual:</strong> {result.hint.conceptualHint}</li>
              <li><strong>Debug:</strong> {result.hint.debuggingHint}</li>
              <li><strong>Improve:</strong> {result.hint.improvementTip}</li>
            </ul>
          )}
        </div>
      )}

      {mentorHint && (
        <div className="card p-4">
          <h3 className="font-semibold">AI Mentor Mode</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
            <li><strong>Conceptual:</strong> {mentorHint.conceptualHint}</li>
            <li><strong>Debug:</strong> {mentorHint.debuggingHint}</li>
            <li><strong>Improve:</strong> {mentorHint.improvementTip}</li>
          </ul>
        </div>
      )}
    </section>
  );
}
