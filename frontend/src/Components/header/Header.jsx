import { IoStorefront } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'

// import Menu from "./menu";


// eslint-disable-next-line react/prop-types
export default function Header() {
 
  // const [isActive, setIsActive] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch()



  const userLogin = useSelector(state => state.userLogin)
  const { error, loading, userInfo } = userLogin

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <header
      className={`bg-white sticky z-[99999] left-0 top-0`}
      style={{ boxShadow: "rgba(0, 0, 0, 0.56) 4px -4px 30px 4px" }}
    >
      <div
        className="container flex items-center justify-between gap-2 py-4 "
        style={{
          marginLeft: "0",
          marginRight: "0"
         }}
      >
        <div className="flex items-center justify-between gap-3 text-sm md:text-lg ">
        
       
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} className="text-2xl text-black"/>
          </Link>
          <IconContext.Provider className="md:text-xl " value={{
            color: 'white'
            
           }}>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose   />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              if (item.title ===  'Log out') {
                if(userInfo){
                  return (
                    <li key={index} className={item.cName}>
                      <Link to= "#" onClick={() => dispatch(logout())}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                }
              }else
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
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
        <div className="flex items-center justify-between gap-3 text-sm md:text-lg nav-items">
  <div className="hidden sm:flex items-center gap-3"> {/* Wrap the navigation items and apply the hidden class */}
    <Link to="/login" className="md:text-xl">
      <FaUser />
    </Link>
   
    <div className="border-r-2 py-2 pr-3">
      <Link to="/login" className="md:text-xl">
        <FaHeart />
      </Link>
    </div>
    
    <div className="relative">
      <Link to="" className="md:text-xl">
        <FaCartShopping />
      </Link>
    </div>
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
