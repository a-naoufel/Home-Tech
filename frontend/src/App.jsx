import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Page from "./pages/Login/Page";
import Home from "./pages/Home/Home";
import Header from "./Components/header/Header";
import Login from "./pages/Login-leader/Login";
import Footer from "./Components/footer/Footer";
import NotFound from "./pages/Not-Found/NotFound";
import { Shop } from "./pages/shopPage/Shop";
import Regesterme from "./pages/Regester/Regesterme";
import CartPage from "./pages/CartPage/CartPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import OrderPage from "./pages/OrderPage/OrderPage";
import UserListPage from "./pages/UserList/UserListPage";
import OrderListPage from "./pages/OrderList/OrderListPage";

import EditProduct from "./pages/EditProduct/EditProductPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";
import ProductListPage from "./pages/ProductList/ProductListPage";
import ShippingPage from "./pages/PlaceOrder/ShippingPage";
import PlaceOrderPage from "./pages/PlaceOrder/PlaceOrderPage";
import PaymentPage from "./pages/PlaceOrder/PaymentPage";
import Favorite from "./pages/favorite/Favorite";

import ProductPage from "./pages/ProductPage/ProductPage";

import Dashboard from "./pages/Dashboard/Dashboard";

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
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userlist" element={<UserListPage />} />
          <Route path="/productlist" element={<ProductListPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/loginadmin" element={<Login />} />
          <Route path="/cart/:id?" element={<CartPage />} />
          <Route path="/wish/:id?" element={<Favorite />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/Shipping" element={<ShippingPage />} />
          <Route path="/PlaceOrder" element={<PlaceOrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />

          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="/admin/userlist" element={<UserListPage />} />
          <Route path="/admin/user/:id/edit" element={<UserEditPage />} />

          <Route path="/admin/productlist" element={<ProductListPage />} />
          <Route path="/admin/product/:id/edit" element={<EditProduct />} />

          <Route path="/admin/orderlist" element={<OrderListPage />} />
          <Route path="/admin" element={<Dashboard />} />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
