import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Checkout from './pages/Checkout';
import Credit from './pages/Credit';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/credit' element={<Credit/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
  
export default App;