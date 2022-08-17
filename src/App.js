import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';

function App() {

  var hist = createBrowserHistory();

  return (
    <div className='App'>
    <Router history={hist}>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/menu' exact component={Menu} />
        <Route path='/order' exact component={Order}/>
      </Switch>
    </Router>
    </div>
  );
}
  
export default App;