import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Navbar from './layout/component/header/Navbar';
import Footer from './layout/component/footer/Footer';
import HomePage from './layout/pages/HomePage';
import ProductDetail from './layout/pages/ProductDetail';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} ></Route>
          <Route path='/productdetail/:productId' element={<ProductDetail />} ></Route>
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
