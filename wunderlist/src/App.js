// LIBRARIES, UTILITIES, CSS
import React from 'react';
import './App.css'; //Most likely unneccessary as <App /> won't be rendering any JSX and components have their own CSS files
import { Route, Switch } from 'react-router-dom';

// COMPONENTS
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
return (
  <div>

    <Switch>

      <Route exact path='/' component={Home} />

      <Route path='/dashboard' component={Dashboard} /> {/*Eventually will be PrivateRoute*/}

    </Switch>

  </div>
);
}

export default App;
