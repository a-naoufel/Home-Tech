import HeroProduct from "./HeroProduct";
import HeroSlider from "./HeroSlider";
import { useState, useEffect } from "react";
import api from "../../api";

// eslint-disable-next-line react/prop-types
export default function Hero() {
  const [products, setProducts] = useState([]);
  const [priceSorted, setPriceSorted] = useState("");
  const [slideIndex, setslideIndex] = useState(0);

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
      .catch((err) => console.log(err));
  };

  // Function to get the top three rated products
  const getTopRatedProducts = () => {
    // Sort products based on ratings
    const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
    // Slice to get only the top three rated products
    return sortedProducts.slice(0, 4);
  };

  return (
    <div
      className=" relative bg-bgColorBlack overflow-hidden"
      style={{
        minHeight: "calc(100vh -30px)",
      }}
    >
      <HeroSlider slideIndex={slideIndex} setslideIndex={setslideIndex} />
      <div
        className="flex w-[400vw] text-[white] duration-500 "
        style={{ transform: `translateX(${-100 * slideIndex}vw)` }}
      >
        {getTopRatedProducts().map((rated) => (
          <HeroProduct rated={rated} key={rated.id} />
        ))}
      </div>
    </div>
  );
}
