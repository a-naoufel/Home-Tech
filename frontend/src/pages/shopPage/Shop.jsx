import { useState, useEffect } from "react";
import { ShopProducts } from "./ShopProducts";
import Box from "./Box";
import api from "../../api";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [priceSorted, setPriceSorted] = useState("");
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    console.log(products);
  }, [products]);
  const getProducts = () => {
    api;
    fetch("http://localhost:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        console.log(data);
      })
      .catch((err) => alert(err));
  };
  const sortedPrices =
    priceSorted === "Lth"
      ? products.sort((a, b) => a.price - b.price)
      : priceSorted === "Htl"
      ? products.sort((a, b) => b.price - a.price)
      : products;
  return (
    <>
      <div className="py-[40px] px-0 bg-bgColorWhite">
        <div className="container">
          <h1 className="mt-5 mb-10 text-center text-4xl font-bold">Shop</h1>
          <div className="shop-wrapper">
            <Box setPriceSorted={setPriceSorted} />
            <ShopProducts
              product={sortedPrices}
              // filterdProducts={sortedPrices}
            />
          </div>
        </div>
      </div>
    </>
  );
};
