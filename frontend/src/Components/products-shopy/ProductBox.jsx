import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";

import RatingStars from "../ratingstars/RatingStars";

export const ProductBox = ({ products }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  const handleHeartClick = (productId) => {
    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter((id) => id !== productId));
    } else {
      setLikedProducts([...likedProducts, productId]);
    }
  };

  return (
    <>
      <ToastContainer />
      {products?.map((product) => (
        <div
          key={product?.id}
          className="  flex flex-col hover:translate-y-1 hover:scale-105 transition duration-500 ease-in-out shadow-lg hover:shadow-2xl "
        >
          {/* Product Image */}

          <div className="relative flex h-[150px] w-[230px] items-center justify-center rounded-t-xl bg-white overflow-hidden">
            <img
              src={product?.image}
              alt={product?.name}
              className="object-cover h-full w-full"
            />
            {/* Wishlist Icon */}
            <div className="absolute text-white bg-bgColorWhite right-2 top-2 p-2 rounded-full">
              <div className="relative  cursor-pointer z-[1]">
                <FaHeart
                  onClick={() => (
                    handleHeartClick(product?.id),
                    toast.success(
                      "Product successfully added to your wishlist",
                      {
                        type: "dark",
                      }
                    )
                  )}
                  className={`icon fav ${
                    likedProducts.includes(product?._id) ? "active" : ""
                  }`}
                />
              </div>
            </div>
            {/* Discount Badge */}
            <div className="absolute h-[30px] w-[30px] left-2 top-2 text-xs text-white bg-[#D72A48] flex items-center justify-center rounded-full">
              {product?.discount}%
            </div>
          </div>
          {/* Product Details */}
          <div className="flex items-center justify-between rounded-b-xl bg-[#040e0d] text-white px-2 leading-loose">
            <div className="left px-2 py-3">
              {/* Product Name */}
              <p className="text-sm font-bold">
                {product?.name.slice(0, 12)} ...
              </p>
              {/* Rating */}
              <div className="my-1">
                <RatingStars rating={product?.rating} />
              </div>
              {/* Price */}
              <div className="relative text-base font-bold text-red-600 mx-0 w-fit">
                {product?.price}${/* Original Price */}
                <del className="absolute text-xs text-[#787575] bottom-0 left-full">
                  {product?.newprice}$
                </del>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-col items-center justify-center gap-3 text-xs rounded-lg font-bold lg:justify-normal">
              {/* Add to Cart Button */}
              <button className="flex items-center justify-center w-[100px] gap-1 px-1 py-1 rounded-lg bg-bgColorDanger text-white">
                <p
                  onClick={() => {
                    toast.success(
                      `Product successfully added to your shopping cart`
                    );
                  }}
                >
                  Add To Cart
                </p>
                <FaCartShopping />
              </button>
              {/* Read More Button */}
              <a className="bg-mainColor text-white w-[100px] rounded-lg px-1 py-1 text-center">
                Read More
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
