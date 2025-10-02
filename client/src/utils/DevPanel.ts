import Phaser from 'phaser';
import { DevMode } from '@/config/devMode';
import type { Player } from '@/entities/Player';

export class DevPanel {
  private scene: Phaser.Scene;
  private player: Player;
  private container?: Phaser.GameObjects.Container;
  private statusTexts: Map<string, Phaser.GameObjects.Text> = new Map();

  constructor(scene: Phaser.Scene, player: Player) {
    this.scene = scene;
    this.player = player;
    this.create();
    this.setupHotkeys();
  }

  private create(): void {
    const { width } = this.scene.cameras.main;

    // Container for dev panel (fixed to camera)
    this.container = this.scene.add.container(width - 250, 80);
    this.container.setScrollFactor(0);
    this.container.setDepth(1000);

    // Background panel
    const bg = this.scene.add.rectangle(0, 0, 240, 280, 0x000000, 0.7);
    bg.setOrigin(0, 0);
    this.container.add(bg);

    // Title
    const title = this.scene.add.text(10, 10, '🛠️ DEV MODE', {
      fontSize: '18px',
      color: '#00ff00',
      fontStyle: 'bold',
    });
    this.container.add(title);

    // God Mode status
    const godModeText = this.scene.add.text(10, 45, '[G] God Mode: OFF', {
      fontSize: '14px',
      color: '#ffffff',
    });
    this.statusTexts.set('godMode', godModeText);
    this.container.add(godModeText);

    // Hitboxes status
    const hitboxText = this.scene.add.text(10, 70, '[H] Hitboxes: OFF', {
      fontSize: '14px',
      color: '#ffffff',
    });
    this.statusTexts.set('hitboxes', hitboxText);
    this.container.add(hitboxText);

    // Speed status
    const speedText = this.scene.add.text(10, 95, '[+/-] Speed: 1.0x', {
      fontSize: '14px',
      color: '#ffffff',
    });
    this.statusTexts.set('speed', speedText);
    this.container.add(speedText);

    // Spawn item button
    const spawnText = this.scene.add.text(10, 120, '[I] Spawn Test Item', {
      fontSize: '14px',
      color: '#ffffff',
    });
    this.container.add(spawnText);

    // Player stats (live)
    const statsText = this.scene.add.text(10, 150, '', {
      fontSize: '12px',
      color: '#aaaaaa',
    });
    this.statusTexts.set('stats', statsText);
    this.container.add(statsText);

    // Instructions
    const instructions = this.scene.add.text(10, 220, 'G: God Mode\nH: Hitboxes\n+: Speed Up\n-: Speed Down\nI: Spawn Item', {
      fontSize: '10px',
      color: '#666666',
      lineSpacing: 2,
    });
    this.container.add(instructions);
  }

