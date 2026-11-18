/** @type {import('tailwindcss').Config} */
const rgb =
  (v) =>
  ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${v}) / 1)`
      : `rgb(var(${v}) / ${opacityValue})`;

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        hand: ["Caveat", "cursive"],
        /* press clippings on the Digital PR / Expert Quotes pages only */
        news: ["Newsreader", "Georgia", "serif"],
      },
      colors: {
        /* editorial ink/paper palette — the "navy"/"blue" names are historical,
           every component already references them */
        "navy-dark": rgb("--ink"),
        navy: rgb("--ink-soft"),
        "navy-light": rgb("--ink-raised"),
        "blue-accent": rgb("--brand-text"),
        brand: rgb("--brand"),
        "brand-deep": rgb("--brand-deep"),
        "brand-wash": rgb("--brand-wash"),
        "brand-soft": rgb("--brand-soft"),
        "brand-on": rgb("--brand-on"),
        "brand-alt": rgb("--brand-2"),
        "muted-ink": rgb("--muted-ink"),
        verified: rgb("--verified"),
        gap: rgb("--gap"),
        butter: rgb("--butter"),
        mint: rgb("--mint"),
        lilac: rgb("--lilac"),
        blush: rgb("--blush"),
        sky: rgb("--sky"),
        paper: rgb("--paper"),
        linen: rgb("--linen"),
        line: rgb("--line"),
        ivory: rgb("--paper"),
        cream: rgb("--linen"),
        mist: rgb("--paper"),

        /* emphasis: a real highlighter, not a grey wash */
        mark: rgb("--mark"),
        "mark-deep": rgb("--mark-deep"),
        gold: rgb("--mark-deep"),

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        /* `shadow-soft` / `shadow-deep` / `shadow-lift` are referenced in markup
           but were never defined in the original build — left undefined so the
           rendering matches. */
        glow: "0 0 40px rgba(59, 130, 246, 0.3)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
