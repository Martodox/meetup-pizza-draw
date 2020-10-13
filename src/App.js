import React from 'react';
import Game from './Game/Game';
import Admin from './Admin/Admin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';


function App() {
  return (

    <Router>
      <div>
        <Switch>
          <Route path="/console">
            <Admin />
          </Route>
          <Route path="/">
            <Game />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
