import Phaser from 'phaser';
import type { LeaderboardEntry } from '@office-survivor/common';
import { fetchLeaderboard } from '@/utils/api';

export class MenuScene extends Phaser.Scene {
  private leaderboardData: LeaderboardEntry[] = [];
  private loadingText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MenuScene' });
  }

  async create() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;

    // Title
    this.add.text(centerX, 60, 'OFFICE SURVIVOR', {
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(centerX, 110, 'Escape Corporate Hell', {
      fontSize: '20px',
      color: '#aaaaaa',
    }).setOrigin(0.5);

    // Loading text
    this.loadingText = this.add.text(centerX, height / 2, 'Loading leaderboard...', {
      fontSize: '18px',
      color: '#ffffff',
    }).setOrigin(0.5);

    // Fetch leaderboard
    await this.loadLeaderboard();

    // Start button
    const startButton = this.add.text(centerX, height - 80, 'Press SPACE to Start', {
      fontSize: '24px',
      color: '#00ff00',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Animate start button
    this.tweens.add({
      targets: startButton,
      alpha: 0.5,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    // Input handlers
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-SPACE', () => {
        this.scene.start('GameplayScene');
      });
    }

    this.input.once('pointerdown', () => {
      this.scene.start('GameplayScene');
    });
  }

  private async loadLeaderboard() {
    try {
      this.leaderboardData = await fetchLeaderboard(10);
      this.displayLeaderboard();
    } catch (error) {
      if (this.loadingText) {
        this.loadingText.setText('Failed to load leaderboard');
        this.loadingText.setColor('#ff0000');
      }
    }
  }

  private displayLeaderboard() {
    const { width } = this.cameras.main;
    const centerX = width / 2;
    const startY = 160;

    // Remove loading text
    if (this.loadingText) {
      this.loadingText.destroy();
    }

    // Leaderboard title
    this.add.text(centerX, startY, '🏆 TOP SURVIVORS 🏆', {
      fontSize: '24px',
      color: '#ffd700',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Header
    const headerY = startY + 40;
    this.add.text(centerX - 150, headerY, 'Rank', {
      fontSize: '14px',
      color: '#888888',
    });
    this.add.text(centerX - 80, headerY, 'Player', {
      fontSize: '14px',
      color: '#888888',
    });
    this.add.text(centerX + 60, headerY, 'Score', {
      fontSize: '14px',
      color: '#888888',
    });
    this.add.text(centerX + 130, headerY, 'Time', {
      fontSize: '14px',
      color: '#888888',
    });

    // Display entries or empty message
    if (this.leaderboardData.length === 0) {
      this.add.text(centerX, headerY + 60, 'No scores yet. Be the first!', {
        fontSize: '16px',
        color: '#aaaaaa',
      }).setOrigin(0.5);
      return;
    }

    // Display leaderboard entries
    this.leaderboardData.forEach((entry, index) => {
      const y = headerY + 40 + index * 28;
      const rank = index + 1;

      // Rank with medal emoji for top 3
      let rankText = `${rank}`;
      if (rank === 1) rankText = '🥇';
      else if (rank === 2) rankText = '🥈';
      else if (rank === 3) rankText = '🥉';

      const color = rank <= 3 ? '#ffd700' : '#ffffff';

      this.add.text(centerX - 150, y, rankText, {
        fontSize: '14px',
        color,
      });

      this.add.text(centerX - 80, y, entry.playerName.substring(0, 15), {
        fontSize: '14px',
        color,
      });

      this.add.text(centerX + 60, y, entry.score.toLocaleString(), {
        fontSize: '14px',
        color,
      });

      const minutes = Math.floor(entry.survivalTime / 60);
      const seconds = Math.floor(entry.survivalTime % 60);
      this.add.text(centerX + 130, y, `${minutes}:${seconds.toString().padStart(2, '0')}`, {
        fontSize: '14px',
        color,
      });
    });
  }
}