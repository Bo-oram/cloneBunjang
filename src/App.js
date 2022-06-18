import React from "react";
import AppLayout from "./components/AppLayout";
import Home from './pages/Home'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={< Home />} />
      </Routes>
    </AppLayout>
  );
}


export default App;
