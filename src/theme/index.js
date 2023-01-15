
import { createTheme } from '@mui/material/styles';
import '@fontsource/inter/700.css';


const theme = createTheme({
  palette: {
    primary: {
      main: '#7BA2EF',
      contrastText: '#000000',
    },
    secondary: {
      main: '#31376A',
      contrastText: '#ffffff',
    },
    background: {
      default: '#C7E3EF',
    }
  },
  typography: {
    fontFamily: "Inter",
  },
});

export default theme;
