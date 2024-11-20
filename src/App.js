import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import UserPortal from './pages/UserPortal';
import PersonalInfo from './components/PersonalInfo';
import Order from './components/Order';
import WishList from './components/WishList';
import OrgPortal from './pages/OrgPortal';
import OrgInfo from './components/OrgInfo';
import Sold from './components/Sold';
import AdminPortal from './pages/AdminPortal';
import PostRequests from './components/PostRequests';
import Shop from './pages/Shop';
import OrgSignUp from './components/OrgSignup';
import ShopItems from './pages/ShopItems';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';

function App() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    surname: '',
    cellNumber: '',
    address: {
      country: 'South Africa',
      streetAddress: '',
      suburb: '',
      city: '',
      province: '',
      postalCode: ''
    }
  });
  
  const [userType, setUserType] = useState(''); // Move userType to App

  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUserType={setUserType} />} /> 
        <Route path="/signup" element={<SignUp setUserInfo={setUserInfo} />} />
        <Route path="/orgsignup" element={<OrgSignUp userType={userType} />} />

        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/cart' element={<Cart />} />

        <Route path="userportal/*" element={<UserPortal userType={userType} />} > 
          <Route path="personalinfo" element={<PersonalInfo userInfo={userInfo} setUserInfo={setUserInfo} />} />
          <Route path="orders" element={<Order />} />
          <Route path="wishlist" element={<WishList />} />
        </Route>

        <Route path='/shopItems' element={<ShopItems userType={userType} />} /> 
        
        <Route path='shop' element={<Shop />} />
        
        <Route path="orgportal/*" element={<OrgPortal userType={userType} />} > 
          <Route path="orginfo" element={<OrgInfo />} />
          <Route path="sold" element={<Sold />} />
        </Route>

        <Route path="adminportal/*" element={<AdminPortal />} >
          <Route path="postrequests" element={<PostRequests />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
