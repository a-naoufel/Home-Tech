import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login-leader/Login";

import Home from "./pages/Home/Home";
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";
import Register from "./pages/Regester-leader/Register";
import AddProduct from "./pages/AddProduct/AddProduct";
import NotFound from "./pages/Not-Found/NotFound";
import { Shop } from "./pages/shopPage/Shop";
import ProtectedRoute from "./Components/protectedroot/ProtectedRoute";

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/add-product" element={ <ProtectedRoute>
                                              <AddProduct />
                                            </ProtectedRoute>} />
        
          
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
