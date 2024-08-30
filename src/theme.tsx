

import { createTheme, ThemeOptions } from "@mui/material";
import merge from 'lodash/merge';
const Color = require('color');

export const THEMES = {
  MFW_DARK: "MFW_DARK",
};

export const swatches = {
    primary: "#F7931E", 
    secondary: "#E7FD02",
    warning: '', 
    
    gray:{
      100: "#6b6b6b",
      150: "#b3b3b3",
      200: "#242424",
      300: "#242424",
      400: "#333333",
      500: "#242424",
    },
    text: {
      primary: "#1b1b1b",
      secondary: "#373737",
    },
  };

const typography = {
  h1: {
    fontWeight: 500,
    fontSize: '2.488rem',
    letterSpacing: '-0.24px',
    color: swatches.text.primary,
  },
  h2: {
    fontWeight: 500,
    fontSize: '2.074rem',
    letterSpacing: '-0.24px',
    color: swatches.text.primary,
  },
  h3: {
    fontWeight: 500,
    fontSize: '1.728rem',
    letterSpacing: '-0.06px',
    color: swatches.text.primary,
  },
  h4: {
    fontWeight: 500,
    fontSize: '1.44rem',
    letterSpacing: '-0.06px',
    color: swatches.text.primary,
  },
  h5: {
    fontWeight: 500,
    fontSize: '1.2rem',
    letterSpacing: '-0.05px',
    color: swatches.text.primary,
  },
  h6: {
    fontWeight: 500,
    fontSize: '1rem',
    letterSpacing: '-0.05px',
    color: swatches.text.primary,
  },
  body1: {
    color: swatches.text.primary,
  },
  body2: {
    color: swatches.text.secondary,
  },
  overline: {
    fontWeight: 500
  }
};

export const softShadows = [
    'none',
    '0 0 0 1px rgba(63,63,68,0.05), 0 1px 2px 0 rgba(63,63,68,0.15)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 2px 2px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 8px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 5px 8px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 12px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 12px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 16px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 16px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 8px 18px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 9px 18px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 10px 20px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 11px 20px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 12px 22px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 13px 22px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 14px 24px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 16px 28px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 18px 30px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 20px 32px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 22px 34px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25)'
  ];
  
  export const strongShadows = [
    'none',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 2px 2px -2px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 4px 6px -2px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 4px 6px -2px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 4px 8px -2px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 5px 8px -2px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 6px 12px -4px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 7px 12px -4px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 6px 16px -4px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 7px 16px -4px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 8px 18px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 9px 18px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 10px 20px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 12px 22px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 13px 22px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 14px 24px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 16px 28px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 18px 30px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 20px 32px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 22px 34px -8px rgba(0,0,0,0.50)',
    '0 0 1px 0 rgba(0,0,0,0.70), 0 24px 36px -8px rgba(0,0,0,0.50)'
  ];
  


    

const themeConfig = 
  {
    name: THEMES.MFW_DARK,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        selected: Color(swatches.primary).alpha(0.65).string(),
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default:"#891178",
        dark: "#f4bb93",
        light: "#F6C7A6",
        contrast:"#FADAC4",
      },
      primary: {
        main: "#ED8F1E",
      },
      secondary: {
        main: "#06A0FF",
        dark: Color(swatches.secondary).alpha(0.65).string(),
      },
      text:{
        primary: "#9E4B10",
        secondary: "#88400E",
      }
    },
    shadows: strongShadows
  };


