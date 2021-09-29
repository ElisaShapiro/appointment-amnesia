import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#bce2d7',
      },
      secondary: {
        main: '#3b1c32',
      },
      background: {
        default: '#188fa7',
        paper: '#769fb6',
      },
      typography: {
        fontFamily: 'Quicksand, sans-serif'
      },
    }
})

export default theme;