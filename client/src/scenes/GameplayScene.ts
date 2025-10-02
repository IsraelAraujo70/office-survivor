import Phaser from 'phaser';
import { Player } from '@/entities/Player';
import { DevMode } from '@/config/devMode';
import { DevPanel } from '@/utils/DevPanel';

export class GameplayScene extends Phaser.Scene {
  private player?: Player;
  private survivalTime: number = 0;
  private timerText?: Phaser.GameObjects.Text;
  private hpText?: Phaser.GameObjects.Text;
  private obstacles?: Phaser.Physics.Arcade.StaticGroup;
  private devPanel?: DevPanel;

  constructor() {
    super({ key: 'GameplayScene' });
  }

  create() {
    // Setup world bounds (large office map)
    const worldWidth = 2400;
    const worldHeight = 2400;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // Create static group for obstacles (desks)
    this.obstacles = this.physics.add.staticGroup();

    // Create office floor background (dark gray grid)
    this.createBackground(worldWidth, worldHeight);

    // Create player in center
    this.player = new Player(this, worldWidth / 2, worldHeight / 2);

    // Add collision between player and obstacles
    this.physics.add.collider(this.player, this.obstacles);

    // Setup camera to follow player
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);

    // UI - Fixed to camera
    this.createUI();

    // Dev Panel (if dev mode enabled)
    if (DevMode.isEnabled()) {
      this.devPanel = new DevPanel(this, this.player);
    }

    // Start survival timer
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  private createBackground(width: number, height: number): void {
    // Office floor - dark background
    const bg = this.add.rectangle(0, 0, width, height, 0x1a1a1a);
    bg.setOrigin(0, 0);

    // Grid pattern (office tiles)
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x333333, 0.5);

    const gridSize = 100;
    for (let x = 0; x <= width; x += gridSize) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += gridSize) {
      graphics.moveTo(0, y);
      graphics.lineTo(width, y);
    }

    graphics.strokePath();

    // Add some office decorations (rectangles representing desks)
    this.createOfficeDecorations(width, height);
  }

  private createOfficeDecorations(width: number, height: number): void {
    const deskCount = 20;
    for (let i = 0; i < deskCount; i++) {
      const x = Phaser.Math.Between(100, width - 100);
      const y = Phaser.Math.Between(100, height - 100);

      // Desk (brown rectangle) - add as physics object
      const desk = this.add.rectangle(x, y, 80, 120, 0x4a3520);
      desk.setStrokeStyle(2, 0x2a1f10);

      // Add to obstacles group for collision
      this.obstacles?.add(desk);

      // Set the physics body to match the rectangle size
      const body = desk.body as Phaser.Physics.Arcade.StaticBody;
      body.setSize(80, 120);
      body.updateFromGameObject();
    }
  }

  private createUI(): void {
    const { width, height } = this.cameras.main;

    // Timer (top center)
    this.timerText = this.add.text(width / 2, 20, '00:00', {
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    this.timerText.setOrigin(0.5, 0);
    this.timerText.setScrollFactor(0);

    // HP Bar (top left)
    this.hpText = this.add.text(20, 20, 'HP: 100/100', {
      fontSize: '20px',
      color: '#00ff00',
      fontStyle: 'bold',
    });
    this.hpText.setScrollFactor(0);

    // Instructions (bottom center)
    const instructions = this.add.text(
      width / 2,
      height - 30,
      'WASD/Arrows to move • Survive as long as possible!',
      {
        fontSize: '16px',
        color: '#aaaaaa',
      }
    );
    instructions.setOrigin(0.5, 0);
    instructions.setScrollFactor(0);
  }

  private updateTimer(): void {
    this.survivalTime++;
    const minutes = Math.floor(this.survivalTime / 60);
    const seconds = this.survivalTime % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    this.timerText?.setText(timeString);
  }

  update(time: number, delta: number): void {
    // Update player
    this.player?.update();

    // Update dev panel
    if (this.devPanel) {
      this.devPanel.update();
    }

    // Update HP display
    if (this.player) {
      this.hpText?.setText(`HP: ${this.player.hp}/${this.player.maxHp}`);

      // Change color based on HP
      if (this.player.hp < 30) {
        this.hpText?.setColor('#ff0000');
      } else if (this.player.hp < 60) {
        this.hpText?.setColor('#ffaa00');
      } else {
        this.hpText?.setColor('#00ff00');
      }
    }
  }
}
