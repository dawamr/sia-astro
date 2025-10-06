import type { Config } from 'tailwindcss';
// @ts-expect-error - DaisyUI doesn't have TypeScript types
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Custom SIA brand colors
        'sia-primary': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Base primary
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#3b82f6',
          'primary-content': '#ffffff',
          secondary: '#10b981',
          'secondary-content': '#ffffff',
          accent: '#f59e0b',
          'accent-content': '#ffffff',
          neutral: '#1f2937',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#f3f4f6',
          'base-content': '#1f2937',
          info: '#3b82f6',
          'info-content': '#ffffff',
          success: '#10b981',
          'success-content': '#ffffff',
          warning: '#f59e0b',
          'warning-content': '#ffffff',
          error: '#ef4444',
          'error-content': '#ffffff',
        },
        dark: {
          primary: '#60a5fa',
          'primary-content': '#1e3a8a',
          secondary: '#34d399',
          'secondary-content': '#064e3b',
          accent: '#fbbf24',
          'accent-content': '#78350f',
          neutral: '#374151',
          'neutral-content': '#f9fafb',
          'base-100': '#1f2937',
          'base-200': '#111827',
          'base-300': '#0f172a',
          'base-content': '#f9fafb',
          info: '#60a5fa',
          'info-content': '#1e3a8a',
          success: '#34d399',
          'success-content': '#064e3b',
          warning: '#fbbf24',
          'warning-content': '#78350f',
          error: '#f87171',
          'error-content': '#7f1d1d',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
} satisfies Config;
