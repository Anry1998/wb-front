/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      "product-sans": ["ProductSans", "sans-serif"],
    },
    screens: {
      sm: "480px",
      md: "800px",
      lg: "1280px",
      xl: "1920px",
      "2xl": "2560px",
      "3xl": "3840px",
      "h-sm": { raw: "(max-height: 400px)" }, // для экранов высотой до 600px
      "h-md": { raw: "(max-height: 800px)" }, // для экранов высотой до 800px
      portrait: { raw: "(orientation: portrait)" },
      landscape: { raw: "(orientation: landscape)" },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        orange: {
          10: "#FEFAF8",
          25: "#FEF7F4",
          50: "#FCEEE9",
          100: "3F8D6C7",
          200: "#F2AC8F",
          300: "#ED936D",
          400: "#E97A4B",
          500: "#E4591E",
          600: "#C24C1A",
          700: "#A03E15",
          800: "#893512",
          900: "#722D0F",
          925: "#5B240C",
          950: "#501F0B",
          990: "#2E1206",
        },
        purple: {
          0: "#FFFFFF",
          10: "#FAFBFF",
          25: "#F7F8FE",
          50: "#EFF1FE",
          100: "#D8DCFC",
          200: "#B0B9F9",
          300: "#98A3F7",
          400: "#818EF5",
          500: "#6172F3",
          600: "#5261CF",
          700: "#4450AA",
          800: "#3A4492",
          900: "#31397A",
          925: "#272E61",
          950: "#222855",
          990: "#131731",
          1000: "#000000",
        },
        error: "#EB4329",
        solitude: {
          100: "#828A9A",
          200: "#596381",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        "svg-color": {
          default: "var(--svg-color)",
          hover: "var(--svg-color-hover)",
          light: "var(--svg-color-light)",
          error: "var(--svg-color-error)",
          disabled: " var(--svg-color-disabled)",
        },
      },
    },
  },
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
