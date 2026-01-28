import { BaseBanner } from '../core/BaseBanner.js';

/**
 * Banner - DoubleClick Studio banner implementation
 * Extends BaseBanner with Enabler integration for tracking and expand/collapse lifecycle
 */
export class Banner extends BaseBanner {
  constructor(config = {}) {
    super({ ...config, autoInit: false });
    this.doubleClickTracking = true;

    window.addEventListener('load', () => {
      this.initializeBanner(config);
    });
  }

  /**
   * Set banner configuration including DoubleClick-specific options
   * @param {Object} config - Banner configuration object
   */
  setConfig(config) {
    super.setConfig(config);
    this.doubleClickTracking = config.doubleClickTracking !== false;
  }

  /**
   * Initialize the banner with DoubleClick Enabler integration
   * @param {Object} config - Banner configuration object
   */
  initializeBanner(config) {
    if (this.initialized) {
      console.log('Already initialized');
      return;
    }

    this.setConfig(config);

    if (this.doubleClickTracking) {
      this.initializeDoubleClick();
      this.registerTimelines();
    } else {
      this.addListeners();
      this.registerTimelines();
      this.executeAnimations();
    }
  }

  /**
   * Initialize DoubleClick Enabler and set up event listeners
   */
  initializeDoubleClick() {
    // Check if Enabler is available
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

    if (!Enabler.isPageLoaded()) {
      Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, () => {
        this.onPageLoaded();
      });
    } else {
      this.onPageLoaded();
    }

    if (this.expand) {
      this.setupExpandableAd();
    }
  }

  /**
   * Called when Enabler is initialized
   */
  onEnablerInit() {
    this.addListeners();
  }

  /**
   * Called when page is loaded
   */
  onPageLoaded() {
    if (!Enabler.isVisible()) {
      Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, () => {
        this.executeAnimations();
      });
    } else {
      this.executeAnimations();
    }
  }

  /**
   * Setup expandable ad configuration and event listeners
   */
  setupExpandableAd() {
    if (this.bannerType !== 'in-app') {
      const [left, top, right, bottom] = this.finalExpandSize;
      if (left === 0 && top === 0 && right === 0 && bottom === 0) {
        console.warn('Please add final expand size banner');
      } else {
        Enabler.setExpandingPixelOffsets(left, top, right, bottom, false, false);
      }
    }

    Enabler.setStartExpanded(this.startExpanded);

    // Expand start event
    Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, () => {
      if (typeof this.timelinesToRegister.expandStartAnimation === 'function') {
        this.timelinesToRegister.expandStartAnimation();
      }
      Enabler.finishExpand();
    });

    // Expand finish event
    Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, () => {
      if (typeof this.timelinesToRegister.expandFinishAnimation === 'function') {
        this.timelinesToRegister.expandFinishAnimation();
      }
    });

    // Collapse start event
    Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, () => {
      if (typeof this.timelinesToRegister.collapseStartAnimation === 'function') {
        this.timelinesToRegister.collapseStartAnimation();
      }
      Enabler.finishCollapse();
    });

    // Collapse finish event
    Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, () => {
      if (typeof this.timelinesToRegister.collapseFinishAnimation === 'function') {
        this.timelinesToRegister.collapseFinishAnimation();
      }
    });

    // Set initial orientation
    document.body.className = Enabler.getOrientation().getMode();

    // Handle orientation changes
    Enabler.addEventListener(studio.events.StudioEvent.ORIENTATION, () => {
      document.body.className = Enabler.getOrientation().getMode();
    });
  }

  /**
   * Handle collapse event - reports to DoubleClick
   */
  collapseEvent() {
    if (typeof Enabler !== 'undefined') {
      Enabler.reportManualClose();
      Enabler.requestCollapse();
    } else {
      super.collapseEvent();
    }
  }

  /**
   * Handle expand event - requests expand from DoubleClick
   */
  expandEvent() {
    if (typeof Enabler !== 'undefined') {
      Enabler.requestExpand();
    } else {
      super.expandEvent();
    }
  }
}
