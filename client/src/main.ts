import Phaser from 'phaser';
import { gameConfig } from '@/config/game.config';

// Initialize the Phaser game when the DOM is ready
window.addEventListener('load', () => {
  new Phaser.Game(gameConfig);
});