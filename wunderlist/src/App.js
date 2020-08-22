// LIBRARIES, UTILITIES, CSS
import React from 'react';
import './App.css'; //Most likely unneccessary as <App /> won't be rendering any JSX and components have their own CSS files
import { Route, Switch } from 'react-router-dom';

// COMPONENTS
import Home from './components/Home/Home';

function App() {
return (
  <div>

    <Switch>

      <Route exact path='/' component={Home} />

    </Switch>

  </div>
);
}

export default App;
