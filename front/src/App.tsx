import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Screen/Home/index'

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path='/' component={Home} exact />
    </Switch>
  </Router>
)

export default App;
