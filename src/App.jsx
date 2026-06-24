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
import CreateProductPage from './page/ManagePage/CreateProductPage';
import ManageProductPage from './page/ManagePage/ManageProductPage';
import ManagePromotionDiscount from './page/ManagePage/ManagePromotionDiscount/index.jsx';
import ManageMenuPage from './page/ManagePage/ManageMenuPage/index.jsx';
import ManageUnityPage from './page/ManagePage/ManageUnityPage/index.jsx';
import ManageCategoryPage from './page/ManagePage/ManageCategoryPage/index.jsx';
import NotPermissionPage from './page/NotPermissionPage/index.jsx';
import ManageUserOrderPage from './page/ManagePage/ManageUserOrderPage/index.jsx';

function App() {

  useEffect(() => {
    if( !sessionStorage.getItem('shoppingCart') ) {
      let tmp_template_cart = { 
        "unityId" : 0,
        "products" : []
      }
      sessionStorage.setItem('shoppingCart', JSON.stringify( tmp_template_cart))
    }

    if( !JSON.parse(sessionStorage.getItem('currentAccount')) ) {
      let tmpAccountTemplate = {
              'name' : '',
              'lgpdConcentiment' : {
                  'systemAuthentication' : false,
                  'placingOrders' : false,
                  'participationInTheLoyaltyProgram' : false,
                  'askedToUserLgpdTerm' : false,
                  'askedToUserCookies' : false,
              }
          }
          sessionStorage.setItem('currentAccount', JSON.stringify( tmpAccountTemplate ))
        }
  }, [])

  

  return (
    <>
      <BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
        <Routes>
          <Route element={<Layout />}>
            
            <Route element={<RouteGuard administratorRoute={ true } attendantRoute={true} />}>
              <Route path="/manage-user-orders" element={<ManageUserOrderPage />} />
            </Route>

            {/* Rotas protegidas para ADMIN (SIMULADO) */}
            <Route element={<RouteGuard administratorRoute={ true }/>}>             
              <Route path="/register-product" element={<CreateProductPage />} />
              <Route path="/manage-promotion-discount" element={<ManagePromotionDiscount />} />
              <Route path="/manage-unity" element={<ManageUnityPage />} />
              <Route path="/manage-category" element={<ManageCategoryPage />} />
              <Route path="/manage-product" element={<ManageProductPage />} />
              <Route path="/manage-menu" element={<ManageMenuPage />} />
            </Route>

            {/* Rotas para usuarios autenticados (SIMULADO) */}
            <Route element={<RouteGuard />}>
                <Route path="/choose-place" element={<ChoosePlace />} />
                <Route path="/finish-order" element={<FinishOrderPage />} />
                <Route path="/track-order" element={<TrackOrderPage />} />
                <Route path="/confirm-address" element={<ConfirmAddressPage />} />
                <Route path="/orders" element={<OrdersPage/>} />
                <Route path="/my-account" element={<MyAccountPage />} />
              
            </Route>


            {/* <Route element={<Layout />}> */}
              {/* Rotas para autenticação (SIMULADO) */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/not-permission" element={<NotPermissionPage />} />
              <Route path="/create-account" element={<RegisteruserPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              
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
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
