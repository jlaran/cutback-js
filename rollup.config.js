import terser from '@rollup/plugin-terser';

const banner = `/**
 * Cutback JS v4.0.0
 * A library for creating HTML5 banner ads with GSAP animations
 * https://github.com/jlaran/cutback-js
 */`;

export default [
  // ESM build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/cutback.esm.js',
      format: 'esm',
      banner
    }
  },
  // UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/cutback.umd.js',
      format: 'umd',
      name: 'Cutback',
      banner
    }
  },
  // Minified UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/cutback.min.js',
      format: 'umd',
      name: 'Cutback',
      plugins: [terser()]
    }
  },
  // Standalone Stats widget (minified)
  {
    input: 'src/utils/Stats.js',
    output: {
      file: 'dist/cutback-stats.min.js',
      format: 'umd',
      name: 'CutbackStats',
      plugins: [terser()]
    }
  }
];
