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
import TableUsersNew from './TableUsersNew';
import UsersTable from './UsersTable';
import UserDetails from './UserDetails';

const history = createBrowserHistory();

export default function Navigation() {
    return (
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
                        <MyAppBar/>
                        <TableUsersNew/>
                        {/* <UsersTable /> */}
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
                    <Route path="/userDetails/updateDetails">
                        <MyAppBar />
                        <div style={{marginTop:'15vh'}}>
                        <UpdateDetails />
                        </div>
                    </Route>
                    <Route path="/userDetails/using">
                        <MyAppBar />
                        <div style={{marginTop:'15vh'}}>
                        <Chart />
                        </div>
                    </Route>
                    <Route path="/userDetails/addresses">
                        <MyAppBar />
                        <div style={{marginTop:'15vh'}}>
                        <UserAddresses />
                        </div>
                    </Route>
                    {/* <Route path="/userDetails">
                         <MyAppBar />
                         <div style={{marginTop:'20vh'}}>
                        <UserDetails/>
                        </div>
                    </Route> */}
                    <Route path="/addCableMap">
                        <MyAppBar />
                        <AddCableMap />
                    </Route>
                </Switch>
            </Router>
    );
}
