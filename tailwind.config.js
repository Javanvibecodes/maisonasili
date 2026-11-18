/**
 * Maison Asili — design tokens.
 *
 * The markup uses a Material-3 style token vocabulary (surface-container-*,
 * on-surface, tertiary ...) kept from the supplied design so existing class
 * names keep working, remapped to the current brand palette:
 *
 *   Royal Plum   #380A36  (primary)
 *   Ivory        #F8F0E6  (surface / background)
 *   Antique Gold #D4B58C  (accent / brand-gold)
 *   Warm Sand    #F0E6D6  (secondary surfaces)
 *
 * NOTE: this file must only contain Tailwind configuration. A previous
 * conversion pasted Next.js options in here, which broke every brand token.
 */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true
  },
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        /* ---- Brand accents ---- */
        primary: '#380A36',
        'on-primary': '#F8F0E6',
        'primary-container': '#F1E5EC',
        'on-primary-container': '#4A2446',
        'inverse-primary': '#D4B58C',
        'primary-fixed': '#F1E5EC',
        'primary-fixed-dim': '#E0CEDA',
        'on-primary-fixed': '#380A36',
        'on-primary-fixed-variant': '#5C2E57',

        secondary: '#D4B58C',
        'on-secondary': '#380A36',
        'secondary-container': '#F3E8D7',
        'on-secondary-container': '#4A3D1F',
        'inverse-secondary': '#D4B58C',
        'secondary-fixed': '#F3E8D7',
        'secondary-fixed-dim': '#E6D5B9',
        'on-secondary-fixed': '#241C0D',
        'on-secondary-fixed-variant': '#5C4A22',

        tertiary: '#7C5A2E',
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#F1E8DA',
        'on-tertiary-container': '#4A3D1F',
        'tertiary-fixed': '#F1E8DA',
        'tertiary-fixed-dim': '#E2D3B9',
        'on-tertiary-fixed': '#2E2612',
        'on-tertiary-fixed-variant': '#5C4A22',

        /* ---- Surfaces ---- */
        background: '#F8F0E6',
        'on-background': '#1F1722',
        surface: '#F8F0E6',
        'surface-bright': '#FCF8F2',
        'surface-dim': '#E9DED0',
        'surface-variant': '#F2E9DC',
        'surface-container-lowest': '#FCF8F2',
        'surface-container-low': '#F5EDE1',
        'surface-container': '#F0E6D8',
        'surface-container-high': '#EADFD0',
        'surface-container-highest': '#E4D7C5',
        'surface-tint': '#380A36',
        'on-surface': '#1F1722',
        'on-surface-variant': '#574F5C',
        outline: '#8B848F',
        'outline-variant': '#E0D5C6',
        'inverse-surface': '#2C2A25',
        'inverse-on-surface': '#F8F0E6',
        'inverse-outline': '#44413A',

        /* ---- Feedback ---- */
        error: '#9B2C1E',
        'on-error': '#FFFFFF',
        'error-container': '#F4DAD6',
        'on-error-container': '#3A0D06',

        /* ---- Heritage editorial tokens ---- */
        gold: '#9E7B3B',
        'gold-light': '#C9A86A',
        'gold-dark': '#7A5E26',
        'warm-sand': '#F0E6D6',
        'warm-alabaster': '#FAF4EC',
        'warm-ivory': '#FCF8F2',
        'stone-dark': '#181716',
        'stone-charcoal': '#2A2825',
        'stone-muted': '#68645E',
        'stone-border': '#E0D5C6',
        'stone-border-light': '#EDE4D7',

        /* ---- Raw brand swatches ---- */
        ivory: '#F8F0E6',
        charcoal: '#171714',
        'brand-gold': '#D4B58C',
        sand: '#E8DDCC',
        terra: '#A65E43',
        olive: '#62664A'
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem'
      },
      fontFamily: {
        headline: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Public Sans"', 'system-ui', 'sans-serif'],
        label: ['"Public Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Public Sans"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
