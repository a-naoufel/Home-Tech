import React, { useState, useEffect } from "react";
import { ShopProducts } from "./ShopProducts";
import Box from "./Box";
import api from "../../api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { useLocation } from 'react-router-dom';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const Shop = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  let query = useQuery();
  let keyword = query.get('keyword');
  let Page = query.get('page')
  
  if(Page){
    Page = "page=".concat(Page)
  }else{
    Page = ""
  } 

  if(keyword){
    keyword = "keyword=".concat(keyword).concat("&")
  }else{
    keyword = ''
  } 
  


  useEffect(() => {
    dispatch(listProducts(keyword,Page))

}, [dispatch, keyword, Page])

  const [priceSorted, setPriceSorted] = useState("");
  
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
