import './App.css';
import { Route, Routes } from 'react-router-dom';


import Cart from './pages/Home/Cart';
import Home from './pages/Home/Home';
import Item from './pages/Items/Item';
import About from './pages/About/About';
import Navbar from './component/Navbar/Navbar';
import { useState } from 'react';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Order from './pages/Order/Order';

function App() {
  const [fooditems, setFoodItems] = useState([]);
  

  return (
    <div>
      <Navbar style={{ position: 'fixed' }} />
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/items" element={<Item fooditems={fooditems} setFoodItems={setFoodItems} />} />
        <Route path="/cart" element={<Cart fooditems={fooditems}  setFoodItems={setFoodItems} />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/login" element={<Order/>} />
      </Routes>
    </div>
  );
}

export default App;
