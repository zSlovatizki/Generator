
import { MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import Navigation from './view/Navigation'

const App = () => {
  return (
    <React.StrictMode>
      <MuiThemeProvider>
        <Navigation />
      </MuiThemeProvider>
    </React.StrictMode>
  );

};

export default App;
