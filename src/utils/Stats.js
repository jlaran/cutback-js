/**
 * Stats - Debug widget for GSAP timeline animations
 * Provides play/pause controls, timeline scrubbing, and label navigation
 */
export class Stats {
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
