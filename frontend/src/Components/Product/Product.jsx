import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import RatingStars from "../ratingstars/RatingStars";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function Product({ notification, setnotification }) {
  const [wishList, setwishList] = useState(false);

  const handleClick = () => {
    setnotification(notification + 1);
  };

  const addWishListHandler = () => {
    setwishList(!wishList);
    toast.success("Added successfly to wishlist", {
      position: "top-center",
      style: {
        backgroundColor: "white", 
        color: "balck", 
        fontSize: "16px",
        padding: "15px 20px", // Adjusted padding
        lineHeight: "1.5",
        width: "100%",
        fontWeight: "500", // Increased font weight
        borderRadius: "20px", // Rounded corners
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        border: "none", // Border
        marginTop: "35px",
      },
    });
  };

  

  return (
    <>
    <div className="flex flex-col hover:translate-y-1 hover:scale-105 transition duration-500 ease-in-out shadow-lg hover:shadow-2xl ">
  {/* Product Image */}
  <div className="relative flex h-[150px] w-[230px] items-center justify-center rounded-t-xl bg-white overflow-hidden">
    <img src="/ref.png" alt="aymen.png" className="w-[100%] h-[100%]" />
    {/* Wishlist Icon */}
    <div className="absolute text-white bg-bgColorWhite right-2 top-2 p-2 rounded-full">
      {wishList ? (
        <div
          className="relative text-bgColorDanger cursor-pointer z-[1]"
          onClick={() => setwishList(!wishList)}
        >
          <FaHeart className="" />
        </div>
      ) : (
        <div
          className="relative cursor-pointer z-[1]"
          onClick={() => addWishListHandler()}
        >
          <FaRegHeart className="text-black" />
        </div>
      )}
    </div>
    {/* Discount Badge */}
    <div className="absolute h-[30px] w-[30px] left-2 top-2 text-xs text-white bg-[#D72A48] flex items-center justify-center rounded-full">
      50%
    </div>
  </div>
  {/* Product Details */}
  <div className="flex items-center justify-between rounded-b-xl bg-[#040e0d] text-white px-2 leading-loose">
    <div className="left px-2 py-3">
      {/* Product Name */}
      <p className="text-sm font-bold">Product</p>
      {/* Rating */}
      <div className="my-1">
        <RatingStars />                 
      </div>
      {/* Price */}
      <div className="relative text-base font-bold text-red-600 mx-0 w-fit">
        $1000
        {/* Original Price */}
        <del className="absolute text-xs text-[#787575] bottom-0 left-full">
          $1000
        </del>
      </div>
    </div>
    {/* Buttons */}
    <div className="flex flex-col items-center justify-center gap-3 text-xs rounded-lg font-bold lg:justify-normal">
      {/* Add to Cart Button */}
      <button
        className="flex items-center justify-center w-[100px] gap-1 px-1 py-1 rounded-lg bg-bgColorDanger text-white"
        onClick={handleClick}
      >
        <p>Add To Cart</p>
        <FaCartShopping />
      </button>
      {/* Read More Button */}
      <a className="bg-mainColor text-white w-[100px] rounded-lg px-1 py-1 text-center">
        Read More
      </a>
    </div>
  </div>
</div>

    </>
  );
}
