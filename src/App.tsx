import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './layout/component/header/Navbar';
import Footer from './layout/component/footer/Footer';
import HomePage from './layout/pages/HomePage';
import ProductDetail from './layout/pages/product/ProductDetail';
import Login from './layout/pages/user/Login';
import Register from './layout/pages/user/Register';
import ActiveAccount from './layout/pages/user/ActiveAccount';
import Cart from './layout/pages/cart/Cart';
import AboutUs from './layout/pages/static/AboutUs';
import Contact from './layout/pages/static/Contact';
import { Categories, Dashboard, Orders, Products, Users } from './layout/admin';
import Checkout from './layout/pages/order/Checkout';
import { ToastContainer } from 'react-toastify';
import UserDetail from './layout/pages/user/UserDetail';
import EditProfile from './layout/pages/user/EditProfile';
import ChangePassword from './layout/pages/user/ChangePassword';
import ForgotPassword from './layout/pages/user/ForgotPassword';
import ResetPassword from './layout/pages/user/ResetPassword';
import MyOrder from './layout/pages/user/MyOrder';
import OrderDetail from './layout/pages/user/OrderDetail';
import LoginAdmin from './layout/admin/pages/LoginAdmin';
import Types from './layout/admin/pages/Types';
import PaymentReturnPage from './layout/pages/order/PaymentReturnPage';


const MyRoute = () =>{
  const [searchKeyword, setSearchKeyword] = useState('');

  const location = useLocation();

  const isAdminPath = location.pathname.startsWith("/admin")

  return(

    <div>
         {!isAdminPath && <Navbar searchKeywords={searchKeyword} setSearchKeywords={setSearchKeyword} />}
        <Routes>

{/* User Path */}
          <Route path='/' element={<HomePage searchKeyword={searchKeyword} />} ></Route>
          <Route path='/:categoryId' element={<HomePage searchKeyword={searchKeyword} />} ></Route>
          <Route path='/productdetail/:productId' element={<ProductDetail />} ></Route>
          <Route path='/Login' element={<Login />} ></Route>
          <Route path='/Register' element={<Register />} ></Route>
          <Route path='/Active/:email/:activeCode' element={<ActiveAccount />} />
          <Route path='/Cart/:cartID' element={<Cart />} />
          <Route path='/aboutUS' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/checkOut/:cartID" element={<Checkout />} />
          <Route path="/userDetail" element={<UserDetail />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:email/:forgotPasswordCode" element={<ResetPassword />} />
          <Route path="/myOrder" element={<MyOrder />} />
          <Route path="/orderDetail/:orderId" element={<OrderDetail />} />
          <Route path="/payment-return/:status" element={<PaymentReturnPage />} />


{/* Admin path */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/types" element={<Types />} />
          <Route path='/admin' element={<LoginAdmin />} />

        </Routes>
       {!isAdminPath && <Footer />}
    </div>
  );

}

function App() {

  

  return (
    <div className="App">
      <BrowserRouter>
      <MyRoute/>
      </BrowserRouter>
      <ToastContainer
						position='bottom-center'
						autoClose={3000}
						pauseOnFocusLoss={false}
					/>
    </div>
  );
}

export default App;
