import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Navbar from './layout/component/header/Navbar';
import Footer from './layout/component/footer/Footer';
import HomePage from './layout/pages/HomePage';
import ProductDetail from './layout/pages/product/ProductDetail';
import Login from './layout/pages/user/Login';
import Register from './layout/pages/Register';

function App() {

  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div className="App">
     <BrowserRouter>
        <Navbar searchKeywords={searchKeyword} setSearchKeywords={setSearchKeyword}/>
        <Routes>
          <Route path='/' element={<HomePage searchKeyword={searchKeyword} />} ></Route>
          <Route path='/:categoryId' element={<HomePage searchKeyword={searchKeyword} />} ></Route>
          <Route path='/productdetail/:productId' element={<ProductDetail />} ></Route>
          <Route path='/Login' element={<Login />} ></Route>
          <Route path='/Register' element={<Register />} ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
