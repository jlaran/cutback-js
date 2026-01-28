import { Banner } from './Banner.js';

/**
 * PoliteBanner - Polite-load variant of DoubleClick banner
 * Waits for page assets to fully load before initializing animations
 */
export class PoliteBanner extends Banner {
  constructor(config = {}) {
    super({ ...config, autoInit: false });
    this.politeLoaded = false;

    window.addEventListener('load', () => {
      this.initializeBanner(config);
    });
  }

  /**
   * Initialize with polite-load behavior
   * Waits for Enabler polite load event before executing animations
   * @param {Object} config - Banner configuration object
   */
  initializeBanner(config) {
    if (this.initialized) {
      console.log('Already initialized');
      return;
    }

    this.setConfig(config);

    if (this.doubleClickTracking) {
      this.initializePoliteDoubleClick();
      this.registerTimelines();
    } else {
      this.addListeners();
      this.registerTimelines();
      this.executeAnimations();
    }
  }

  /**
   * Initialize with polite-load specific event handling
   */
  initializePoliteDoubleClick() {
    if (typeof Enabler === 'undefined') {
      console.warn('DoubleClick Enabler not found, falling back to generic initialization');
      this.addListeners();
      this.executeAnimations();
      return;
    }

    if (!Enabler.isInitialized()) {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, () => {
        this.onEnablerInit();
      });
    } else {
      this.onEnablerInit();
    }

    // Use polite load instead of page loaded
    if (!Enabler.isPageLoaded()) {
      Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, () => {
        this.onPoliteLoaded();
      });
    } else {
      this.onPoliteLoaded();
    }

    if (this.expand) {
      this.setupExpandableAd();
    }
  }

  /**
   * Called when polite load is complete
   */
  onPoliteLoaded() {
    this.politeLoaded = true;

    if (typeof Enabler !== 'undefined' && !Enabler.isVisible()) {
      Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, () => {
        this.executeAnimations();
      });
    } else {
      this.executeAnimations();
    }
  }

  /**
   * Check if polite load is complete
   * @returns {boolean} Whether polite load is complete
   */
  isPoliteLoaded() {
    return this.politeLoaded;
  }
}
