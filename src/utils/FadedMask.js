/**
 * FadedMask - Image slicing utility for creating animated mask effects
 * Slices an image into multiple divs with background-position offsets
 */
export class FadedMask {
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
export const fadedMask = {
  setMask: (options) => FadedMask.setMask(options)
};
