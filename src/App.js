import React,{useState, useEffect} from "react";
import AppLayout from "./components/AppLayout";
import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import {useDispatch} from "react-redux"
import {prdAll_list} from "./redux/modules/productSlice"

import Mypage from "./components/products"
import New from "./pages/New";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch()
  
    //api데이터 가져오기 실행
    useEffect(() => {
      dispatch(prdAll_list())
    }, []);
 

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />}/>        
        <Route path="/mypage/*"  element={<Mypage />}/>
        <Route path="/Product" element={<Product />}>
          <Route path="new" element={<New />} />
        </Route>
      </Routes>
    </AppLayout>
  );
}

export default App;
