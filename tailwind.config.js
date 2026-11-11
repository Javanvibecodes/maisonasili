/**
 * Maison Asili — design tokens.
 *
 * The markup uses a Material-3 style token vocabulary (surface-container-*,
 * on-surface, tertiary ...) kept from the supplied design so existing class
 * names keep working, remapped to the current brand palette:
 *
 *   Deep Plum    #210B36  (primary)
 *   White        #FFFFFF  (surface / background)
 *   Antique Gold #D4B58C  (accent / brand-gold)
 *   Warm Sand    #F4EFE6  (secondary surfaces)
 *
 * NOTE: this file must only contain Tailwind configuration. A previous
 * conversion pasted Next.js options in here, which broke every brand token.
 */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        /* ---- Brand accents ---- */
        primary: '#210B36',
        'on-primary': '#F8F0E6',
        'primary-container': '#EDE4F3',
        'on-primary-container': '#3B2452',
        'inverse-primary': '#D4B58C',
        'primary-fixed': '#EDE4F3',
        'primary-fixed-dim': '#DCCDE8',
        'on-primary-fixed': '#210B36',
        'on-primary-fixed-variant': '#4A2E63',

        secondary: '#D4B58C',
        'on-secondary': '#210B36',
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
        background: '#FFFFFF',
        'on-background': '#171122',
        surface: '#FFFFFF',
        'surface-bright': '#FFFFFF',
        'surface-dim': '#E8E1D6',
        'surface-variant': '#F4EFE6',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#FAF7F2',
        'surface-container': '#F5F0E8',
        'surface-container-high': '#F0E9DF',
        'surface-container-highest': '#EAE1D5',
        'surface-tint': '#210B36',
        'on-surface': '#171122',
        'on-surface-variant': '#5A5264',
        outline: '#8A8394',
        'outline-variant': '#E2D9CE',
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
        'warm-sand': '#F4EFE6',
        'warm-alabaster': '#F7F5F0',
        'warm-ivory': '#FAF8F5',
        'stone-dark': '#181716',
        'stone-charcoal': '#2A2825',
        'stone-muted': '#68645E',
        'stone-border': '#E5DFD5',
        'stone-border-light': '#EFEAE1',

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
