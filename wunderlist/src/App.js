// LIBRARIES, UTILITIES, CSS
import React from "react";
import "./App.css"; //Most likely unneccessary as <App /> won't be rendering any JSX and components have their own CSS files
import { Route, Switch } from "react-router-dom";

// COMPONENTS

import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import signUp from "./components/SignUp/SignUp";
import PrivateRoute from './utils/PrivateRoute'

function App() {

  return (
    <div>
      <Switch>
        
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={signUp} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        
      </Switch>
    </div>
  );
}
export default App;
