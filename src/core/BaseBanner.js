/**
 * BaseBanner - Base class for all banner types
 * Contains shared functionality for timeline management and event handling
 */
export class BaseBanner {
  constructor(config = {}) {
    this.initialized = false;
    this.timelines = new Map();
    this.timelinesArray = [];
    this.timelinesName = [];
    this.timelinesToRegister = {};
    this.elementsToRegister = [];
    this.animationFrames = [];
    this.bannerType = 'in-page';
    this.expand = false;
    this.finalExpandSize = [0, 0, 0, 0];
    this.startExpanded = false;
    this.hotspotClose = [];
    this.hotspotExpand = [];

    if (config.autoInit !== false) {
      window.addEventListener('load', () => {
        this.initializeBanner(config);
      });
    }
  }

  /**
   * Set banner configuration from provided options
   * @param {Object} config - Banner configuration object
   */
  setConfig(config) {
    this.bannerType = config.bannerType || 'in-page';
    this.expand = config.expand || false;
    this.finalExpandSize = config.finalExpandSize || [0, 0, 0, 0];
    this.startExpanded = config.startExpanded || false;

    this.elementsToRegister = config.elementsToRegister || [];
    this.hotspotClose = config.hotspotClose || [];
    this.hotspotExpand = config.hotspotExpand || [];

    this.timelinesName = config.timelinesName || [];
    this.timelinesToRegister = config.timelinesToRegister || {};

    this.animationFrames = config.animationFrames || [];

    this.initialized = true;
  }

  /**
   * Initialize the banner with the given configuration
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
    this.executeAnimations();
  }

  /**
   * Add event listeners for registered elements
   * Uses function references instead of eval() for security
   */
  addListeners() {
    for (const item of this.elementsToRegister) {
      const { eventType, element, handler } = item;

      if (typeof handler !== 'function') {
        console.warn(`Handler for element "${element}" is not a function`);
        continue;
      }

      if (element.charAt(0) === '.') {
        const elements = document.querySelectorAll(element);
        for (const el of elements) {
          el.addEventListener(eventType, handler);
        }
      } else {
        const el = document.querySelector(element);
        if (el) {
          el.addEventListener(eventType, handler);
        }
      }
    }

    if (this.expand) {
      this.setupExpandListeners();
    }
  }

  /**
   * Setup expand/collapse hotspot listeners
   */
  setupExpandListeners() {
    if (this.hotspotExpand.length !== 0) {
      const eventType = this.hotspotExpand[1] || 'click';
      const el = document.querySelector(this.hotspotExpand[0]);
      if (el) {
        el.addEventListener(eventType, () => this.expandEvent());
      }
    } else {
      console.warn('Please add the hotspotExpand');
    }

    if (this.bannerType !== 'in-app') {
      if (this.hotspotClose.length !== 0) {
        const eventType = this.hotspotClose[1] || 'click';
        const el = document.querySelector(this.hotspotClose[0]);
        if (el) {
          el.addEventListener(eventType, () => this.collapseEvent());
        }
      } else {
        console.warn('Please add the hotspotClose');
      }
    }
  }

  /**
   * Register timelines using Map instead of eval()
   * Creates TimelineMax instances and stores them in both Map and Array
   */
  registerTimelines() {
    // Check if TimelineMax is available (GSAP)
    const TimelineClass = typeof TimelineMax !== 'undefined'
      ? TimelineMax
      : (typeof gsap !== 'undefined' && gsap.timeline ? gsap.timeline : null);

    if (!TimelineClass) {
      console.warn('GSAP TimelineMax or gsap.timeline not found');
      return;
    }

    // Create timelines using Map (safe alternative to eval)
    for (const name of this.timelinesName) {
      const timeline = typeof TimelineClass === 'function' && TimelineClass.name === 'TimelineMax'
        ? new TimelineClass()
        : TimelineClass();

      this.timelines.set(name, timeline);
      this.timelinesArray.push(timeline);

      // Also expose on window for backward compatibility
      window[name] = timeline;
    }

    // Call the register function if provided
    if (typeof this.timelinesToRegister.register === 'function') {
      this.timelinesToRegister.register();
    }

    // Pause all timelines after registration
    for (const timeline of this.timelinesArray) {
      timeline.pause();
    }
  }

  /**
   * Execute the first animation frame
   */
  executeAnimations() {
    if (this.animationFrames.length > 0 && typeof this.animationFrames[0] === 'function') {
      this.animationFrames[0]();
    }
  }

  /**
   * Handle expand event - to be overridden by subclasses
   */
  expandEvent() {
    if (typeof this.timelinesToRegister.expandStartAnimation === 'function') {
      this.timelinesToRegister.expandStartAnimation();
    }
  }

  /**
   * Handle collapse event - to be overridden by subclasses
   */
  collapseEvent() {
    if (typeof this.timelinesToRegister.collapseStartAnimation === 'function') {
      this.timelinesToRegister.collapseStartAnimation();
    }
  }

  /**
   * Reset all banner elements and timelines to initial state
   */
  resetWhenCloseOrExit() {
    const TweenClass = typeof TweenMax !== 'undefined' ? TweenMax : (typeof gsap !== 'undefined' ? gsap : null);

    if (!TweenClass) {
      console.warn('GSAP TweenMax or gsap not found');
      return;
    }

    const selectors = [
      '.banner > div',
      '.banner > span',
      '.banner > p',
      '.banner > h1',
      '.banner > h2',
      '.banner > h3',
      '.banner > h4',
      '.banner > a',
      '.banner > input',
      '.banner > canvas'
    ];

    for (const selector of selectors) {
      TweenClass.set(selector, { clearProps: 'all' });
    }

    for (const timeline of this.timelinesArray) {
      timeline.seek(0).pause();
    }

    this.executeAnimations();
  }

  /**
   * Get a timeline by name
   * @param {string} name - Timeline name
   * @returns {Object|undefined} Timeline instance
   */
  getTimeline(name) {
    return this.timelines.get(name);
  }

  /**
   * Get all timeline names
   * @returns {string[]} Array of timeline names
   */
  getTimelineNames() {
    return Array.from(this.timelines.keys());
  }
}
