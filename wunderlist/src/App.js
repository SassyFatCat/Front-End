// LIBRARIES, UTILITIES, CSS
import React, { useState, useEffect } from "react";
import "./App.css"; //Most likely unneccessary as <App /> won't be rendering any JSX and components have their own CSS files
import { Route, Switch } from "react-router-dom";

// COMPONENTS

import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import signUp from "./components/SignUp/SignUp";
import PrivateRoute from './utils/PrivateRoute'

// const initialDisabled = true;

function App() {
  // const [disabled, setDisabled] = useState(initialDisabled);
  // useEffect(() => {
  //   //THis disables the submit button till it all the vorm validation fields are filled and validated
  //   SignUpFormSchema.isValid(values).then((valid) => {
  //     setDisabled(!valid);
  //   });
  // }, [values]);

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
