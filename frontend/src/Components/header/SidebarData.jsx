import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Shop',
    path: '/shop',
    icon:<FaShoppingBag />,
    cName: 'nav-text'
  },

  {
    title: 'Cart',
    path: '/Cart',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  
  {
    title: 'Wishlist',
    path: '/wishlist',
    icon:<FaHeartCirclePlus />,
    cName: 'nav-text'
  },
 
  {
    title: 'Admin',
    path: '/admin',
    icon: <RiAdminFill />,
    cName: 'nav-text'
  },
  {
    title: 'profile',
    path: '/profile',
    icon: <FaUser />,
    cName: 'nav-text'
  },
  
  {
    title: 'Log out',
    path: '/',
    icon: <TbLogout />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];
