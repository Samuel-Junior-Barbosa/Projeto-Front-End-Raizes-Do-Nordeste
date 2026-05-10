import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '/src/component/Layout';
import Home from './page/home';
import ListProductOfCategory from '/src/page/ListProductOfCategory';
import ChooseItem from './page/ChooseItem';
import ReviewCart from './page/ReviewCart';

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
            <Route path="/cart" element={<ReviewCart />} />

          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
