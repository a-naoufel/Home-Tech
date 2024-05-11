import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
export default function HeroProduct({rated}) {
  // Function to handle click event
 

  return (
    <div
      // Container div with Tailwind CSS classes
      className="container relative z-50 flex h-full w-[100vw] flex-col-reverse flex-wrap items-center justify-center gap-2 gap-y-6 py-12 lg:flex-row lg:justify-between"
      style={{ minHeight: "calc(100vh - 87px)" }}
    >
      {/* Text content */}
      <div className="w-full text-center leading-loose lg:w-1/2 lg:text-left">
        <p className="mb-2 text-5xl font-bold">{ rated?.name}</p>
        {/* Description */}
        <p className="opacity-60">
        { rated?.description}
        </p>
        {/* Price */}
        <div className="my-2">
          <div className="relative mx-auto w-fit text-3xl text-red-600 lg:mx-0">
           {rated?.price} $                                                          
            <del className="absolute bottom-0 left-full text-sm text-white">
            { rated?.newprice}$
            </del>
          </div>
          {/* Offer message */}
          <p className="text-sm opacity-60">
            Don't miss this limited time offer.
          </p>
        </div>
        {/* Buttons */}
        <div className="my-6 flex items-center justify-center gap-3 font-bold lg:justify-normal">
          {/* Read More Button */}
         
          {/* Add to Cart Button */}
          <button
            className="flex w-[150px] items-center gap-1 rounded-xl bg-red-600 px-3 py-1 text-white"
           
          >
            <p>Add To Cart</p>
            <FaCartShopping />
          </button>
          <Link to={"/shop"}
            className="flex w-[150px] items-center gap-1 rounded-xl bg-mainColor px-3 py-1 text-white"
           
          >
            <p>Show more</p>
            <BsArrowRight className="text-3xl pl-1" />
          </Link>
        </div>
      </div>
      {/* Image */}
      <img src={rated?.image} alt="#" width="400" height="400" />
    </div>
  );
}
