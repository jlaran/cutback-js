# Cutback JS

[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/jlaran/cutback-js/badge)](https://www.jsdelivr.com/package/gh/jlaran/cutback-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-4.0.0-green.svg)](https://github.com/jlaran/cutback-js)

**A professional JavaScript library for creating high-performance HTML5 animated banner advertisements, optimized for Google DoubleClick Studio integration.**

---

## Overview

Cutback JS streamlines the development of interactive HTML5 banner ads by providing a robust abstraction layer over complex advertising platform APIs and animation frameworks. Originally developed to accelerate ad production workflows, this library has been used in production environments to deliver scalable, maintainable banner campaigns.

### Key Highlights

- **ES6 Module Architecture**: Modern class-based design with ES modules and UMD bundles
- **Production-Ready**: Battle-tested in real advertising campaigns
- **DoubleClick Integration**: Native support for Google DoubleClick Studio's Enabler API
- **Animation Engine**: Built on GreenSock (GSAP) for smooth, high-performance animations
- **Developer Experience**: Includes debugging tools and timeline visualization
- **Flexible Architecture**: Supports standard, expandable, and polite-load banner types
- **Security-First**: Removed all eval() calls, using safe function references

---

## What's New in v4.0

- **ES6 Classes**: Modern class syntax with inheritance (`Banner extends BaseBanner`)
- **ES Modules**: Native ESM support with UMD fallback for browsers
- **Rollup Build**: Optimized bundles (ESM, UMD, minified)
- **No More eval()**: Secure timeline management using Map instead of eval()
- **Function Handlers**: Pass functions directly instead of string function names
- **Private Class Fields**: Stats widget uses private fields for encapsulation
- **Template Literals**: Clean HTML generation in utilities

---

## Technical Skills Demonstrated

This project showcases proficiency in:

| Category | Technologies & Skills |
|----------|----------------------|
| **Languages** | JavaScript (ES6+), HTML5, CSS3 |
| **Animation** | GreenSock Animation Platform (GSAP), TimelineMax, TweenMax |
| **Ad Tech** | Google DoubleClick Studio, Enabler.js API, Rich Media Ads |
| **Architecture** | ES6 classes, Inheritance, ES modules, Event-driven programming |
| **Build Tools** | Rollup, npm scripts, Terser minification |
| **API Design** | Declarative configuration, Callback management, State handling |
| **Custom Tooling** | Visual debugger (Stats), Image slicer utility (FadedMask) |
| **Distribution** | CDN deployment (jsDelivr), npm packaging, ESM/UMD dual builds |

---

## Installation

### NPM (Recommended)

```bash
npm install cutback-js
```

### ES Modules

```javascript
import { Banner, GenericBanner, Stats, FadedMask } from 'cutback-js';
```

### CDN (UMD Bundle)

```html
<!-- Required: GreenSock Animation Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

<!-- Required for DoubleClick: Enabler API -->
<script src="https://s0.2mdn.net/ads/studio/Enabler.js"></script>

<!-- Cutback JS v4 -->
<script src="https://cdn.jsdelivr.net/gh/jlaran/cutback-js@latest/dist/cutback.min.js"></script>
```

With UMD, all exports are available under the `Cutback` namespace:
```javascript
const banner = new Cutback.Banner({...});
const stats = new Cutback.Stats();
```

---

## Quick Start

### ES Module Usage

```javascript
import { Banner } from 'cutback-js';

const banner = new Banner({
    timelinesName: ['mainTimeline'],
    elementsToRegister: [
        { eventType: 'click', element: '#cta-button', handler: () => handleClick() }
    ],
    animationFrames: [
        () => mainTimeline.play()
    ],
    timelinesToRegister: {
        register() {
            mainTimeline
                .from('.logo', { opacity: 0, scale: 0.8, duration: 0.5 })
                .from('.headline', { opacity: 0, y: 20, duration: 0.4 })
                .from('.cta', { opacity: 0, scale: 0.9, duration: 0.3 });
        }
    }
});

function handleClick() {
    Enabler.exit('CTA Click');
}
```

### UMD/Script Tag Usage

```html
<script>
const banner = new Cutback.Banner({
    timelinesName: ['mainTimeline'],
    elementsToRegister: [
        { eventType: 'click', element: '#cta-button', handler: () => handleClick() }
    ],
    animationFrames: [
        () => mainTimeline.play()
    ],
    timelinesToRegister: {
        register() {
            mainTimeline
                .from('.logo', { opacity: 0, scale: 0.8, duration: 0.5 })
                .from('.headline', { opacity: 0, y: 20, duration: 0.4 })
                .from('.cta', { opacity: 0, scale: 0.9, duration: 0.3 });
        }
    }
});

function handleClick() {
    Enabler.exit('CTA Click');
}
</script>
```

### Generic Banner (No DoubleClick)

```javascript
import { GenericBanner } from 'cutback-js';

const banner = new GenericBanner({
    timelinesName: ['mainTimeline'],
    animationFrames: [() => mainTimeline.play()],
    timelinesToRegister: {
        register() {
            mainTimeline.to('.box', { x: 200, duration: 1 });
        }
    }
});
```

---

## API Changes from v3 to v4

### Event Handlers

**Before (v3):**
```javascript
elementsToRegister: [
    { eventType: 'click', element: '#btn', functionToCall: 'handleClick' }
]
```

**After (v4):**
```javascript
elementsToRegister: [
    { eventType: 'click', element: '#btn', handler: () => handleClick() }
]
```

### Timeline Access

**Before (v3):**
```javascript
timelinesArray[0].to('.element', 0.5, { opacity: 1 });
```

**After (v4):**
```javascript
// Via Map (recommended):
banner.timelines.get('mainTimeline').to('.element', { opacity: 1, duration: 0.5 });

// Via array (backward compatible):
banner.timelinesArray[0].to('.element', { opacity: 1, duration: 0.5 });

// Via window global (legacy):
mainTimeline.to('.element', { opacity: 1, duration: 0.5 });
```

### Import/Namespace

**Before (v3):**
```html
<script src="cutback.min.js"></script>
<script>
var banner = new Banner({...});
</script>
```

**After (v4):**
```html
<script src="dist/cutback.min.js"></script>
<script>
const banner = new Cutback.Banner({...});
</script>
```

---

## Banner Classes

### Banner (DoubleClick)

Full DoubleClick Studio integration with Enabler API.

```javascript
import { Banner } from 'cutback-js';

const banner = new Banner({
    bannerType: 'in-page',
    expand: true,
    finalExpandSize: [0, 0, 320, 460],
    doubleClickTracking: true,
    timelinesName: ['mainTimeline', 'loopTimeline'],
    // ... configuration
});
```

### PoliteBanner

Waits for polite-load event before executing animations.

```javascript
import { PoliteBanner } from 'cutback-js';

const banner = new PoliteBanner({
    // Same configuration as Banner
});
```

### GenericBanner

Standalone banner without DoubleClick dependency.

```javascript
import { GenericBanner } from 'cutback-js';

const banner = new GenericBanner({
    timelinesName: ['mainTimeline'],
    // ... configuration (no doubleClickTracking)
});
```

---

## Utilities

### Stats - Animation Debugger

A visual debugging tool for timeline animations during development.

```javascript
import { Stats } from 'cutback-js';

// After creating your banner:
const stats = new Stats(banner);
// Or it will auto-connect to window.banner
```

#### Features

| Feature | Description |
|---------|-------------|
| **Playback Controls** | Play, Pause, and Restart buttons |
| **Timeline Scrubbing** | Drag slider to seek to any point |
| **Label Navigation** | Jump to named labels via dropdown |
| **Multi-Timeline Support** | Switch between multiple timelines |
| **Real-Time Display** | Live current time and total duration |
| **Draggable Widget** | Reposition the debug panel anywhere |

### FadedMask - Image Reveal Effects

Creates animated image slice effects with directional reveals.

```javascript
import { FadedMask } from 'cutback-js';

FadedMask.setMask({
    container: '#image-container',
    imageUrl: 'images/hero.jpg',
    imageWidth: 300,
    imageHeight: 250,
    maskWidth: 10,
    maskClass: 'slice',
    direction: 'left-right'
});

// Animate with GSAP
mainTimeline.from('.slice', { opacity: 0, x: -20, stagger: 0.05, duration: 0.3 });
```

#### Directions

| Direction | Effect |
|-----------|--------|
| `left-right` | Slices reveal from left to right |
| `right-left` | Slices reveal from right to left |
| `top-bottom` | Slices reveal from top to bottom |
| `bottom-top` | Slices reveal from bottom to top |

---

## Configuration Reference

### Core Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `bannerType` | string | `'in-page'` | Banner type: `'in-page'` or `'in-app'` |
| `expand` | boolean | `false` | Enable expandable banner functionality |
| `finalExpandSize` | array | `[0,0,0,0]` | Expand dimensions: `[left, top, right, bottom]` |
| `startExpanded` | boolean | `false` | Initial expanded state |
| `doubleClickTracking` | boolean | `true` | Enable DoubleClick tracking (Banner only) |
| `autoInit` | boolean | `true` | Auto-initialize on window load |

### Event Registration

| Parameter | Type | Description |
|-----------|------|-------------|
| `elementsToRegister` | array | Element-event-handler bindings |
| `hotspotExpand` | array | Element triggering expand: `['#selector', 'event']` |
| `hotspotClose` | array | Element triggering collapse: `['#selector', 'event']` |

### Animation System

| Parameter | Type | Description |
|-----------|------|-------------|
| `timelinesName` | array | Named timeline identifiers |
| `timelinesToRegister` | object | Timeline registration and lifecycle callbacks |
| `animationFrames` | array | Animation frame functions (first executes automatically) |

### Lifecycle Callbacks (timelinesToRegister)

```javascript
timelinesToRegister: {
    register() { /* Called when timelines are created */ },
    expandStartAnimation() { /* Called on expand start */ },
    expandFinishAnimation() { /* Called on expand complete */ },
    collapseStartAnimation() { /* Called on collapse start */ },
    collapseFinishAnimation() { /* Called on collapse complete */ }
}
```

---

## Architecture

```
cutback-js/
├── src/
│   ├── core/
│   │   └── BaseBanner.js        # Base class with shared functionality
│   ├── banners/
│   │   ├── Banner.js            # DoubleClick banner
│   │   ├── PoliteBanner.js      # Polite-load variant
│   │   └── GenericBanner.js     # Non-DoubleClick variant
│   ├── utils/
│   │   ├── FadedMask.js         # Image slicing utility
│   │   └── Stats.js             # Debug widget
│   └── index.js                 # Main entry point
├── dist/
│   ├── cutback.esm.js           # ES Module bundle
│   ├── cutback.umd.js           # UMD bundle
│   ├── cutback.min.js           # Minified UMD
│   └── cutback-stats.min.js     # Standalone stats widget
├── rollup.config.js
└── package.json
```

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript environment
- CSS3 transforms and transitions

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Authors

- **Juan Carlos Lara** - *Lead Developer*
- **Gabriel Aguilar** - *Co-Developer*

---

## Links

- **Repository**: [github.com/jlaran/cutback-js](https://github.com/jlaran/cutback-js)
- **CDN**: [jsDelivr](https://www.jsdelivr.com/package/gh/jlaran/cutback-js)
- **GreenSock**: [gsap.com](https://gsap.com)
- **DoubleClick Studio**: [Google Marketing Platform](https://marketingplatform.google.com)
