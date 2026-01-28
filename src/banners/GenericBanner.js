import { BaseBanner } from '../core/BaseBanner.js';

/**
 * GenericBanner - Non-DoubleClick banner implementation
 * Simplified banner without any ad platform dependencies
 */
export class GenericBanner extends BaseBanner {
  constructor(config = {}) {
    super(config);
  }

  /**
   * Initialize the banner without DoubleClick integration
   * @param {Object} config - Banner configuration object
   */
  initializeBanner(config) {
    if (this.initialized) {
      console.log('Already initialized');
      return;
    }

    this.setConfig(config);
    this.addListeners();
    this.registerTimelines();
  }

  /**
   * Register timelines and execute initial animation
   * Overrides parent to include automatic animation execution
   */
  registerTimelines() {
    super.registerTimelines();
    this.executeAnimations();
  }
}
