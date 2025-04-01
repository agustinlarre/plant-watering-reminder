import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Deep plant green
      light: '#81c784', // Light leaf green
    },
    secondary: {
      main: '#ffb74d', // Warm amber for accents
    },
    background: {
      default: '#f5f5f5', // Light gray background
      paper: '#ffffff', // White cards
    },
    text: {
      primary: '#263238', // Dark gray for text
      secondary: '#546e7a', // Lighter gray
    },
  },
  typography: {
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // MUI defaults to uppercase
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded buttons
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Rounded cards
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;