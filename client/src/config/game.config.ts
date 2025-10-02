import Phaser from 'phaser';
import { MenuScene } from '@/scenes/MenuScene';
import { GameplayScene } from '@/scenes/GameplayScene';
import { DevMode } from '@/config/devMode';

// Initialize dev mode before game config
DevMode.initialize();

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false, // Controlled by dev mode F2 hotkey
    },
  },
  scene: [MenuScene, GameplayScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};