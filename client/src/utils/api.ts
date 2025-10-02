import type {
  LeaderboardEntry,
  LeaderboardResponse,
  SubmitScoreInput,
  SubmitScoreResponse,
} from '@office-survivor/common';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function fetchLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: LeaderboardResponse = await response.json();

    // Convert createdAt strings to Date objects
    return result.success
      ? result.data.map(entry => ({
          ...entry,
          createdAt: new Date(entry.createdAt),
        }))
      : [];
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
}

export async function submitScore(data: SubmitScoreInput): Promise<SubmitScoreResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result: SubmitScoreResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to submit score:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}