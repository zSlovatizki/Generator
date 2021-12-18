
import React, { useEffect } from 'react';
import { withScriptjs } from 'react-google-maps';
import { FetchCablesByManager, FetchUsers } from './connect to server/Connect'
import SignIn from './view/signIn'
import Users from './Mobx/users'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navigation from './view/navigation'

const App = () => {
  useEffect(() => {
    FetchCablesByManager();
    FetchUsers();
  }, [])

  const sendMail = () => {
    window.Email.send({
      SecureToken: "C973D7AD-F097-4B95-91F4-40ABC5567812",
      To: 'zipislova@gmail.com',
      From: "zipislova@gmail.com",
      Subject: "This is the subject",
      Body: "And this is the body"
    }).then(
      message => alert(message)
    );
  }
  return (

    <>
      <Navigation />
      <FetchCablesByManager></FetchCablesByManager>
      {/* <button onClick={sendMail} > Send Mail </button> */}

      {/* <SignIn></SignIn> */}
    </>
  );

};

export default App;
