/**
 * Maison Asili — design tokens.
 *
 * The source markup produced for this project uses a Material-3 style token
 * vocabulary (surface-container-*, on-surface, tertiary ...). Those token names
 * are kept so every supplied page keeps working, but their values are remapped
 * to the Maison Asili brand palette:
 *
 *   Deep charcoal #171714 · Warm ivory #F7F3EB · Antique gold #B69A62
 *   Sand #E8DDCC · Terracotta #A65E43 · Botanical olive #62664A · White #FFFFFF
 *
 * A second group of "heritage" tokens (gold, warm-sand, stone-*) is used by the
 * Our Heritage editorial page and is kept for continuity.
 */
module.exports = {
  darkMode: 'class',
  content: ['./public/**/*.html', './public/assets/js/**/*.js', './src/**/*.html'],
  theme: {
    extend: {
      colors: {
        /* ---- Brand accents ---- */
        primary: '#A65E43', // terracotta
        'on-primary': '#FFFFFF',
        'primary-container': '#EFDDD4',
        'on-primary-container': '#5C3123',
        'inverse-primary': '#B69A62',
        'primary-fixed': '#EFDDD4',
        'primary-fixed-dim': '#E3CBBD',
        'on-primary-fixed': '#3B1A0F',
        'on-primary-fixed-variant': '#5C3123',

        secondary: '#62664A', // botanical olive
        'on-secondary': '#FFFFFF',
        'secondary-container': '#E5E6D5',
        'on-secondary-container': '#33361F',
        'inverse-secondary': '#62664A',
        'secondary-fixed': '#E5E6D5',
        'secondary-fixed-dim': '#CFD1BF',
        'on-secondary-fixed': '#1E2110',
        'on-secondary-fixed-variant': '#4A4C34',

        tertiary: '#8A6A34', // antique gold, darkened for legible text on ivory
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#E8DDCC', // sand
        'on-tertiary-container': '#4A3D1F',
        'tertiary-fixed': '#E8DDCC',
        'tertiary-fixed-dim': '#D9C9A9',
        'on-tertiary-fixed': '#2E2612',
        'on-tertiary-fixed-variant': '#5C4A22',

        /* ---- Surfaces ---- */
        background: '#F7F3EB',
        'on-background': '#171714',
        surface: '#F7F3EB',
        'surface-bright': '#FFFFFF',
        'surface-dim': '#E4DCCD',
        'surface-variant': '#E8DDCC',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F7F3EB',
        'surface-container': '#F1EADC',
        'surface-container-high': '#EAE1D0',
        'surface-container-highest': '#E4DAC6',
        'surface-tint': '#A65E43',
        'on-surface': '#171714',
        'on-surface-variant': '#4C4A42',
        outline: '#7E7A6C',
        'outline-variant': '#D6CFBE',
        'inverse-surface': '#2C2A25',
        'inverse-on-surface': '#F7F3EB',
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
        ivory: '#F7F3EB',
        charcoal: '#171714',
        'brand-gold': '#B69A62',
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
