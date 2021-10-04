
import React, { useEffect } from 'react';
import { withScriptjs } from 'react-google-maps';
import Map from './Map';
import { FetchCablesByManager, FetchUsers } from './connect to server/Connect'
import Show from './Mobx/show'
import Modify from './Mobx/modify'
import WithMaterialUI from './view/signIn'

const App = () => {

  useEffect(() => {
    FetchCablesByManager();
    FetchUsers();
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
      <WithMaterialUI></WithMaterialUI>
    </>
  );

};

export default App;
