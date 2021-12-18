import './navigation.css'
import Line from '../UIKit/Line'
import { useHistory } from "react-router-dom";
import { withScriptjs } from 'react-google-maps';
import Map from '../Map';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import SignIn from '../view/signIn'
import Users from '../Mobx/users'
import App from '../App'
import PersistentDrawerRight from '../view/drawer'
import UserTable from './userstTable'
// import AddUser from './addUser'
import UserDetails from './userDetails'
import UpdateDetails from './updateUserDetails'
import UpdateAmountForAdress from './updateAmountForAdress'
import Chart from './chart2'
export default function Navigation() {
    const MapLoader = withScriptjs(Map);
    return (
        <div>
            <Router>
                <div className="root" style={{ zIndex: -1 }}>
                    <Line width="100%">
                        <Link className="link" to='/map'>map</Link>
                        <Link className="link" to='/'>home</Link>
                        <Link className="link" to='/sign_in'>connect</Link>
                        <Link className="link" to='/users'>users details</Link>
                        <PersistentDrawerRight></PersistentDrawerRight>
                    </Line>
                </div>
                <Switch>
                    <Route path="/sign_in">
                        <SignIn />
                    </Route>
                    <Route path="/map">
                        <div style={{ width: "100%" }}>
                            <MapLoader
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBw1O0w3i7M3WhVhge2UldEhP62AEIJKqc&libraries=places,drawing"
                                loadingElement={<div style={{ height: `100%` }} onMouseDown={console.log("aaa")}/>}
                            />
                        </div>
                    </Route>
                    <Route exact path="/">
                        {console.log("user",Users.currentUser ) && Users.currentUser ? <Redirect to="/map" /> : <SignIn />}
                       {/* <Update></Update> */}
                       {/* <UserTable/> */}
                    </Route>
                    <Route exact path="/users">
                    <UserTable/>
                    </Route>
                    {/* <Route exact path="/update_use">
                    <UpdateUse/>
                    </Route> */}
                    {/* <Route exact path="/addUser">
                    <AddUser/>
                    </Route> */}
                    <Route exact path="/userDetails">
                    <UserDetails/>
                    </Route>
                    <Route path="/userDetails/updateDetails">
                    <UpdateDetails/>
                    </Route>
                    <Route path="/userDetails/using">
                    <Chart/>
                    </Route>
                    <Route path="/userDetails/amuont">
                    <UpdateAmountForAdress/>
                    </Route>
                </Switch>
            </Router>
            {/* <Line> */}
               {/* <p>פרטים אישיים</p>
                <p>פרטי לקוחות</p>
                <p>סטטיסטיקות</p> */}
            {/* </Line> */}
        </div>
    )
}
