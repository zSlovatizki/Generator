
import React, { useEffect } from 'react';
import { withScriptjs } from 'react-google-maps';
import Map from './Map';
import { FetchCablesByManager } from './connect to server/Connect'
import Show from './Mobx/show'
import Modify from './Mobx/modify'
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
      <Show></Show>
      <Modify></Modify>
    </>
  );

};

export default App;
