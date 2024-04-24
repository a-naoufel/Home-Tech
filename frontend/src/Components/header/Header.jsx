import { IoStorefront } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Header({ notification}) {
  return (
    <header
      className={`bg-white sticky z-[99999] left-0 top-0`}
      style={{ boxShadow: "rgba(0, 0, 0, 0.56) 4px -4px 30px 4px" }}
    >
      <div className="container flex items-center justify-between gap-2 py-2">
        <Link to="/" className="text-base sm:text-xl font-bold flex  items-center gap-1">
          <span className="flex items-center justify-center text-white bg-mainColor p-2  rounded-xl text-lg">
            <IoStorefront />
          </span>
          Home Tech
        </Link>
        <div className="flex items-center rounded-2xl border-2 border-solid border-[#dddddd] text-base md:text-lg">
          <div className="flex items-center justify-center rounded-l-xl p-2">
            <FaMagnifyingGlass />
          </div>
          <input
            type="text"
            className="w-[50px] pl-1 placeholder:text-[0px] focus:outline-none sm:w-[200px] sm:placeholder:text-sm md:w-[300px]"
            placeholder="Search for products"
          />
          <button className="bg-mainColor h-full rounded-r-xl px-3 py-2 text-sm text-[white] ">
            Search
          </button>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm md:text-lg ">
      <Link to="/login" className=" md:text-xl ">
        <FaUser />
      </Link>
      <div className="border-r-2 py-2 pr-3">
        <Link to="/login" className=" md:text-xl ">
          <FaHeart />
        </Link>
      </div>
      <div className="relative">
        <Link to="/loginaymen" className="md:text-xl">
          {notification !== 0 && (
            <div className="bg-red-600 text-[9px] text-white rounded-full w-4 h-4 flex justify-center items-center absolute -top-[5px] -right-1 transform translate-x-1/2 -translate-y-1/2">
              {notification}
            </div>
          )}
          <FaCartShopping />
        </Link>
      </div>
    </div>
      </div>
      {/* <div className="cart-details">
              <p className="title">Shopping cart:</p>
              <p>${cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0).toFixed(2)}</p>
            </div> */}
    </header>
  );
}
