import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  plugins: [heroui(
    {
      themes: {
        red: {
          extend: 'dark',
          layout: {
            radius: {
              small: '3px'
            }
          },
          colors: {
            background: "#151515",
            primary: {
              50: "#FCD3CB",
              100: "#FCD3CB",
              200: "#F99F99",
              300: "#EE6569",
              400: "#DD3E52",
              500: "#DD3E52",
              600: "#AB053A",
              700: "#8F043E",
              800: "#73023C",
              900: "#5F013A",
              DEFAULT: "#DD3E52",
              foreground: "#E0E0E0"
            },
            focus: "#C70833",
            content1: '#252525',
            content2: '#6A6A6A'
          }
        },
        green: {
          extend: 'dark',
          layout: {
            radius: {
              small: '20px'
            }
          },
          colors: {
            background: "#151515",
            primary: {
              50: "#FCD3CB",
              100: "#FCD3CB",
              200: "#F99F99",
              300: "#EE6569",
              400: "#9fc131",
              500: "#9fc131",
              600: "#AB053A",
              700: "#8F043E",
              800: "#73023C",
              900: "#5F013A",
              DEFAULT: "#9fc131",
              foreground: "#E0E0E0"
            },
            focus: "#C70833",
            content1: '#252525',
            content2: '#6A6A6A'
          }
        },
        light: {
          extend: 'light',
          layout: {
            radius: {
              small: '6px'
            }
          },
          colors: {
            background: "#FFFFFF",
            primary: {
              50: "#E6F3FA",
              100: "#CCE7F5",
              200: "#99CFEB",
              300: "#66B7E1",
              400: "#339FD7",
              500: "#0087CD",
              600: "#006CA4",
              700: "#00517B",
              800: "#003652",
              900: "#001B29",
              DEFAULT: "#0087CD",
              foreground: "#66B7E1"
            },
            focus: "#006CA4",
            content1: '#F9FAFB',
            content2: '#9CA3AF'
          }
        },
        dark: {
          extend: 'dark',
          layout: {
            radius: {
              small: '4px'
            }
          },
          colors: {
            background: "#1A1A1A",
            primary: {
              50: "#E6FFFA",
              100: "#CCF7F5",
              200: "#99EFEB",
              300: "#66E7E1",
              400: "#33DFD7",
              500: "#00D7CD",
              600: "#00A9A4",
              700: "#007B7B",
              800: "#004D52",
              900: "#001F29",
              DEFAULT: "#00D7CD",
              foreground: "#E5E7EB"
            },
            focus: "#00A9A4",
            content1: '#2D2D2D',
            content2: '#6B7280'
          }
        }
      }
    }
  )],
}

module.exports = config;