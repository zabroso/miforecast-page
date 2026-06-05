import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://zabroso.github.io',
  base: '/miforecast-page',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
});
