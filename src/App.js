import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Order from './Pages/Order';
import Checkout from './Pages/Checkout';
import Credit from './Pages/Credit';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/credit' element={<Credit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;