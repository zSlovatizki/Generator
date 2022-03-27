import './Navigation.css'
import AddCableMap from './AddCableMap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SignIn from './SignIn'
import UpdateDetails from './UpdateUserDetails'
import Chart from './Chart'
import UserAddresses from './UserAddresses'
import AllUsers from "./AllUsers";
import SignUp from "./SignUp";
import { createBrowserHistory } from 'history';
// import MyAppBar from "./MyAppBar";
import MyAppBar from './NavBar';
import WrappedMap from '../mapTwo';
import Message from './Message';

const history = createBrowserHistory();

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
                        {/* <div style={{ width: "100%", marginTop:"10vh"}}> */}
                            <WrappedMap />
                        {/* </div> */}
                    </Route>
                    <Route exact path="/">
                        <SignIn />
                    </Route>
                    <Route exact path="/users">
                        {/* <MyAppBar /> */}
                        <MyAppBar/>
                        <AllUsers />
                    </Route>
                    <Route exact path="/message">
                        <MyAppBar />
                        <Message />
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
                    <Route path="/addCableMap">
                        <MyAppBar />
                        <AddCableMap />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
