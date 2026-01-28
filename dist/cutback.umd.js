/**
 * Cutback JS v4.0.0
 * A library for creating HTML5 banner ads with GSAP animations
 * https://github.com/jlaran/cutback-js
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Cutback = {}));
})(this, (function (exports) { 'use strict';

  /**
   * BaseBanner - Base class for all banner types
   * Contains shared functionality for timeline management and event handling
   */
  class BaseBanner {
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

  /**
   * Banner - DoubleClick Studio banner implementation
   * Extends BaseBanner with Enabler integration for tracking and expand/collapse lifecycle
   */
  class Banner extends BaseBanner {
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

  /**
   * PoliteBanner - Polite-load variant of DoubleClick banner
   * Waits for page assets to fully load before initializing animations
   */
  class PoliteBanner extends Banner {
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

  /**
   * GenericBanner - Non-DoubleClick banner implementation
   * Simplified banner without any ad platform dependencies
   */
  class GenericBanner extends BaseBanner {
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

  /**
   * FadedMask - Image slicing utility for creating animated mask effects
   * Slices an image into multiple divs with background-position offsets
   */
  class FadedMask {
    /**
     * Create a faded mask effect by slicing an image
     * @param {Object} options - Configuration options
     * @param {string} options.container - CSS selector for the container element
     * @param {string} options.imageUrl - URL of the image to slice
     * @param {number} options.imageWidth - Width of the image in pixels
     * @param {number} options.imageHeight - Height of the image in pixels
     * @param {number} options.maskWidth - Width of each slice in pixels
     * @param {string} options.maskClass - CSS class to apply to each slice
     * @param {string} [options.direction='left-right'] - Direction of slicing: 'left-right', 'right-left', 'top-bottom', 'bottom-top'
     */
    static setMask(options) {
      const container = document.querySelector(options.container);

      if (!container) {
        console.warn(`FadedMask: Container "${options.container}" not found`);
        return;
      }

      const {
        imageUrl,
        imageWidth,
        imageHeight,
        maskWidth,
        maskClass,
        direction = 'left-right'
      } = options;

      const isVertical = direction === 'top-bottom' || direction === 'bottom-top';
      const slicesQuantity = Math.floor(
        isVertical ? imageHeight / maskWidth : imageWidth / maskWidth
      );

      const slices = [];

      for (let i = 0; i < slicesQuantity; i++) {
        const style = this.getSliceStyle(
          direction,
          i,
          imageUrl,
          imageWidth,
          imageHeight,
          maskWidth
        );

        slices.push(`<div class="${maskClass}" style="${style}"></div>`);
      }

      container.innerHTML = slices.join('');
    }

    /**
     * Generate inline style for a slice based on direction
     * @private
     */
    static getSliceStyle(direction, index, imageUrl, imageWidth, imageHeight, maskWidth) {
      const baseStyle = `background-image: url(${imageUrl}); background-repeat: no-repeat; position: absolute;`;

      switch (direction) {
        case 'left-right':
          return `${baseStyle} background-position: ${-maskWidth * index}px 0px; top: 0px; left: ${maskWidth * index}px; width: ${maskWidth}px; height: ${imageHeight}px;`;

        case 'right-left':
          return `${baseStyle} background-position: ${maskWidth * (index + 1)}px 0px; top: 0px; left: ${imageWidth - maskWidth * (index + 1)}px; width: ${maskWidth}px; height: ${imageHeight}px;`;

        case 'top-bottom':
          return `${baseStyle} background-position: 0px ${-maskWidth * index}px; top: ${maskWidth * index}px; left: 0px; width: ${imageWidth}px; height: ${maskWidth}px;`;

        case 'bottom-top':
          return `${baseStyle} background-position: 0px ${maskWidth * (index + 1)}px; top: ${imageHeight - maskWidth * (index + 1)}px; left: 0px; width: ${imageWidth}px; height: ${maskWidth}px;`;

        default:
          return `${baseStyle} background-position: ${-maskWidth * index}px 0px; top: 0px; left: ${maskWidth * index}px; width: ${maskWidth}px; height: ${imageHeight}px;`;
      }
    }
  }

  // For backward compatibility, also export as default instance-like object
  const fadedMask = {
    setMask: (options) => FadedMask.setMask(options)
  };

  /**
   * Stats - Debug widget for GSAP timeline animations
   * Provides play/pause controls, timeline scrubbing, and label navigation
   */
  class Stats {
    // Private fields for internal state
    #currentTimeline = null;
    #timelinesArray = [];
    #banner = null;
    #elements = {};
    #dragState = { initX: 0, initY: 0, mousePressX: 0, mousePressY: 0 };

    /**
     * Create a Stats debug widget
     * @param {Object} [banner] - Banner instance to debug (defaults to window.banner)
     */
    constructor(banner = null) {
      this.#banner = banner;

      window.addEventListener('load', () => {
        this.initializeStats();
      });
    }

    /**
     * Initialize the stats widget
     */
    initializeStats() {
      this.buildStats();
      this.cacheElements();
      this.addHoverEffects();
      this.setTimeline();
    }

    /**
     * Set up timeline references from the banner
     */
    setTimeline() {
      // Get banner reference
      const bannerRef = this.#banner || window.banner;

      if (!bannerRef) {
        console.warn('Stats: No banner instance found');
        return;
      }

      this.#banner = bannerRef;
      this.#timelinesArray = bannerRef.timelinesArray || [];

      if (this.#timelinesArray.length === 0) {
        console.warn('Stats: No timelines found in banner');
        return;
      }

      this.#currentTimeline = this.#timelinesArray[0];
      this.registerEventHandlers();
      this.fillTimelinesSelect();
    }

    /**
     * Build the stats widget HTML
     */
    buildStats() {
      const firstBanner = document.querySelector('.banner');
      if (!firstBanner) {
        console.warn('Stats: No .banner element found');
        return;
      }

      const divStats = document.createElement('div');
      divStats.id = 'stats';
      Object.assign(divStats.style, {
        width: '300px',
        height: '130px',
        backgroundColor: '#ccc',
        position: 'fixed',
        bottom: '0',
        right: '0',
        opacity: '0.5',
        borderRadius: '10px',
        zIndex: '9999'
      });

      divStats.addEventListener('mouseover', () => {
        divStats.style.opacity = '1';
      });

      divStats.addEventListener('mouseout', () => {
        divStats.style.opacity = '0.5';
      });

      divStats.innerHTML = `
      <p id="currenttime" style="font-family: Arial, sans-serif; color: #666; font-size: 30px; position: absolute; bottom: 85px; left: 14px; opacity: 0.5; margin: 0;">00.00</p>
      <p id="totaltime" style="font-family: Arial, sans-serif; color: #666; font-size: 20px; position: absolute; bottom: 88px; left: 101px; opacity: 0.5; margin: 0;">00.00</p>
      <input id="slider-timeline" type="range" min="0" step="0.01" max="274" value="0" style="position: absolute; bottom: 60px; width: 274px; left: 10px;">
      <select id="flags" style="position: absolute; bottom: 20px; right: 14px; width: 120px;"></select>
      <select id="timelines" style="position: absolute; bottom: 90px; right: 14px; width: 120px;"></select>
      <span id="play" style="font-family: Arial, sans-serif; color: #fff; font-size: 16px; position: absolute; bottom: 10px; left: 14px; cursor: pointer; background-color: #999; padding: 10px 8px; border-radius: 10px; width: 46px; text-align: center;">Play</span>
      <span id="restart" style="font-family: Arial, sans-serif; color: #fff; font-size: 16px; position: absolute; bottom: 10px; left: 84px; cursor: pointer; background-color: #999; padding: 10px 8px; border-radius: 10px;">Restart</span>
    `;

      firstBanner.parentNode.insertBefore(divStats, firstBanner.nextSibling);
    }

    /**
     * Cache DOM element references
     */
    cacheElements() {
      this.#elements = {
        statDiv: document.getElementById('stats'),
        playButton: document.getElementById('play'),
        restartButton: document.getElementById('restart'),
        sliderTimeline: document.getElementById('slider-timeline'),
        selectFlags: document.getElementById('flags'),
        selectTimelines: document.getElementById('timelines'),
        totalTimeDisplay: document.getElementById('totaltime'),
        currentTimeDisplay: document.getElementById('currenttime')
      };
    }

    /**
     * Add hover effects to buttons
     */
    addHoverEffects() {
      const { playButton, restartButton } = this.#elements;

      if (playButton) {
        playButton.addEventListener('mouseover', () => {
          playButton.style.backgroundColor = '#666666';
        });
        playButton.addEventListener('mouseout', () => {
          playButton.style.backgroundColor = '#999999';
        });
      }

      if (restartButton) {
        restartButton.addEventListener('mouseover', () => {
          restartButton.style.backgroundColor = '#666666';
        });
        restartButton.addEventListener('mouseout', () => {
          restartButton.style.backgroundColor = '#999999';
        });
      }
    }

    /**
     * Register all event handlers
     */
    registerEventHandlers() {
      const {
        statDiv,
        playButton,
        restartButton,
        selectFlags,
        selectTimelines,
        sliderTimeline
      } = this.#elements;

      if (statDiv) {
        statDiv.addEventListener('mousedown', (e) => this.handleDragStart(e));
      }

      if (playButton) {
        playButton.addEventListener('click', () => this.togglePlay());
      }

      if (restartButton) {
        restartButton.addEventListener('click', () => this.restartTimeline());
      }

      if (selectFlags) {
        selectFlags.addEventListener('change', () => this.goToLabel());
      }

      if (selectTimelines) {
        selectTimelines.addEventListener('change', () => this.switchTimeline());
      }

      if (sliderTimeline) {
        sliderTimeline.addEventListener('input', () => this.scrubTimeline());
        sliderTimeline.addEventListener('change', () => this.scrubTimeline());
      }
    }

    /**
     * Handle drag start for widget repositioning
     */
    handleDragStart(e) {
      const { statDiv, sliderTimeline } = this.#elements;

      if (e.target === sliderTimeline) return;

      this.#dragState = {
        initX: statDiv.offsetLeft,
        initY: statDiv.offsetTop,
        mousePressX: e.clientX,
        mousePressY: e.clientY
      };

      const handleMove = (event) => this.handleDragMove(event);
      const handleUp = () => {
        statDiv.removeEventListener('mousemove', handleMove);
        statDiv.style.cursor = 'default';
      };

      statDiv.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp, { once: true });
    }

    /**
     * Handle drag move for widget repositioning
     */
    handleDragMove(event) {
      const { statDiv } = this.#elements;
      const { initX, initY, mousePressX, mousePressY } = this.#dragState;

      statDiv.style.cursor = 'move';
      statDiv.style.left = `${initX + event.clientX - mousePressX}px`;
      statDiv.style.top = `${initY + event.clientY - mousePressY}px`;
      statDiv.style.right = 'auto';
      statDiv.style.bottom = 'auto';
    }

    /**
     * Toggle play/pause state
     */
    togglePlay() {
      const { playButton } = this.#elements;

      if (!this.#currentTimeline) return;

      if (this.#currentTimeline.paused()) {
        if (this.#currentTimeline.totalDuration() === this.#currentTimeline.time()) {
          this.#currentTimeline.restart();
        } else {
          this.#currentTimeline.play();
        }
        playButton.textContent = 'Pause';
      } else {
        this.#currentTimeline.pause();
        playButton.textContent = 'Play';
      }
    }

    /**
     * Restart the current timeline
     */
    restartTimeline() {
      if (this.#currentTimeline) {
        this.#currentTimeline.restart();
      }
    }

    /**
     * Jump to selected label
     */
    goToLabel() {
      const { selectFlags } = this.#elements;

      if (this.#currentTimeline && selectFlags) {
        const selectedLabel = selectFlags.options[selectFlags.selectedIndex].text;
        this.#currentTimeline.seek(selectedLabel).play();
      }
    }

    /**
     * Scrub timeline to slider position
     */
    scrubTimeline() {
      const { sliderTimeline, currentTimeDisplay } = this.#elements;

      if (this.#currentTimeline && sliderTimeline) {
        this.#currentTimeline.seek(parseFloat(sliderTimeline.value));
        currentTimeDisplay.textContent = this.#currentTimeline.time().toFixed(2);
      }
    }

    /**
     * Switch to selected timeline
     */
    switchTimeline() {
      const { selectTimelines, sliderTimeline } = this.#elements;

      if (!selectTimelines) return;

      if (this.#currentTimeline) {
        this.#currentTimeline.seek(0);
      }

      const selectedIndex = selectTimelines.options[selectTimelines.selectedIndex].value;
      this.#currentTimeline = this.#timelinesArray[parseInt(selectedIndex, 10)];

      if (sliderTimeline) {
        sliderTimeline.value = '0';
      }

      this.updateTimelineDisplay();
    }

    /**
     * Fill the timelines dropdown
     */
    fillTimelinesSelect() {
      const { selectTimelines } = this.#elements;
      const bannerRef = this.#banner;

      if (!selectTimelines || !bannerRef) return;

      const timelinesName = bannerRef.timelinesName || [];
      const options = timelinesName.map((name, i) =>
        `<option value="${i}">${name}</option>`
      ).join('');

      selectTimelines.innerHTML = options;

      // Register onStart callbacks
      for (const timeline of this.#timelinesArray) {
        timeline.eventCallback('onStart', () => this.handleTimelineStart(timeline));
      }

      this.updateTimelineDisplay();
    }

    /**
     * Handle timeline start event
     */
    handleTimelineStart(timeline) {
      const { selectTimelines } = this.#elements;

      this.#currentTimeline = timeline;
      const index = this.#timelinesArray.indexOf(timeline);

      if (selectTimelines && index >= 0) {
        selectTimelines.selectedIndex = index;
      }

      this.updateTimelineDisplay();
    }

    /**
     * Update the timeline display (labels, times, slider)
     */
    updateTimelineDisplay() {
      const {
        selectFlags,
        currentTimeDisplay,
        totalTimeDisplay,
        sliderTimeline
      } = this.#elements;

      if (!this.#currentTimeline) return;

      // Update labels dropdown
      if (selectFlags) {
        const labels = this.#currentTimeline.getLabelsArray?.() || [];
        const options = labels.map(label =>
          `<option value="${label.time}">${label.name}</option>`
        ).join('');
        selectFlags.innerHTML = options;
      }

      // Update time displays
      if (currentTimeDisplay) {
        currentTimeDisplay.textContent = this.#currentTimeline.time().toFixed(2);
      }

      if (totalTimeDisplay) {
        totalTimeDisplay.textContent = this.#currentTimeline.totalDuration().toFixed(2);
      }

      if (sliderTimeline) {
        sliderTimeline.max = this.#currentTimeline.totalDuration().toFixed(2);
      }

      // Register update callbacks
      this.#currentTimeline.eventCallback('onUpdate', () => this.handleTimelineUpdate());
      this.#currentTimeline.eventCallback('onComplete', () => this.handleTimelineComplete());
    }

    /**
     * Handle timeline update event
     */
    handleTimelineUpdate() {
      const { currentTimeDisplay, sliderTimeline, playButton } = this.#elements;

      if (!this.#currentTimeline) return;

      const time = this.#currentTimeline.time().toFixed(2);

      if (currentTimeDisplay) {
        currentTimeDisplay.textContent = time;
      }

      if (sliderTimeline) {
        sliderTimeline.value = time;
      }

      if (playButton) {
        playButton.textContent = 'Pause';
      }
    }

    /**
     * Handle timeline complete event
     */
    handleTimelineComplete() {
      const { playButton } = this.#elements;

      if (playButton) {
        playButton.textContent = 'Play';
      }

      if (this.#currentTimeline) {
        this.#currentTimeline.pause();
      }
    }

    /**
     * Get the current timeline
     * @returns {Object|null} Current timeline instance
     */
    getCurrentTimeline() {
      return this.#currentTimeline;
    }

    /**
     * Set banner instance
     * @param {Object} banner - Banner instance
     */
    setBanner(banner) {
      this.#banner = banner;
      this.setTimeline();
    }
  }

  exports.Banner = Banner;
  exports.BaseBanner = BaseBanner;
  exports.FadedMask = FadedMask;
  exports.GenericBanner = GenericBanner;
  exports.PoliteBanner = PoliteBanner;
  exports.Stats = Stats;
  exports.fadedMask = fadedMask;

}));
