import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/menu' exact component={Menu} />
        <Route path='/order' exact component={Order}/>
      </Switch>
    </Router>
  );
}
  
export default App;