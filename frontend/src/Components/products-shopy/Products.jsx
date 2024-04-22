import { useEffect, useState } from "react";
import "./products.css";
import { ProductBox } from "./ProductBox";
import { ProductListUL } from "./ProductListUL";
import { Paginition } from "./Paginition";
import { Link } from "react-router-dom";
import api from "../../api";

export const Products = () => {
  
  const [toggled, setToggled] = useState("All");
  const [apiControl, setApiControl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  

  
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

  const PRODUCT_PER_PAGE = 4;
  const PAGES = Math.ceil(products.length / PRODUCT_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCT_PER_PAGE;
  const finishIndex = currentPage * PRODUCT_PER_PAGE;
  const orderdProduct = products.slice(startIndex, finishIndex);

  return (
    <>
      <div className="bg-[#f1f1f1f1] pt-5 pb-[100px]">
        <div className="container">
          <h1 className="mt-5 mb-10 text-center text-4xl font-bold">Our Products</h1>
          <ProductListUL
            toggled={toggled}
            setToggled={setToggled}
            setApiControl={setApiControl}
          />
          <div className="flex flex-wrap justify-center gap-6">
           
            <ProductBox products={orderdProduct} />
         
            
          </div>
          <Paginition
            PAGES={PAGES}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};
