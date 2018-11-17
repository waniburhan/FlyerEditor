import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme , MuiThemeProvider} from '@material-ui/core/styles';
import './App.css';
import HomePage from './Components/Drawer.js'
import Main from './Components/Main.js'
import MyProvider from './Store/Provider'
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    
  },
  
  typography: {
    fontSize: 12,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
class App extends Component {
  render() {
    return (
      <MyProvider>
      <MuiThemeProvider theme={theme}>
      <CssBaseline/>
       <HomePage/>
    </MuiThemeProvider>
    </MyProvider>
    );
  }
}

export default App;
