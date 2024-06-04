import { IoStorefront } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCartShopping, FaHeart, FaUser, FaChalkboard } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import Search from "../search/search";

// import Menu from "./menu";

// eslint-disable-next-line react/prop-types
export default function Header() {
  // const [isActive, setIsActive] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();

  let currentUrl = window.location.href;

  if (currentUrl.includes("/cart")) {
    currentUrl = "/cart";
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  let name = "";
  let user = "/login";
  let cart = "/cart";
  if (userInfo) {
    name = userInfo.name;
    user = "/profile";
  }
  console.log("username : ", name);
  const showSidebar = () => setSidebar(!sidebar);
  let to = "/login";
  let profilename = "Login";
  if (userInfo) {
    to = "/profile";
    profilename = "Profile";
  }

  return (
    <header
      className={`bg-white sticky z-[200] left-0 top-0`}
      style={{ boxShadow: "rgba(0, 0, 0, 0.56) 4px -4px 30px 4px" }}
    >
      <div
        className="container flex items-center justify-between gap-2 py-4 "
        style={{
          marginLeft: "0",
          marginRight: "0",
        }}
      >
        <div className="flex items-center justify-between gap-3 text-sm md:text-lg ">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars
              onClick={showSidebar}
              className="text-2xl text-black"
            />
          </Link>
          <IconContext.Provider
            className="md:text-xl "
            value={{
              color: "white",
            }}
          >
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {SidebarData.map((item, index) => {
                  if (item.title === "Log out") {
                    if (userInfo) {
                      return (
                        <li key={index} className={item.cName}>
                          <Link
                            to={currentUrl}
                            onClick={() => dispatch(logout())}
                          >
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    }
                  } else if (item.title === "profile") {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={to}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  } else if (item.title === "Admin") {
                    if (userInfo && userInfo.isAdmin) {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    }
                  } else if (
                    item.title === "Wishlist" ||
                    item.title === "Cart" ||
                    item.title === "Shop" ||
                    item.title === "Support"
                  ) {
                    if (!userInfo||(userInfo && !userInfo.isAdmin)) {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    }
                  }else if(item.title === "Profile"){
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{profilename}</span>
                        </Link>
                      </li>
                    );
                  }
                   else {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
            </nav>
          </IconContext.Provider>

          {/* Navigation links*/}

          <Link
            to="/"
            className="text-lg sm:text-xl font-bold flex  items-center gap-1"
          >
            <span className="flex items-center justify-center text-white bg-mainColor p-2  rounded-xl text-lg">
              <IoStorefront />
            </span>
            Home Tech
          </Link>

          {/* Hamburger menu button */}
        </div>
        <Search />
        <div className="flex items-center justify-between gap-3 text-sm md:text-lg nav-items">
          <div className="hidden sm:flex items-center gap-3">
            {" "}
            {/* Wrap the navigation items and apply the hidden class */}
            <Link to={user} className="md:text-xl">
              <p>{name}</p>
            </Link>
            <Link to={user} className="md:text-xl">
              <FaUser />
            </Link>
            {(!userInfo || (userInfo && !userInfo.isAdmin ))&& (
              <>
                <div className="border-r-2 py-2 pr-3">
                  <Link to="/wish" className="md:text-xl">
                    <FaHeart />
                  </Link>
                </div>
                <div className="relative">
                  <Link to={cart} className="md:text-xl">
                    <FaCartShopping />
                  </Link>
                </div>
              </>
            )}
            {userInfo && userInfo.isAdmin && (<>
              <div className="relative">
                <Link to="/admin" className="md:text-xl">
                  <FaChalkboard />
                </Link>
              </div>
                <Link to='/admin' className="md:text-xl">
                  <p>Dashbord</p>
                </Link>
                </>
            )}
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
