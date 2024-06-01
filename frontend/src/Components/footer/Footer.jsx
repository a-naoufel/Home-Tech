

// import { FaApplePay, FaCcVisa } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="bg-bgColorBlack text-center">
      <div className="container flex flex-wrap justify-between border-b-2 py-12">
        <div className="flex w-[30%] flex-col gap-2 text-white">
          <div className="mx-auto">
      
          </div>
          <p className="opacity-30 duration-1000 hover:opacity-100">
            Customer Supports:
          </p>
          <p>(+213) 0655881621</p>
          <p className="opacity-30 duration-1000 hover:opacity-100 ">
         home
          </p>
          <p className="opacity-30 duration-1000 hover:opacity-100 ">
           home
          </p>
          <p>hometech.com</p>
        </div>
        <div className="flex w-[30%] flex-col gap-2 text-white">
           <p className="cursor-pointer opacity-30 duration-1000 hover:opacity-100">Quick Links</p>
           <p className="cursor-pointer opacity-30 duration-1000 hover:opacity-100">New Arrivals</p>
           <p className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"> Phones</p>
           <p className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"> Daily</p>
         
        </div>
        <div className="flex w-[30%] flex-col gap-2 text-white">
            <p className="cursor-pointer opacity-30 duration-1000 hover:opacity-100">Settings</p>
            <p className="cursor-pointer opacity-30 duration-1000 hover:opacity-100">My Account </p>
            <p className="cursor-pointer opacity-30 duration-1000 hover:opacity-100">Shoping Cart</p>
            <p className="cursor-pointer opacity-30 duration-1000 hover:opacity-100">Wishlist</p>
          
        </div>
      </div>
      <div className="container flex flex-col items-center justify-between gap-2 py-6 text-white md:flex-row">
        <p className="opacity-30 duration-1000 hover:opacity-100">
          Home Tech eCommerce © {new Date().getFullYear()}. All Rights Reserved
        </p>
        <div className="flex gap-2 text-3xl">
          <img
            src="/Method=Discover.png"
            alt="Method=Discover.png"
          />
          <img
            src="/Method=Mastercard.png"
            alt="Mastercard.png"
          />
          <img
            src="/Method=ApplePay.png"
            alt="ApplePay.png"
          />
        </div>
      </div>
    </footer>
  );
}
