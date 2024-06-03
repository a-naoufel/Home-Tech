import React, { useState, useEffect } from "react";

import Box from "./Box";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { useLocation } from "react-router-dom";
import { Paginition } from "../../Components/products-shopy/Paginition";
import { useNavigate } from "react-router-dom";
import { ProductBox } from "../../Components/products-shopy/ProductBox";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { FaArrowLeft } from "react-icons/fa";

import { LinkContainer } from "react-router-bootstrap";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const Shop = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const navigate = useNavigate();

  let query = useQuery();
  let keyword = query.get("keyword");
  let Page = query.get("page");

  if (Page) {
    Page = "page=".concat(Page);
  } else {
    Page = "";
  }

  if (keyword) {
    keyword = "keyword=".concat(keyword).concat("&");
  } else {
    keyword = "";
  }

  useEffect(() => {
    dispatch(listProducts(keyword, Page));
  }, [dispatch, keyword, Page]);

  const [priceSorted, setPriceSorted] = useState("");

  const sortedPrices =
    priceSorted === "Lth"
      ? products.sort((a, b) => a.price - b.price)
      : priceSorted === "Htl"
      ? products.sort((a, b) => b.price - a.price)
      : products;

  if (products.length === 0) {
    return loading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <div
        className="container flex flex-col items-center justify-center py-14"
        style={{ minHeight: `calc(100vh - 70.94px)` }}
      >
        <img
          className="rounded-[20px]"
          src="/Not-Found.png"
          alt="cart-empty"
          width={300}
          height={300}
        />
        <p className="my-6 mb-2 text-3xl font-bold">No Resolts :(</p>
        <p className="opacity-60">See our products!</p>
        <button
          className="mt-6 rounded-xl bg-mainColor px-6 py-2 text-white"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="py-[40px] px-0 bg-bgColorWhite">
      <LinkContainer to="/">
        <button className="bg-mainColor text-white absolute left-12 mt-2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 disabled:opacity-30 z-10 disabled:cursor-not-allowed">
          <FaArrowLeft />
        </button>
      </LinkContainer>
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
        setCurrentPage={(e) =>
          navigate("/shop?".concat(keyword).concat("page=").concat(e))
        }
      />
    </div>
  );
};
