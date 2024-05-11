import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import "./products.css";
import { ProductBox } from "./ProductBox";
import { ProductListUL } from "./ProductListUL";
import { Paginition } from "./Paginition";
import { listProducts } from '../../actions/productActions'
import { useSearchParams } from 'react-router-dom'


export const Products = ({ history }) => {
  const [toggled, setToggled] = useState("All");
  const [apiControl, setApiControl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList


  useEffect(() => {
      dispatch(listProducts())

  }, [dispatch])


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
            <ProductBox products={products} />
          </div>
          <Paginition

          />
        </div>
      </div>
    </>
  );
};
