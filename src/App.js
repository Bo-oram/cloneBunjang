import React from "react";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import New from "./pages/New";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product"  element={<Product />}>
          <Route path="new" exist  element={<New />} /> 
        </Route>
      </Routes>
    </AppLayout>
  );
}

export default App;
