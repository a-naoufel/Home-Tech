import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Header from "./Components/header/Header";
import Home from "./pages/Home/Home"
import { useState } from "react";
import Footer from "./Components/footer/Footer";
import regester from "./pages/Regester/regester";

function App() {
  return (
    <>
      <BrowserRouter>
    
   
        <Routes>
          <Route path="" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/regester" Component={regester} />
        </Routes>
      <Footer/>
        
        
      </BrowserRouter>
    </>
  )
}

export default App