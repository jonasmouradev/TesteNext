import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      daisyui: {
        themes: [
          {
            'mytheme': {
              'primary': '#570df8',
              'primary-focus': '#4506cb',
              'primary-content': '#ffffff',
              'secondary': '#f6d860',
              'secondary-focus': '#f5cd46',
              'secondary-content': '#ffffff',
              'accent': '#37cdbe',
              'accent-focus': '#2aa79b',
              'accent-content': '#ffffff',
              'neutral': '#3d4451',
              'neutral-focus': '#2a2e37',
              'neutral-content': '#ffffff',
              'base-100': '#ffffff',
              'base-200': '#f9fafb',
              'base-300': '#d1d5db',
              'base-content': '#1f2937',
              'info': '#2094f3',
              'success': '#009485',
              'warning': '#ff9900',
              'error': '#ff5724',
            },
          },
          'dark', // this will set dark theme as the default
        ],
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
