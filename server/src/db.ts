import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LeaderboardEntry {
  id: number;
  playerName: string;
  score: number;
  survivalTime: number;
  character: string | null;
  createdAt: Date;
}

export async function getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
  try {
    const entries = await prisma.leaderboard.findMany({
      orderBy: { score: 'desc' },
      take: limit,
    });
    return entries;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export async function submitScore(entry: {
  playerName: string;
  score: number;
  survivalTime: number;
  character?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.leaderboard.create({
      data: {
        playerName: entry.playerName,
        score: entry.score,
        survivalTime: entry.survivalTime,
        character: entry.character || 'Unknown',
      },
    });

    return { success: true, message: 'Score submitted successfully' };
  } catch (error) {
    console.error('Error submitting score:', error);
    return { success: false, message: 'Failed to submit score' };
  }
}

export { prisma };
