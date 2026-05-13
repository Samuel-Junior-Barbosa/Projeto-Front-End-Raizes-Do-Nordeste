import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '/src/component/Layout';
import Home from './page/home';
import ListProductOfCategory from '/src/page/ListProductOfCategory';
import ChooseItem from './page/ChooseItem';
import ReviewCart from './page/ReviewCart';
import ChoosePlace from './page/ChoosePlace';
import ChoosePaymentForm from './page/ChoosePaymentForm';
import OrderReview from './page/OrderReview';
import FinishOrderPage from './page/FinishOrder';
import TrackOrderPage from './page/TrackOrder';

function App() {

  useEffect(() => {
    if( !localStorage.getItem('shoppingCart') ) {
      localStorage.setItem('shoppingCart', JSON.stringify([]))
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/corn" element={<ListProductOfCategory />} />
            <Route path="/meat" element={<ListProductOfCategory />} />
            <Route path="/drink" element={ <ListProductOfCategory  /> } />
            <Route path="/choose-item" element={<ChooseItem />} />
            <Route path="/choose-place" element={<ChoosePlace />} />
            <Route path="/choose-payment" element={<ChoosePaymentForm />} />
            <Route path="/order-review" element={<OrderReview />} />
            <Route path="/cart" element={<ReviewCart />} />
            <Route path="/finish-order" element={<FinishOrderPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
