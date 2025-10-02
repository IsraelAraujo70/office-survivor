import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  public hp: number;
  public maxHp: number;
  private moveSpeed: number;
  private baseSpeed: number = 200; // Base speed for calculations
  private speedMultiplier: number = 1;
  private godMode: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Create a temporary texture for the player (green circle)
    const graphics = scene.add.graphics();
    graphics.fillStyle(0x00ff00, 1);
    graphics.fillCircle(20, 20, 20);
    graphics.generateTexture('player', 40, 40);
    graphics.destroy();

    super(scene, x, y, 'player');

    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Player stats
    this.hp = 100;
    this.maxHp = 100;
    this.moveSpeed = 200; // pixels per second

    // Setup physics body
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setDrag(800); // Smooth movement with drag

    // Set circular collision body to match visual
    body.setCircle(20); // Radius 20px to match the green circle
    body.setOffset(0, 0);

    // Setup input
    this.setupInput();
  }

  private setupInput(): void {
    if (this.scene.input.keyboard) {
      // Arrow keys
      this.cursors = this.scene.input.keyboard.createCursorKeys();

      // WASD keys
      this.wasd = {
        W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
    }
  }

  public takeDamage(amount: number): void {
    // God mode: ignore damage
    if (this.godMode) {
      return;
    }

    this.hp -= amount;

    // Flash red when hit
    this.setTint(0xff0000);
    this.scene.time.delayedCall(100, () => {
      this.clearTint();
    });

    if (this.hp <= 0) {
      this.die();
    }
  }

  // Dev mode methods
  public setGodMode(enabled: boolean): void {
    this.godMode = enabled;
    if (enabled) {
      // Visual indicator: add slight glow
      this.setTint(0xffff00);
    } else {
      this.clearTint();
    }
  }

  public setSpeedMultiplier(multiplier: number): void {
    this.speedMultiplier = multiplier;
    this.moveSpeed = this.baseSpeed * multiplier;
  }

  public getSpeedMultiplier(): number {
    return this.speedMultiplier;
  }

  public isGodMode(): boolean {
    return this.godMode;
  }

  private die(): void {
    // TODO: Trigger game over scene
    console.log('Player died!');
    this.setActive(false);
    this.setVisible(false);
  }

  public update(): void {
    if (!this.active) return;

    // Reset velocity
    this.setVelocity(0);

    let velocityX = 0;
    let velocityY = 0;

    // Check WASD
    if (this.wasd?.W.isDown || this.cursors?.up.isDown) {
      velocityY = -1;
    } else if (this.wasd?.S.isDown || this.cursors?.down.isDown) {
      velocityY = 1;
    }

    if (this.wasd?.A.isDown || this.cursors?.left.isDown) {
      velocityX = -1;
    } else if (this.wasd?.D.isDown || this.cursors?.right.isDown) {
      velocityX = 1;
    }

    // Normalize diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= Math.SQRT1_2;
      velocityY *= Math.SQRT1_2;
    }

    // Apply velocity
    this.setVelocity(velocityX * this.moveSpeed, velocityY * this.moveSpeed);
  }
}
