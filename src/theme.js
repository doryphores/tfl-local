const badge = {
  fontSize: 2,
  fontWeight: 'badge',
  px: 2,
  py: 1,
  borderRadius: '3px',
};

export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '"Avenir Next", Helvetica, Arial, sans-serif',
    heading: '"Avenir Next", Helvetica, Arial, sans-serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 500,
    badge: 600,
    time: 600,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#000',
    background: '#fff',
    muted: '#ccc',
  },
  badges: {
    bus: {
      ...badge,
      background: '#ce312d',
      color: '#fff',
    },
    overground: {
      ...badge,
      background: '#ef7800',
      color: '#fff',
    },
    southern: {
      ...badge,
      background: '#003f2e',
      color: '#f2d600',
    },
    thameslink: {
      ...badge,
      background: '#30104d',
      color: '#fff',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
  },
};