  private setupHotkeys(): void {
    if (!this.scene.input.keyboard) return;

    // G - Toggle God Mode
    this.scene.input.keyboard.on('keydown-G', () => {
      const enabled = DevMode.toggleGodMode();
      this.player.setGodMode(enabled);
      this.updateStatusTexts();
      console.log(`🛡️ God Mode: ${enabled ? 'ON' : 'OFF'}`);
    });

    // H - Toggle Hitboxes
    this.scene.input.keyboard.on('keydown-H', () => {
      const enabled = DevMode.toggleHitboxes();
      this.scene.physics.world.drawDebug = enabled;
      if (enabled) {
        this.scene.physics.world.createDebugGraphic();
      } else {
        this.scene.physics.world.debugGraphic?.clear();
      }
      this.updateStatusTexts();
      console.log(`📦 Hitboxes: ${enabled ? 'ON' : 'OFF'}`);
    });

    // + or = - Speed Up
    this.scene.input.keyboard.on('keydown-PLUS', () => {
      const config = DevMode.getConfig();
      const newSpeed = Math.min(10, config.speedMultiplier + 0.5);
      DevMode.setSpeedMultiplier(newSpeed);
      this.player.setSpeedMultiplier(newSpeed);
      this.updateStatusTexts();
      console.log(`⚡ Speed: ${newSpeed.toFixed(1)}x`);
    });
    this.scene.input.keyboard.on('keydown-EQUALS', () => {
      const config = DevMode.getConfig();
      const newSpeed = Math.min(10, config.speedMultiplier + 0.5);
      DevMode.setSpeedMultiplier(newSpeed);
      this.player.setSpeedMultiplier(newSpeed);
      this.updateStatusTexts();
      console.log(`⚡ Speed: ${newSpeed.toFixed(1)}x`);
    });

    // - or _ - Speed Down
    this.scene.input.keyboard.on('keydown-MINUS', () => {
      const config = DevMode.getConfig();
      const newSpeed = Math.max(0.5, config.speedMultiplier - 0.5);
      DevMode.setSpeedMultiplier(newSpeed);
      this.player.setSpeedMultiplier(newSpeed);
      this.updateStatusTexts();
      console.log(`🐌 Speed: ${newSpeed.toFixed(1)}x`);
    });
    this.scene.input.keyboard.on('keydown-UNDERSCORE', () => {
      const config = DevMode.getConfig();
      const newSpeed = Math.max(0.5, config.speedMultiplier - 0.5);
      DevMode.setSpeedMultiplier(newSpeed);
      this.player.setSpeedMultiplier(newSpeed);
      this.updateStatusTexts();
      console.log(`🐌 Speed: ${newSpeed.toFixed(1)}x`);
    });

    // I - Spawn Test Item
    this.scene.input.keyboard.on('keydown-I', () => {
      this.spawnTestItem();
      console.log('📦 Spawned test item at player position');
    });
  }

  private updateStatusTexts(): void {
    const config = DevMode.getConfig();

    this.statusTexts.get('godMode')?.setText(
      `[G] God Mode: ${config.godMode ? '✅ ON' : 'OFF'}`
    );
    this.statusTexts.get('godMode')?.setColor(config.godMode ? '#00ff00' : '#ffffff');

    this.statusTexts.get('hitboxes')?.setText(
      `[H] Hitboxes: ${config.showHitboxes ? '✅ ON' : 'OFF'}`
    );
    this.statusTexts.get('hitboxes')?.setColor(config.showHitboxes ? '#00ff00' : '#ffffff');

    this.statusTexts.get('speed')?.setText(
      `[+/-] Speed: ${config.speedMultiplier.toFixed(1)}x`
    );

    const speedColor = config.speedMultiplier > 1 ? '#ffaa00' : '#ffffff';
    this.statusTexts.get('speed')?.setColor(speedColor);
  }

  private spawnTestItem(): void {
    // Spawn a test XP pickup at player position with slight offset
    const offsetX = Phaser.Math.Between(-50, 50);
    const offsetY = Phaser.Math.Between(-50, 50);

    const testItem = this.scene.add.circle(
      this.player.x + offsetX,
      this.player.y + offsetY,
      12,
      0xffff00
    );

    testItem.setStrokeStyle(2, 0xffaa00);

    // Animate bobbing
    this.scene.tweens.add({
      targets: testItem,
      y: testItem.y - 10,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Auto-destroy after 10 seconds
    this.scene.time.delayedCall(10000, () => {
      testItem.destroy();
    });
  }

  update(): void {
    // Update live stats
    const stats = `Pos: (${Math.floor(this.player.x)}, ${Math.floor(this.player.y)})\nHP: ${this.player.hp}/${this.player.maxHp}\nVel: (${Math.floor(this.player.body!.velocity.x)}, ${Math.floor(this.player.body!.velocity.y)})`;
    this.statusTexts.get('stats')?.setText(stats);

    // Update status display
    this.updateStatusTexts();
  }

  destroy(): void {
    this.container?.destroy();
    this.statusTexts.clear();
  }
}
