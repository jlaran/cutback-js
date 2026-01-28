# Cutback JS

[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/jlaran/cutback-js/badge)](https://www.jsdelivr.com/package/gh/jlaran/cutback-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.5.3-green.svg)](https://github.com/jlaran/cutback-js)

**A professional JavaScript library for creating high-performance HTML5 animated banner advertisements, optimized for Google DoubleClick Studio integration.**

---

## Overview

Cutback JS streamlines the development of interactive HTML5 banner ads by providing a robust abstraction layer over complex advertising platform APIs and animation frameworks. Originally developed to accelerate ad production workflows, this library has been used in production environments to deliver scalable, maintainable banner campaigns.

### Key Highlights

- **Production-Ready**: Battle-tested in real advertising campaigns
- **DoubleClick Integration**: Native support for Google DoubleClick Studio's Enabler API
- **Animation Engine**: Built on GreenSock (GSAP) for smooth, high-performance animations
- **Developer Experience**: Includes debugging tools and timeline visualization
- **Flexible Architecture**: Supports standard, expandable, and polite-load banner types

---

## Technical Skills Demonstrated

This project showcases proficiency in:

| Category | Technologies & Skills |
|----------|----------------------|
| **Languages** | JavaScript (ES5), HTML5, CSS3 |
| **Animation** | GreenSock Animation Platform (GSAP), TimelineMax, TweenMax |
| **Ad Tech** | Google DoubleClick Studio, Enabler.js API, Rich Media Ads |
| **Architecture** | Modular library design, Event-driven programming, IIFE patterns |
| **API Design** | Declarative configuration, Callback management, State handling |
| **Custom Tooling** | Visual debugger (Cutback Stats), Image slicer utility (Cutback Mask) |
| **Distribution** | CDN deployment (jsDelivr), npm packaging, minification |
| **UI/UX** | Draggable widgets, Real-time visualization, Developer experience |

---

## Features

### Banner Configuration System
Single configuration object pattern for clean, declarative banner setup:

```javascript
var banner = new Banner({
    bannerType: "in-page",
    expand: true,
    finalExpandSize: [0, 0, 320, 460],
    timelinesName: ["mainTimeline", "loopTimeline"],
    animationFrames: [
        function intro() { /* Animation logic */ }
    ],
    timelinesAnimation: {
        register: function() {
            timelinesArray[0].to(".headline", 0.5, {opacity: 1, y: 0});
            timelinesArray[0].to(".cta", 0.3, {scale: 1, ease: Back.easeOut});
        }
    }
});
```

### Timeline Management
- Multiple named timelines with independent control
- Pause, resume, restart, and seek functionality
- Label-based navigation for complex animations
- Synchronized animation sequences

### Expandable Banner Support
- Configurable expand/collapse dimensions
- Event-driven lifecycle management
- Separate animation callbacks for each state
- Mobile orientation support

---

## Cutback Stats - Animation Debugger

A powerful visual debugging tool for timeline animations during development.

![Cutback Stats Widget](https://img.shields.io/badge/Tool-Debug%20Widget-orange)

### Features

| Feature | Description |
|---------|-------------|
| **Playback Controls** | Play, Pause, and Restart buttons with visual state feedback |
| **Timeline Scrubbing** | Drag slider to seek to any point in the animation |
| **Label Navigation** | Jump to named labels via dropdown selector |
| **Multi-Timeline Support** | Switch between multiple timelines in complex animations |
| **Real-Time Display** | Live current time and total duration counters |
| **Draggable Widget** | Reposition the debug panel anywhere on screen |
| **Auto-Hide Opacity** | Semi-transparent when idle, full opacity on hover |

### Usage

```html
<!-- Add during development, remove for production -->
<script src="https://cdn.jsdelivr.net/gh/jlaran/cutback-js@latest/cutback-stats.min.js"></script>
```

The widget automatically attaches to the page and connects to your banner's timelines. Use timeline labels for easy navigation:

```javascript
timelinesArray[0]
    .addLabel("intro")
    .to(".logo", 0.5, {opacity: 1})
    .addLabel("headline")
    .to(".headline", 0.4, {y: 0})
    .addLabel("cta")
    .to(".cta", 0.3, {scale: 1});
```

---

## Cutback Mask - Image Reveal Effects

A utility for creating dynamic image slice animations with directional reveal effects.

![Cutback Mask](https://img.shields.io/badge/Tool-Animation%20Utility-blue)

### Directional Modes

| Direction | Effect |
|-----------|--------|
| `left-right` | Slices reveal from left to right |
| `right-left` | Slices reveal from right to left |
| `top-bottom` | Slices reveal from top to bottom |
| `bottom-top` | Slices reveal from bottom to top |

### Usage

```javascript
// Split image into animated slices
fadedMask.setMask({
    container: "#image-container",
    imageUrl: "images/hero.jpg",
    imageWidth: 300,
    imageHeight: 250,
    maskWidth: 10,           // Slice width in pixels
    maskClass: "slice",      // CSS class for targeting
    direction: "left-right"  // Animation direction
});

// Animate slices with staggered effect
timelinesArray[0].staggerFrom(".slice", 0.3, {
    opacity: 0,
    x: -20
}, 0.05);
```

### How It Works

The utility dynamically generates individual `<div>` elements, each displaying a portion of the source image using CSS `background-position`. This creates animatable slices that can be staggered with GSAP for smooth wipe/reveal transitions.

```
Original Image          →    Sliced Output
┌─────────────────┐         ┌─┬─┬─┬─┬─┬─┬─┐
│                 │         │ │ │ │ │ │ │ │
│   hero.jpg      │    →    │ │ │ │ │ │ │ │  ← Each slice animates independently
│                 │         │ │ │ │ │ │ │ │
└─────────────────┘         └─┴─┴─┴─┴─┴─┴─┘
```

---

## Architecture

```
cutback-js/
├── cutback.js           # Core library with DoubleClick integration
├── cutback-polite.js    # Polite-load variant for delayed initialization
├── cutback_generic.js   # Lightweight version without DoubleClick dependency
├── cutbackMask.js       # Image slicing for reveal animations
├── cutback-stats.js     # Visual debugging & timeline inspector
└── *.min.js             # Production-ready minified versions
```

### Library Components

| Component | Purpose | Use Case |
|-----------|---------|----------|
| `cutback.min.js` | Core banner library | Standard DoubleClick banners |
| `cutback-polite.min.js` | Polite-load variant | Delayed initialization campaigns |
| `cutback_generic.min.js` | Standalone version | Non-DoubleClick deployments |
| `cutbackMask.min.js` | Image slicer | Wipe/reveal animation effects |
| `cutback-stats.min.js` | Debug inspector | Development & QA testing |

---

## Quick Start

### CDN Installation

```html
<!-- Required: GreenSock Animation Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.2/TweenMax.min.js"></script>

<!-- Required for DoubleClick: Enabler API -->
<script src="https://s0.2mdn.net/ads/studio/Enabler.js"></script>

<!-- Cutback JS -->
<script src="https://cdn.jsdelivr.net/gh/jlaran/cutback-js@latest/cutback.min.js"></script>
```

### Basic Implementation

```javascript
var banner = new Banner({
    timelinesName: ["mainTimeline"],
    elementsToRegister: [
        {eventType: "click", element: "#cta-button", functionToCall: "handleClick"}
    ],
    animationFrames: [
        function firstFrame() {
            timelinesArray[0].play();
        }
    ],
    timelinesAnimation: {
        register: function() {
            timelinesArray[0]
                .from(".logo", 0.5, {opacity: 0, scale: 0.8})
                .from(".headline", 0.4, {opacity: 0, y: 20})
                .from(".cta", 0.3, {opacity: 0, scale: 0.9});
        }
    }
});

function handleClick() {
    Enabler.exit("CTA Click");
}
```

---

## Configuration Reference

### Core Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `bannerType` | string | `"in-page"` | Banner type: `"in-page"` or `"in-app"` |
| `expand` | boolean | `false` | Enable expandable banner functionality |
| `finalExpandSize` | array | `[0,0,0,0]` | Expand dimensions: `[x, y, width, height]` |
| `startExpanded` | boolean | `false` | Initial expanded state |
| `doubleClickTracking` | boolean | `true` | Enable DoubleClick tracking |

### Event Registration

| Parameter | Type | Description |
|-----------|------|-------------|
| `elementsToRegister` | array | Element-event-callback bindings |
| `hotspotExpand` | array | Element triggering expand: `["#selector", "event"]` |
| `hotspotClose` | array | Element triggering collapse: `["#selector", "event"]` |

### Animation System

| Parameter | Type | Description |
|-----------|------|-------------|
| `timelinesName` | array | Named timeline identifiers |
| `timelinesAnimation` | object | Timeline registration and lifecycle callbacks |
| `animationFrames` | array | Animation frame functions (first executes automatically) |

---

## Event Lifecycle

The library manages the complete DoubleClick banner lifecycle:

```
Window Load → Initialize Banner → Setup DoubleClick Listeners
                                          ↓
                              Wait for Enabler INIT
                                          ↓
                              Register Event Listeners
                                          ↓
                              Wait for PAGE_LOADED/VISIBLE
                                          ↓
                              Execute Animation Frames
```

**Supported Events:**
- `INIT` - Enabler initialization complete
- `PAGE_LOADED` - All page resources ready
- `VISIBLE` - Banner enters viewport
- `EXPAND_START` / `EXPAND_FINISH` - Expansion lifecycle
- `COLLAPSE_START` / `COLLAPSE_FINISH` - Collapse lifecycle
- `ORIENTATION` - Device orientation change (mobile)

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES5 JavaScript environment
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
- **GreenSock**: [greensock.com](https://greensock.com)
- **DoubleClick Studio**: [Google Marketing Platform](https://marketingplatform.google.com)
