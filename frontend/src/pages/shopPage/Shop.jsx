import React, { useState, useEffect } from "react";

import Box from "./Box";
import api from "../../api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { useLocation } from 'react-router-dom';
import { Paginition } from "../../Components/products-shopy/Paginition";
import { useNavigate } from "react-router-dom";
import { ProductBox } from "../../Components/products-shopy/ProductBox";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const Shop = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  const navigate = useNavigate();

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
            <div className="container py-6 bg-bgColorWhite"> 
              <div className="my-12 flex flex-wrap justify-center gap-8 ">
              <ProductBox
              products={sortedPrices}
              // filterdProducts={sortedPrices}
              />
        </div>
            
              </div>
          </div>
        </div>
        <Paginition
            PAGES={pages}
            currentPage={page}
            setCurrentPage={(e) => navigate("/shop?".concat(keyword).concat("page=").concat(e))}
          />
      </div>
    </>
  );
};
