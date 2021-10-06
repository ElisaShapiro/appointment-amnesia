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
      text: {
          primary: '#222',
          secondary: '#666666'
      },
      buttonColor: {
          main: '#222'
      }
    },
    typography: {
        fontFamily: 'Quicksand, sans-serif',
        h1: {
            fontSize: '64px',
            fontWeight: '700'
        },
        h2: {
            fontSize: '30px',
            fontWeight: '500',
            fontStyle: 'oblique',
            textDecoration: 'none',
            textTransform: 'uppercase',
            textAlign: 'center'
        },
        h3: {
            fontSize: '24px',
            fontWeight: '500',
            textDecoration: 'none',
            textTransform: 'uppercase',
            
        },
        h4: {
            fontSize: '12px',
            color: 'black',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontWeight: '500',
        },
        h5: {
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '12px'
        },
        body1: {
            fontSize: '14px'
        },
        body2: {
            fontSize: '18px',
            fontWeight: '700',
            color: '#222',
        },
        body3: {
            fontSize: '8px',
            color: '#222'
        }
    },
})

export default theme;