const baseConfig = {
  direction: "ltr",
  typography,
  overrides: {
    MuiAlert: {
      standardInfo: {
        color: themeConfig.palette.text.primary,
        border: `3px solid ${themeConfig.palette.background.contrast}`,
        backgroundColor: "none",
      },
      standardSuccess: {
        color: themeConfig.palette.text.primary,
        border: `1px solid ${themeConfig.palette.primary.main}`,
        backgroundColor: "none",
      },
    },
    MuiDropzoneArea: {
      root: {
        backgroundColor: themeConfig.palette.background.light,
      },
      text: {
        color: themeConfig.palette.text.primary,
      },
    },
    MuiButton: {
      root: {
        "&:disabled": {
          color: themeConfig.palette.primary.main + "80",
        },
      },
      contained: {
        "&:disabled": {
          backgroundColor: themeConfig.palette.background.light,
          color: themeConfig.palette.text.secondary,
        },
      },
      outlined: {
        "&:disabled": {
          border:"1px solid " + themeConfig.palette.primary.main + "80",
          color: themeConfig.palette.primary.main + "80",
        },
      },
    },
    MuiSwitch: {
      switchBase: {
        color: themeConfig.palette.primary.main,
        "&$checked": {
          color: themeConfig.palette.primary.main,
        },
      },
      thumb: {
        backgroundColor: themeConfig.palette.text.primary,
        "&$checked": {
          backgroundColor: themeConfig.palette.primary.main,
        },
      },
      track: {
        backgroundColor: themeConfig.palette.background.contrast,
        borderColor: themeConfig.palette.primary.main,
      },
    },
    MuiToggleButtonGroup: {
      root: {
        backgroundColor: themeConfig.palette.primary.main,
      },
    },
    MuiToggleButton: {
      root: {
        backgroundColor: themeConfig.palette.background.light,
      },
      label: {
        color: themeConfig.palette.text.primary,
      },
    },
    MuiOutlinedInput: {
      notchedOutline:{
        borderColor: themeConfig.palette.text.secondary+"80",
      },
      root: {
        '&$disabled': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeConfig.palette.text.secondary,
          },
        },
      },
    },
    MuiFormControlLabel: {
      label: {
        "&.Mui-disabled": {
          color: themeConfig.palette.text.secondary,
        },
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid ${
            themeConfig.palette.text.primary
          }`,
        },
        "&:hover:not($disabled):before": {
          borderBottom: `1px solid ${
            themeConfig.palette.text.primary
          }`,
        },
        "&$focused:before": {
          borderBottom: `1px solid ${
            themeConfig.palette.text.primary
          }`,
        },
      },
    },
    MuiInputBase: {
      input: {
        "&:disabled": {
          color: themeConfig.palette.text.secondary,
        },
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: themeConfig.palette.background.contrast,
        "&:hover": {
          backgroundColor: themeConfig.palette.background.contrast,
        },
        "&.Mui-focused": {
          backgroundColor: themeConfig.palette.background.contrast,
        },
        "&$error": {
          backgroundColor: themeConfig.palette.background.contrast,
        },
        "&.Mui-disabled": {
          backgroundColor: themeConfig.palette.background.contrast,
          color: themeConfig.palette.text.primary,
        },
      },
      underline: {
        "&:before": {
          borderBottom: `1px solid ${
            themeConfig.palette.text.primary
          }`,
        },
        "&:hover:not($disabled):before": {
          borderBottom: `1px solid ${
            themeConfig.palette.text.primary
          }`,
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: themeConfig.palette.background.light,
        color: themeConfig.palette.text.primary,
        minWidth: 500,
        fontSize: typography.body1,
      },
    },
    MuiTypography: {
      root: {
        primary: themeConfig.palette.text.primary,
      },
    },
    MuiIcon: {
      filled: {
        backgroundColor: themeConfig.palette.text.primary,
      },
    },
    MuiSvgIcon: {
      root: {
        fill: themeConfig.palette.text.primary,
      },
    },
    MuiCompareArrows: {
      root: {
        color: themeConfig.palette.text.primary,
      },
    },
    MuiChip: {
      variant: "outlined",
      size: "small",
      outlined: {
        color: themeConfig.palette.text.primary,
        borderColor: themeConfig.palette.text.secondary,
      },
      root: {
        backgroundColor: themeConfig.palette.background.contrast,
        color: themeConfig.palette.text.primary,
        border:`1px solid ${themeConfig.palette.text.primary}50`,
      },
    },
    MuiAccordion: {
      root: {
        backgroundColor: themeConfig.palette.background.light,
        color: themeConfig.palette.primary.main,
      },
    },
    MuiAccordionSummary: {
      content: {
        marginTop: 4,
        marginBottom: 4,
      },
    },
    MuiTableRow: {
      hover: {
        cursor: "pointer",
      },
    },
    MuiCard: {
      backgroundColor: themeConfig.palette.background.light,
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: "hidden",
      },
    },
    MuiRating: {
      icon: {
        marginRight: 4,
      },
      iconEmpty: {
        fill: themeConfig.palette.text.secondary,
      },
      iconFilled: {
        fill: themeConfig.palette.primary.main,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: themeConfig.palette.background.default,
      },
    },
    MuiInputLabel: {
      filled: {
        opacity: 0.5,
      },
      root: {
        "&.Mui-disabled": {
          color: themeConfig.palette.text.secondary,
        },
      },
      shrink: {
        "&.Mui-disabled": {
          color: `${themeConfig.palette.text.primary}80`,
        },
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
    MuiTextField: {
      variant: "filled",
      color: swatches.primary,
    },
    MuiTabs: {
      indicatorColor: "primary",
    },
  },
};

export const defaultSettings = {
  direction: "ltr",
  responsiveFontSizes: true,
  theme: THEMES.MFW_DARK,
};

export const getTheme = () => {
    return createTheme(merge({}, baseConfig, themeConfig, { direction: defaultSettings.direction }) as unknown as ThemeOptions)
}
