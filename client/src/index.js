  import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#bce2d7',
//     },
//     secondary: {
//       main: '#3b1c32',
//     },
//     background: {
//       default: '#188fa7',
//       paper: '#769fb6',
//     },
//     typography: {
//       fontFamily: 'Quicksand, sans-serif'
//     },
//   }
// })

ReactDOM.render(
  <BrowserRouter>
    {/* <ThemeProvider theme={theme}> */}
      <App />
    {/* </ThemeProvider> */}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
