import HeroProduct from "./HeroProduct";
import HeroSlider from "./HeroSlider";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Loader from "../Loader";
import Message from "../Message";
import { listTopProducts } from "../../actions/productActions";

// eslint-disable-next-line react/prop-types
export default function Hero() {
  const [slideIndex, setslideIndex] = useState(0);
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;
  let i = 0;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div
      className=" relative bg-bgColorBlack overflow-hidden"
      style={{
        minHeight: "calc(100vh -82px)",
      }}
    >
      <HeroSlider slideIndex={slideIndex} setslideIndex={setslideIndex} />
      <div className="flex w-[300vw] text-[white] duration-[1500ms] animated-div"
      style={{transform: `translateX(-${slideIndex * 100}vw)`}}
      >
        {products?.map((product) => (
          <HeroProduct rated={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
