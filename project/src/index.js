import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
const GoogleMapHOC = withGoogleMap(
  props => ( <GoogleMap> <Marker/> </GoogleMap>)
)
ReactDOM.render(

  <React.StrictMode>
    <App />,
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
