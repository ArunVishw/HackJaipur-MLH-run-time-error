import React from 'react';
import Home from './components/Home';
import Notepad from './components/Notepad'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Interview from './components/Interview';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/interview" exact component={Interview} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
