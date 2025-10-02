/**
 * Interface for pickups/collectibles in Office Survivor
 * Phase 1: Represented as geometric shapes (circles for XP, squares for health, etc)
 * Phase 2: Will be replaced with pixel art sprites
 */

export interface IPickup {
  /** Type of pickup */
  type: PickupType;

  /** Value of the pickup (XP amount, health amount, etc) */
  value: number;

  /** Collect this pickup */
  collect(): void;

  /** Update pickup behavior (magnetic attraction, bobbing animation, etc) */
  update(time: number, delta: number): void;
}

/**
 * Types of pickups based on PRD
 */
export enum PickupType {
  /** XP pickups - coffee cups, commits, post-its */
  XP_COFFEE = 'XP_COFFEE',           // Small XP (5)
  XP_COMMIT = 'XP_COMMIT',           // Medium XP (10)
  XP_POSTIT = 'XP_POSTIT',           // Large XP (25)

  /** Health pickups */
  HEALTH_SMALL = 'HEALTH_SMALL',     // +20 HP
  HEALTH_LARGE = 'HEALTH_LARGE',     // +50 HP

  /** Currency for meta progression */
  COIN_VR_POINT = 'COIN_VR_POINT',   // VR Points (permanent currency)
  COIN_MEAL_TICKET = 'COIN_MEAL_TICKET', // Meal voucher (currency)

  /** Power-ups (temporary buffs) */
  POWERUP_SPEED = 'POWERUP_SPEED',   // Speed boost (10s)
  POWERUP_DAMAGE = 'POWERUP_DAMAGE', // Damage boost (10s)
  POWERUP_MAGNET = 'POWERUP_MAGNET', // XP magnet (15s)
}

/**
 * Visual representation for Phase 1 (geometric shapes)
 */
export const PickupVisuals: Record<PickupType, { color: number; shape: 'circle' | 'square'; size: number }> = {
  // XP - yellow circles (different sizes)
  [PickupType.XP_COFFEE]: { color: 0xffff00, shape: 'circle', size: 8 },
  [PickupType.XP_COMMIT]: { color: 0xffdd00, shape: 'circle', size: 12 },
  [PickupType.XP_POSTIT]: { color: 0xffaa00, shape: 'circle', size: 16 },

  // Health - green squares
  [PickupType.HEALTH_SMALL]: { color: 0x00ff00, shape: 'square', size: 10 },
  [PickupType.HEALTH_LARGE]: { color: 0x00ff00, shape: 'square', size: 16 },

  // Currency - gold squares
  [PickupType.COIN_VR_POINT]: { color: 0xffd700, shape: 'square', size: 12 },
  [PickupType.COIN_MEAL_TICKET]: { color: 0xffa500, shape: 'square', size: 10 },

  // Power-ups - blue/purple circles
  [PickupType.POWERUP_SPEED]: { color: 0x00aaff, shape: 'circle', size: 14 },
  [PickupType.POWERUP_DAMAGE]: { color: 0xff00aa, shape: 'circle', size: 14 },
  [PickupType.POWERUP_MAGNET]: { color: 0xaa00ff, shape: 'circle', size: 14 },
};
