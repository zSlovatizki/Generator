import './Navigation.css'
import Line from '../UIKit/Line'
import { useHistory } from "react-router-dom";
import { withScriptjs } from 'react-google-maps';
import AddCableMap from './AddCableMap'
import Map from '../Map';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import SignIn from './SignIn'
import Users from '../Mobx/Users'
import App from '../App'
import UserTable from './UsersTable'
// import AddUser from './addUser'
import UserDetails from './UserDetails'
import UpdateDetails from './UpdateUserDetails'
import UpdateAmountForAdress from './UpdateAmperForUserAdress'
import Chart from './Chart'
import UserAddresses from './UserAddresses'
import AllUsers from "./AllUsers";
import SignUp from "./SignUp";
import { createBrowserHistory } from 'history';
import MyAppBar from "./MyAppBar"
const history = createBrowserHistory();
const MapLoader = withScriptjs(Map);



export default function Navigation() {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/sign_in">
                        <SignIn />
                    </Route>
                    <Route exact path="/sign_up">
                        <SignUp />
                    </Route>
                    <Route path="/map" exact>
                        <MyAppBar />
                        <div style={{ width: "100%" }}>
                            <MapLoader
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwBhST7RvyHmk9JLlkMPHp8LAfY7AqIEw&libraries=places,drawing,geometry&language=iw"
                                loadingElement={<div style={{ height: `100%` }} />}
                            />
                        </div>
                    </Route>
                    <Route exact path="/">
                        <SignIn />
                    </Route>
                    <Route exact path="/users" >
                        <MyAppBar />
                        <AllUsers />

                    </Route>

                    {/* <Route exact path="/update_use">
                    <UpdateUse/>
                    </Route> */}
                    {/* <Route exact path="/addUser">
                    <AddUser/>
                    </Route> */}
                    <Route exact path="/userDetails">
                        {/* <UserDetails/> */}
                    </Route>
                    <Route path="/userDetails/updateDetails">
                        <MyAppBar />
                        <UpdateDetails />
                    </Route>
                    <Route path="/userDetails/using">
                        <MyAppBar />
                        <Chart />
                    </Route>
                    <Route path="/userDetails/addresses">
                        <MyAppBar />
                        <UserAddresses />
                    </Route>
                    <Route path="/userDetails/amuont">
                        <UpdateAmountForAdress />
                        <MyAppBar />
                    </Route>
                    <Route path="/addCableMap">
                        <MyAppBar />
                        <AddCableMap />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
