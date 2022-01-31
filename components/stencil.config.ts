import { Config } from '@stencil/core';

import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import cssnano from 'cssnano';
import purgecss from '@fullhuman/postcss-purgecss';

//purge function to keep only the classes used in EACH component
const purge = purgecss({
  content: ['./src/**/*.tsx', './src/index.html'],
  safelist: [':host'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

export const config: Config = {
  namespace: 'flinkey-web-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    postcss({
      // add postcss plugins
      plugins: [tailwindcss('./tailwind.config.js'), autoprefixer(), ...(process.env.NODE_ENV === 'production' ? [purgecss, require('cssnano')] : [])],
    }),
  ],
  devServer: {
    reloadStrategy: 'pageReload',
  },
};
