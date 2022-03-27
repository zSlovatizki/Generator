
import { MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import Navigation from './view/Navigation';
import './App.css';

const App = () => {

  return (
      <MuiThemeProvider>       
        <Navigation />
      </MuiThemeProvider>
  );
};

export default App;
