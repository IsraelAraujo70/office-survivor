/**
 * Dev Mode Configuration
 * Activated via URL query param (?dev=true) or localStorage
 */

export interface DevModeConfig {
  enabled: boolean;
  showHitboxes: boolean;
  godMode: boolean;
  speedMultiplier: number;
}

export class DevMode {
  private static config: DevModeConfig = {
    enabled: false,
    showHitboxes: false,
    godMode: false,
    speedMultiplier: 1,
  };

  static initialize(): void {
    // Check URL params
    const urlParams = new URLSearchParams(window.location.search);
    const devParam = urlParams.get('dev');

    // Check localStorage
    const localStorageDev = localStorage.getItem('devMode');

    // Enable if either is true
    if (devParam === 'true' || localStorageDev === 'true') {
      this.config.enabled = true;
      console.log('🛠️ Dev Mode enabled');
    }

    // Load saved config from localStorage
    const savedConfig = localStorage.getItem('devModeConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        this.config = { ...this.config, ...parsed, enabled: this.config.enabled };
      } catch (e) {
        console.warn('Failed to parse dev mode config from localStorage');
      }
    }
  }

  static isEnabled(): boolean {
    return this.config.enabled;
  }

  static getConfig(): DevModeConfig {
    return { ...this.config };
  }

  static setGodMode(enabled: boolean): void {
    this.config.godMode = enabled;
    this.saveConfig();
  }

  static setShowHitboxes(enabled: boolean): void {
    this.config.showHitboxes = enabled;
    this.saveConfig();
  }

  static setSpeedMultiplier(multiplier: number): void {
    this.config.speedMultiplier = Math.max(0.5, Math.min(10, multiplier));
    this.saveConfig();
  }

  static toggleGodMode(): boolean {
    this.config.godMode = !this.config.godMode;
    this.saveConfig();
    return this.config.godMode;
  }

  static toggleHitboxes(): boolean {
    this.config.showHitboxes = !this.config.showHitboxes;
    this.saveConfig();
    return this.config.showHitboxes;
  }

  private static saveConfig(): void {
    if (this.config.enabled) {
      localStorage.setItem('devModeConfig', JSON.stringify(this.config));
    }
  }
}
