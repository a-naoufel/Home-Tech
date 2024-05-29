import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Page from "./pages/Login/Page";
import Home from "./pages/Home/Home";
import Header from "./Components/header/Header";
import Login from "./pages/Login-leader/Login";
import Footer from "./Components/footer/Footer";
import AddProduct from "./pages/AddProduct/AddProduct";
import NotFound from "./pages/Not-Found/NotFound";
import { Shop } from "./pages/shopPage/Shop";
import ProtectedRoute from "./Components/protectedroot/ProtectedRoute";
import Regesterme from "./pages/Regester/Regesterme";


import ProductPage from "./pages/ProductPage/ProductPage";


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Regesterme />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Page />} />
          {/* <Route path="/box" element={<Box />} /> */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/loginadmin" element={<Login />} />

          <Route path="/product/:id" element={<ProductPage />} />
          
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
