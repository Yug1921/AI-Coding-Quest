import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ChallengeEditorPage from './pages/ChallengeEditorPage';
import ChallengesPage from './pages/ChallengesPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/:id" element={<ChallengeEditorPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
