import React, {Suspense, useState, useEffect } from 'react';
import './../static/css/App.css';
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter, useHistory} from 'react-router-dom';
import {Spinner} from 'reactstrap';


import Login from './Login';
import Signup from './Signup';
import AcceptAccount from './AcceptAccount';
import Test from './Test';
import UserCheck from './UserCheck';
import AcceptEmail from './AcceptEmail';
import Home from './Home';




const App = (props)=>{
    const [user, setUser] = useState();

    return(
        <Suspense fallback = {<Spinner />}>
            <Router>
                <Switch>
                    <Route path = "/login">
                        <Login />
                    </Route>

                    <Route path = "/signup">
                        <Signup />
                    </Route>

                    <Route path = "/AcceptAccount">
                        <UserCheck setUser = {setUser}/>
                        <AcceptAccount user = {user}/>
                    </Route>

                    <Route path = "/AcceptEmail">
                        <AcceptEmail />
                    </Route>

                    <Route path = "/home">
                        <UserCheck setUser = {setUser}/>
                        <Home user = {user}/>
                    </Route>

                    <Route path = "/test">
                        <Test />
                    </Route>


                </Switch>
            </Router>
        </Suspense>

    )
}

export default App;
