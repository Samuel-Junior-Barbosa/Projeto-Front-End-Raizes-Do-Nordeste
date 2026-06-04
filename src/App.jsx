import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Layout from '/src/component/Layout';
import MenuUnity from './page/MenuUnity';
import ListProductOfCategory from '/src/page/ListProductOfCategory';
import ChooseItem from './page/ChooseItem';
import ReviewCart from './page/ReviewCart';
import ChoosePlace from './page/ChoosePlace';
import ChoosePaymentForm from './page/ChoosePaymentForm';
import OrderReview from './page/OrderReview';
import FinishOrderPage from './page/FinishOrder';
import TrackOrderPage from './page/TrackOrder';
import LoginPage from './page/login';
import MyAccountPage from './page/MyAccount';
import RouteGuard from './context/RouteGuard';
import LogoutPage from './page/Logout';
import OrdersPage from './page/Orders';
import ConfirmAddressPage from './page/ConfirmAddress';
import RegisteruserPage from './page/RegisterUser';
import ChooseUnityMenu from './page/ChooseUnityMenu';


function App() {

  

  useEffect(() => {
    if( !sessionStorage.getItem('shoppingCart') ) {
      sessionStorage.setItem('shoppingCart', JSON.stringify([]))
    }
  }, [])

  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            {/* Rotas protegidas (SIMULADO) */}
            <Route path="/" element={<RouteGuard />}>
              <Route path="/choose-place" element={<ChoosePlace />} />
              <Route path="/finish-order" element={<FinishOrderPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="/confirm-address" element={<ConfirmAddressPage />} />
              <Route path="/orders" element={<OrdersPage/>} />
              


            </Route>

            {/* Rotas para autenticação (SIMULADO) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<RegisteruserPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/my-account" element={<MyAccountPage />} />

            {/* Rotas comum  */}
            <Route index element={<MenuUnity />} /> 
            <Route path="/home" element={<MenuUnity />} />

            <Route path="/list-product-of-category" element={<ListProductOfCategory />} />
            <Route path="/corn" element={<ListProductOfCategory />} />
            <Route path="/meat" element={<ListProductOfCategory />} />
            <Route path="/drink" element={ <ListProductOfCategory  /> } />
            <Route path="/choose-unity-menu" element={ <ChooseUnityMenu  /> } />
            <Route path="/choose-item" element={<ChooseItem />} />

            <Route path="/choose-payment" element={<ChoosePaymentForm />} />
            <Route path="/order-review" element={<OrderReview />} />
            <Route path="/cart" element={<ReviewCart />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
