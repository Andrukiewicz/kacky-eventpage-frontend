import { border, extendTheme } from '@chakra-ui/react';

export interface ColorScheme {
  [key: string]: [string, string];
}

const light: ColorScheme = {
  'Celadon-Melon': ['#ffbda5', '#9be5c3'],
  'Celadon-Plum': ['#e792d3', '#9be5c3'],
  'Celadon-UranianBlue': ['#bce6fd', '#9be5c3'],
  'Celadon-Vanilla': ['#f5e8a3', '#9be5c3'],
  Celadon: ['#9be5c3', '#9be5c3'],
  'Melon-Celadon': ['#9be5c3', '#ffbda5'],
  'Melon-UranianBlue': ['#bce6fd', '#ffbda5'],
  'Melon-Plum': ['#e792d3', '#ffbda5'],
  'Melon-Vanilla': ['#f5e8a3', '#ffbda5'],
  Melon: ['#ffbda5', '#ffbda5'],
  'Plum-Celadon': ['#9be5c3', '#e792d3'],
  'Plum-Melon': ['#ffbda5', '#e792d3'],
  'Plum-UranianBlue': ['#bce6fd', '#e792d3'],
  'Plum-Vanilla': ['#f5e8a3', '#e792d3'],
  Plum: ['#e792d3', '#e792d3'],
  'UranianBlue-Celadon': ['#9be5c3', '#bce6fd'],
  'UranianBlue-Melon': ['#ffbda5', '#bce6fd'],
  'UranianBlue-Plum': ['#e792d3', '#bce6fd'],
  'UranianYellow-Plum': ['#FFFCCE', '#FFFAA6'],
  'UranianBlue-Vanilla': ['#f5e8a3', '#bce6fd'],
  UranianBlue: ['#bce6fd', '#bce6fd'],
  'Vanilla-Celadon': ['#9be5c3', '#f5e8a3'],
  'Vanilla-Melon': ['#ffbda5', '#f5e8a3'],
  'Vanilla-Plum': ['#e792d3', '#f5e8a3'],
  'Vanilla-UranianBlue': ['#bce6fd', '#f5e8a3'],
  Vanilla: ['#f5e8a3', '#f5e8a3'],
  Neutral: ['#FAFAFA', '#F5F5F5'],
};

const dark: ColorScheme = {
  'Celadon-Melon': ['#d74e41', '#3e6f51'],
  'Celadon-Plum': ['#71395d', '#3d6f51'],
  'Celadon-UranianBlue': ['#4d71ba', '#3d7052'],
  'Celadon-Vanilla': ['#8d7440', '#3d7051'],
  Celadon: ['#3d7051', '#3d7051'],
  'Melon-Celadon': ['#3e6f51', '#c24e42'],
  'Melon-Plum': ['#74395c', '#ed4d42'],
  'Melon-UranianBlue': ['#4e70b0', '#cd4e42'],
  'Melon-Vanilla': ['#917340', '#fa4e41'],
  Melon: ['#ff4e41', '#ff4e41'],
  'Plum-Celadon': ['#3d6e51', '#71395d'],
  'Plum-Melon': ['#ec4d42', '#74395c'],
  'Plum-UranianBlue': ['#4e70bc', '#72395e'],
  Plum: ['#73395d', '#73395d'],
  'Plum-Vanilla': ['#907141', '#733a5c'],
  'UranianBlue-Celadon': ['#3d7052', '#4d71bf'],
  'UranianBlue-Melon': ['#de4e42', '#4e70b5'],
  'UranianBlue-Plum': ['#713a5e', '#4e6eb5'],
  'UranianYellow-Plum': ['#0F0E00', '#222000'],
  'UranianBlue-Vanilla': ['#8f7441', '#4e71bc'],
  UranianBlue: ['#4d71c3', '#4d71c3'],
  'Vanilla-Celadon': ['#3e7051', '#887441'],
  'Vanilla-Melon': ['#fa4e41', '#917240'],
  'Vanilla-Plum': ['#73395c', '#917241'],
  Vanilla: ['#917440', '#917440'],
  'Vanilla-UranianBlue': ['#4e71b7', '#8e7441'],
  Neutral: ['#0A0A0A', '#171717'],
};

export function getCurrentBG(): [string, string] {
  const currentMode = localStorage.getItem('chakra-ui-color-mode') || '';
  const currentTheme =
    localStorage.getItem('chakra-ui-theme') || 'UranianYellow-Plum';

  if (
    !Object.keys(light).includes(currentTheme) &&
    !Object.keys(dark).includes(currentTheme)
  ) {
    localStorage.setItem('chakra-ui-theme', 'UranianYellow-Plum');
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  }

  return currentMode === 'dark' ? dark[currentTheme] : light[currentTheme];
}

export function getCurrentBGGradient(): string {
  const curtheme = getCurrentBG();
  return `linear-gradient(${curtheme[0]}, ${curtheme[1]});`;
}

export function getBackgrounds(): { light: ColorScheme; dark: ColorScheme } {
  return { light, dark };
}

