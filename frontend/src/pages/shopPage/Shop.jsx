
import { useState, useEffect } from "react";
import { ShopOptions } from "./ShopOptions";
import { ShopProducts } from "./ShopProducts";
import api from "../../api";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    console.log(products);
  }, [products]);
  const getProducts = () => {
    api
      .get("/api/products/")
      .then((res) => res.data)
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };
  
  return (
    <>
      <div className="py-[40px] px-0 bg-bgColorWhite">
        <div className="container">
          <h1 className="text-2xl  font-bold  sm:text-xl pb-1 ">Shop</h1>
          <div className="shop-wrapper">
          <ShopOptions
              
            />
            <ShopProducts
              product={products}
              // filterdProducts={sortedPrices}
              
              
             
            />
          </div>
        </div>
      </div>
    </>
  );
};
