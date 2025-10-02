import express from 'express';
import cors from 'cors';
import { submitScoreSchema, getLeaderboardSchema } from '@office-survivor/common';
import { getLeaderboard, submitScore } from './db';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// REST API endpoints
app.get('/api/leaderboard', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    // Validate with Zod
    const validated = getLeaderboardSchema.parse({ limit });

    const data = await getLeaderboard(validated.limit ?? 10);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to fetch leaderboard'
    });
  }
});

app.post('/api/leaderboard', async (req, res) => {
  try {
    // Validate with Zod
    const validated = submitScoreSchema.parse(req.body);

    const result = await submitScore(validated);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to submit score'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎮 Office Survivor server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/leaderboard`);
  console.log(`   POST http://localhost:${PORT}/api/leaderboard`);
});
