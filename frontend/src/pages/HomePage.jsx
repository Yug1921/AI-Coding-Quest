import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="space-y-8 py-10">
      <div className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-wider text-accent">Learn by solving. Grow with AI mentorship.</p>
        <h1 className="text-5xl font-extrabold">Half LeetCode, Half Game, Half AI Tutor</h1>
        <p className="mx-auto max-w-2xl text-slate-300">
          Solve bite-sized coding challenges and receive layered hints from an AI mentor that teaches without revealing the full answer.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Layered Hints', 'Conceptual guidance, debugging nudges, and improvement tips.'],
          ['XP + Progress', 'Earn points by difficulty and visualize growth.'],
          ['Interview Ready', 'Practice patterns commonly asked in coding rounds.']
        ].map(([title, text]) => (
          <article key={title} className="card p-5">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{text}</p>
          </article>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/challenges" className="rounded-lg bg-primary px-6 py-3 font-semibold hover:opacity-90">
          Start Solving Challenges
        </Link>
      </div>
    </section>
  );
}
