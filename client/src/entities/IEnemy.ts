/**
 * Interface for all enemy types in Office Survivor
 * Phase 1: Enemies will be represented as geometric shapes
 * Phase 2: Will be replaced with pixel art sprites
 */
export interface IEnemy {
  /** Current health points */
  hp: number;

  /** Maximum health points */
  maxHp: number;

  /** Movement speed in pixels per second */
  speed: number;

  /** Damage dealt to player on collision */
  damage: number;

  /** XP/Score value when defeated */
  scoreValue: number;

  /** Take damage from player weapons */
  takeDamage(amount: number): void;

  /** Move towards a target position */
  moveTowards(targetX: number, targetY: number): void;

  /** Handle death (drop XP, play animation, destroy) */
  die(): void;

  /** Update enemy behavior (called every frame) */
  update(time: number, delta: number): void;
}

/**
 * Enemy types based on PRD
 */
export enum EnemyType {
  JIRA_TICKET = 'JIRA_TICKET', // Flying tickets
  SPREADSHEET = 'SPREADSHEET', // Alive spreadsheets
  GHOST_MEETING = 'GHOST_MEETING', // Trap player
}

/**
 * Boss types based on PRD
 */
export enum BossType {
  PROJECT_MANAGER = 'PROJECT_MANAGER', // Throws PowerPoint explosions
  PRODUCT_MANAGER = 'PRODUCT_MANAGER', // Summons feature requests
  CFO = 'CFO', // Drains XP with reports
  CEO = 'CEO', // Chaos mode - moves walls
}
