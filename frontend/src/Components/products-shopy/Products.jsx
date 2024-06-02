import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./products.css";
import { ProductBox } from "./ProductBox";
import { Paginition } from "./Paginition";
import { listProducts } from "../../actions/productActions";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Products = () => {
  const [toggled, setToggled] = useState("All");
  const [apiControl, setApiControl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;
  let query = useQuery();
  let Page = query.get("page");

  if (Page) {
    Page = "page=".concat(Page);
  } else {
    Page = "";
  }

  useEffect(() => {
    dispatch(listProducts(Page));
  }, [dispatch, Page]);

  const topRatedProducts = products
    ? [...products].sort((a, b) => b.rating - a.rating).slice(0, 2)
    : [];

  return (
    <>
      <div className="bg-[#f1f1f1f1] pt-5 pb-[100px]">
        <div className="container">
          <h1 className="mt-5 mb-10 text-center text-4xl font-bold">
            Super Deals
          </h1>
          {/* <ProductListUL
            toggled={toggled}
            setToggled={setToggled}
            setApiControl={setApiControl}
          /> */}
          <div className="flex flex-wrap justify-center gap-6">
            <ProductBox products={topRatedProducts} />
          </div>
          <Paginition
            PAGES={pages}
            currentPage={page}
            setCurrentPage={(e) => navigate("/?page=".concat(e))}
          />
        </div>
      </div>
    </>
  );
};
