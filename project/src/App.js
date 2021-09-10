
import React, { useEffect } from 'react';
import { withScriptjs } from 'react-google-maps';
import Map from './Map';
import { FetchCablesByManager } from './connect to server/Connect'
const App = () => {
  
  useEffect(() => {
    FetchCablesByManager()
  }
    , [])
  const MapLoader = withScriptjs(Map);

  return (
    <>
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKLoEzJ7BScxRKW3vQVXWhzgm4VwtZPag&libraries=places"
        loadingElement={<div style={{ height: `100%` }} />}
      />
      <FetchCablesByManager></FetchCablesByManager>
    </>
  );

};

export default App;
