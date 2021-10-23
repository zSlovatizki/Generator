
import React, { useEffect } from 'react';
import { withScriptjs } from 'react-google-maps';
import Map from './Map';
import { FetchCablesByManager, FetchUsers } from './connect to server/Connect'
import Show from './Mobx/show'
import Modify from './Mobx/modify'
import SignIn from './view/signIn'
import Users from './Mobx/users'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AddCable from './view/addCable'
import Line from './UIKit/Line'

const App = () => {

  useEffect(() => {
    FetchCablesByManager();
    FetchUsers();
  }
  , [])
  const MapLoader = withScriptjs(Map);

  return (
  //   <Router>  
  //     <Switch>
  //       <Route path="/sign_in">
  //         <SignIn />
  //       </Route>
  //       <Route path="/map">
  //       <MapLoader
  //       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKLoEzJ7BScxRKW3vQVXWhzgm4VwtZPag&libraries=places"
  //       loadingElement={<div style={{ height: `100%` }} />}
  //     />
  //       </Route>
  //       <Route exact path="/">
  //              {Users.currentUser ? <Redirect to="/map" /> : <SignIn />}
  //         </Route>
       
  //     </Switch>
    
  // </Router>

  // ==============================
    <>
    <Line>

      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKLoEzJ7BScxRKW3vQVXWhzgm4VwtZPag&libraries=places&libraries=drawing"
        loadingElement={<div style={{ width: `100%` }} />}/> 
      <AddCable></AddCable>

    </Line>
      <FetchCablesByManager></FetchCablesByManager>
      {/* <Show></Show>
      <Modify></Modify> */}
      {/* <SignIn></SignIn> */}
    </>
  );

};

export default App;