export function getDefaultBackgrounds(): {
  light: [string, string];
  dark: [string, string];
  lightGradient: string;
  darkGradient: string;
} {
  return {
    light: [light['Neutral'][0], light['Neutral'][1]],
    dark: [dark['Neutral'][0], dark['Neutral'][1]],
    lightGradient: `linear-gradient(${light['Neutral'][0]}, ${light['Neutral'][1]});`,
    darkGradient: `linear-gradient(${dark['Neutral'][0]}, ${dark['Neutral'][1]});`,
  };
}

interface ColorModeProps {
  colorMode?: 'dark' | 'light'; // Optional property with a union type
}

export interface DifficultyColor {
  variant: string;
  text: string;
}

export const diffBadgeColorArr: { [key: string]: DifficultyColor } = {
  white: { variant: 'white', text: 'White' },
  green: { variant: 'green', text: 'Green' },
  blue: { variant: 'blue', text: 'Blue' },
  red: { variant: 'red', text: 'Red' },
  black: { variant: 'black', text: 'Black' },
  hard: { variant: 'orange', text: 'Hard' },
  harder: { variant: 'red', text: 'Harder' },
  hardest: { variant: 'purple', text: 'Hardest' },
};

const theme = extendTheme({
  colors: {
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0A0A0A',
    },
    backgroundDark: '#060606',
  },
  fonts: {
    heading: `'Outfit', sans-serif`,
    body: `'Outfit', sans-serif`,
  },
  config: {
    initialColorMode: localStorage.getItem('chakra-ui-color-mode') || 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props: ColorModeProps) => ({
      html: {
        overflowY: 'scroll',
      },
      body: {
        backgroundImage:
          props.colorMode === 'dark'
            ? getDefaultBackgrounds().darkGradient
            : getDefaultBackgrounds().lightGradient,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        // textTransform: 'uppercase',
        fontWeight: 300,
      },
      '&::-webkit-scrollbar': {
        width: '16px',
      },
      '&::-webkit-scrollbar-track': {
        border: '1px',
        borderColor:
          props.colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
        background: props.colorMode === 'dark' ? 'black' : 'white',
      },
      '&::-webkit-scrollbar-thumb': {
        border: '4px',
        borderColor: props.colorMode === 'dark' ? 'black' : 'white',
        background:
          props.colorMode === 'dark' ? 'whiteAlpha.300' : 'blackAlpha.300',
        borderRadius: '100vw',
      },
    }),
  },
  components: {
    Heading: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: (props: ColorModeProps) => ({
        margin: '45px 0 35px 0',
      }),
    },
    Switch: {
      baseStyle: (props: ColorModeProps) => ({
        track: {
          bg: props.colorMode === 'dark' ? 'whiteAlpha.300' : 'blackAlpha.300',
          _checked: {
            bg:
              props.colorMode === 'dark' ? 'whiteAlpha.700' : 'blackAlpha.700',
          },
        },
      }),
    },
    Table: {
      parts: ['th', 'td'],
      // eslint-disable-next-line no-unused-vars
      baseStyle: (props: ColorModeProps) => ({
        table: {
          fontVariantNumeric: 'lining-nums tabular-nums',
          borderCollapse: 'collapse',
          width: 'full',
        },
        th: {
          fontWeight: 'normal',
          // textTransform: 'uppercase',
          letterSpacing: 'wider',
          textAlign: 'start',
        },
        td: {
          textAlign: 'start',
          textTransform: 'initial',
          borderBottom: '0',
          border: '0',
          bg: 'none',
        },
      }),
      variants: {
        simple: {
          th: {
            bg: 'neutral.200',
            color: 'neutral.900',
            borderColor: 'neutral.200',
            _dark: {
              bg: 'neutral.800',
              color: 'neutral.100',
              borderColor: 'neutral.800',
            },
          },
          tr: {
            _light: {
              bg: 'neutral.100',
              color: 'neutral.900',
              borderColor: 'neutral.300',
              _hover: {
                bg: 'neutral.300',
              },
              _even: {
                bg: 'neutral.600',
              },
              _odd: {
                bg: 'neutral.200',
              },
            },
            _dark: {
              bg: 'neutral.900',
              color: 'neutral.100',
              borderColor: 'neutral.800',
              _hover: {
                bg: 'neutral.800',
              },
              _even: {
                bg: 'neutral.800',
              },
              _odd: {
                bg: 'neutral.900',
              },
            },
          },
        },
      },
      sizes: {
        sm: {
          th: {
            px: '4',
            py: '1',
            h: 8,
            lineHeight: '4',
            fontSize: 'sm',
          },
          td: {
            px: '4',
            py: '1',
            h: 10,
            fontSize: 'md',
            lineHeight: '4',
          },
        },
      },
    },
    FormLabel: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: (props: ColorModeProps) => ({
        letterSpacing: '0.1em',
        fontWeight: 'hairline',
      }),
    },
    FormError: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: (props: ColorModeProps) => ({
        text: {
          letterSpacing: '0.1em',
          fontWeight: 'normal',
        },
      }),
    },
    Input: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: (props: ColorModeProps) => ({
        field: { fontWeight: 'hairline', letterSpacing: '0.1em' },
      }),
      variants: {
        outline: {
          field: {
            background: 'blackAlpha.50',
            _dark: { background: 'whiteAlpha.200' },
          },
        },
      },
    },
    Select: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: (props: ColorModeProps) => ({
        field: { fontWeight: 'hairline', letterSpacing: '0.1em' },
      }),
      variants: {
        outline: {
          field: {
            background: 'neutral.200',
            _dark: { background: 'neutral.800' },
          },
        },
      },
    },
    Popover: {
      baseStyle: (props: ColorModeProps) => ({
        content: {
          bg: props.colorMode === 'dark' ? 'neutral.800' : 'neutral.200',
        },
      }),
    },
    Modal: {
      baseStyle: (props: ColorModeProps) => ({
        dialog: {
          bg: props.colorMode === 'dark' ? 'neutral.800' : 'neutral.200',
        },
      }),
    },
    Menu: {
      baseStyle: (props: ColorModeProps) => ({
        list: {
          rounded: 'none',
          background:
            props.colorMode === 'dark' ? 'neutral.800' : 'neutral.200',
          borderColor:
            props.colorMode === 'dark' ? 'whiteAlpha.300' : 'blackAlpha.300',
        },
        item: {
          // textTransform: 'uppercase',
          letterSpacing: '0.1em',
          background: props.colorMode === 'dark' ? 'none' : 'none',
          _hover: {
            background:
              props.colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
          },
        },
      }),
    },
    Button: {
      baseStyle: {
        // textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontWeight: 'normal',
      },
      variants: {
        solid: {
          bg: 'blackAlpha.200',
          _dark: { bg: 'whiteAlpha.200' },
          _hover: {
            _disabled: {
              bg: 'blackAlpha.200',
              _dark: { bg: 'whiteAlpha.200' },
            },
            bg: 'blackAlpha.300',
            _dark: { bg: 'whiteAlpha.300' },
          },
        },
        ghost: {
          _hover: {
            _disabled: {
              bg: 'blackAlpha.200',
              _dark: { bg: 'whiteAlpha.200' },
            },
            bg: 'blackAlpha.300',
            _dark: { bg: 'whiteAlpha.300' },
          },
        },
        danger: {
          boxShadow: '0px 2px 4px rgba(252, 129, 129, 0.5);',
          color: 'red.900',
          bg: 'red.300',
          _dark: { bg: 'red.300' },
          _hover: {
            _disabled: {
              bg: 'red.300',
              _dark: { bg: 'red.300' },
            },
            bg: 'red.400',
            _dark: { bg: 'red.400' },
          },
        },
      },
    },
    Badge: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: (props: ColorModeProps) => ({
        letterSpacing: '0.1em',
        fontWeight: 'semibold',
      }),
      variants: {
        white: {
          bg: 'white',
          color: 'black',
          boxShadow: '0px 2px 4px rgba(255, 255, 255, 0.5);',
        },
        green: {
          bg: 'green.300',
          color: 'green.900',
          boxShadow: '0px 2px 4px rgba(104, 211, 145, 0.5);',
        },
        yellow: {
          bg: 'yellow.300',
          color: 'yellow.900',
          boxShadow: '0px 2px 4px rgba(250, 240, 137, 0.5);',
        },
        orange: {
          bg: 'orange.300',
          color: 'orange.900',
          boxShadow: '0px 2px 4px rgba(246, 173, 85, 0.5);',
        },
        purple: {
          bg: 'purple.300',
          color: 'purple.900',
          boxShadow: '0px 2px 4px rgba(183, 148, 244, 0.5);',
        },
        blue: {
          bg: 'blue.300',
          color: 'blue.900',
          boxShadow: '0px 2px 4px rgba(144, 205, 244, 0.5);',
        },
        red: {
          bg: 'red.300',
          color: 'red.900',
          boxShadow: '0px 2px 4px rgba(252, 129, 129, 0.5);',
        },
        black: {
          bg: '#666666',
          color: 'black',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5);',
        },
      },
    },
  },
  semanticTokens: {
    shadows: {
      glow: {
        default: 'none',
        _dark: 'glowVar',
      },
      finGlow: {
        default: 'finGlowLight',
        _dark: 'finGlowDark',
      },
    },
    colors: {
      background: {
        default: 'white',
        _dark: 'backgroundDark',
      },
    },
  },
  shadows: {
    glowVar:
      '0px 2px 16px rgba(255, 255, 255, 0.25), 0px 0px 4px rgba(255, 255, 255, 0.5);',
    dropGlow:
      'drop-shadow(0px 2px 16px rgba(255, 255, 255, 0.25)) drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.5));',
    dropGlowDark:
      'drop-shadow(0px 2px 16px rgba(0,0,0,0.25)) drop-shadow(0px 0px 4px rgba(0,0,0,0.5));',
    finGlowDark: 'drop-shadow(0px 0px 10px #00FF00);',
    finGlowLight: 'drop-shadow(0px 0px 10px #00FF77);',
  },
});

export default theme;
