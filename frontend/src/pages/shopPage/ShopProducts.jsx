import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState } from "react";
import RatingStars from "../../Components/ratingstars/RatingStars";

export const ShopProducts = ({ product }) => {
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
      <div className="container py-6 bg-bgColorWhite">
        <div className="my-12 flex flex-wrap justify-center gap-8 ">
          {product.map((prod) => (
            <div
              key={prod?._id}
              className="  flex flex-col hover:translate-y-1 hover:scale-105 transition duration-500 ease-in-out shadow-lg hover:shadow-2xl "
            >
              {/* Product Image */}
              <div className="relative flex h-[150px] w-[230px] items-center justify-center rounded-t-xl bg-white overflow-hidden">
                <Link to={`/product/${prod?._id}`}>
                  <img
                    src={prod?.image}
                    alt={prod?.name}
                    className="object-cover h-full w-full"
                  />
                </Link>

                {/* Wishlist Icon */}
                <div className="absolute text-white bg-bgColorWhite right-2 top-2 p-2 rounded-full">
                  <div className="relative text-bgColorDanger cursor-pointer z-[1]">
                    <FaHeart
                      onClick={() => (
                        handleHeartClick(prod?.id),
                        toast.success(
                          "Product successfully added to your wishlist",
                          {
                            type: "dark",
                          }
                        )
                      )}
                      className={`icon fav ${
                        likedProducts.includes(prod?.id) ? "active" : ""
                      }`}
                    />
                  </div>
                </div>
                {/* Discount Badge */}
                <div className="absolute h-[30px] w-[30px] left-2 top-2 text-xs text-white bg-[#D72A48] flex items-center justify-center rounded-full">
                  {prod?.discount}%
                </div>
              </div>
              {/* Product Details */}
              <div className="flex items-center justify-between rounded-b-xl bg-[#040e0d] text-white px-2 leading-loose">
                <div className="left px-2 py-3">
                  {/* Product Name */}
                  <p className="text-sm font-bold ">
                    {prod?.name.slice(0, 12)}...{" "}
                  </p>
                  {/* Rating */}
                  <div className="my-1">
                    <RatingStars rating={prod?.rating} />
                  </div>
                  {/* Price */}
                  <div className="relative text-base font-bold text-red-600 mx-0 w-fit">
                    {prod?.price}${/* Original Price */}
                    <del className="absolute text-xs text-[#787575] bottom-0 left-full">
                      {prod?.newprice}$
                    </del>
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex flex-col items-center justify-center gap-3 text-xs rounded-lg font-bold lg:justify-normal">
                  {/* Add to Cart Button */}
                  <button className="flex items-center justify-center w-[100px] gap-1 px-1 py-1 rounded-lg bg-bgColorDanger text-white">
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
          ))}
        </div>
      </div>
    </>
  );
};
