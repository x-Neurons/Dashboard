import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Drawer from './component/Drawer';
import Login from './component/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Products from './component/Products';
import TestNav from './component/testNav';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <TestNav/> */}
        <Drawer />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
