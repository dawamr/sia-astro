// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  // Server rendering with Cloudflare adapter
  // Use 'export const prerender = true' in pages for static generation
  output: 'server',
  
  // Cloudflare Pages adapter
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true,
    },
  }),

  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@lib': '/src/lib',
        '@types': '/src/types',
        '@stores': '/src/lib/stores',
        '@utils': '/src/lib/utils',
      },
    },
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    svelte(),
  ],

  // Security headers
  server: {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
});