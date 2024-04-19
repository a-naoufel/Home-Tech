import { useState } from "react";
import axios from "axios";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Page = () => {
  

  return (
    <>
      <div className="">
      <div className=" flex items-center justify-center ">
        <div
          className="hidden h-full  w-1/2 md:block"
          style={{
            minHeight: "calc(100vh )",
            backgroundImage: `url(/${"jdk.jpg"})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
           
           
          }}
          >
            
        </div>
        <div
          style={{
            minHeight: "calc(100vh )",
            boxShadow: "rgb(255 255 255 / 30%) 0px 0px 74px 55px",
          }}
          className="flex h-full w-full flex-col justify-center  px-6 md:w-1/2"
        >
          <p className="text-xl font-bold">Sign In</p>
          <button className="my-2 flex w-full justify-center gap-2 rounded-xl   border-2 py-2 text-mainColor">
            <img src="/Google.svg" alt="google"  />
            <p>Continue With Google</p>
            </button>
            <button className="my-2 flex w-full justify-center gap-2 rounded-xl   border-2 py-2 text-mainColor">
            <img src="/" alt="Twitter"  />
            <p>Continue With Twitter</p>
          </button>
          <div className="log-in relative my-2 text-center  ">
            <span className="relative z-20 mx-auto  bg-white px-2 font-bold">OR</span>
          </div>
          <form className="flex flex-col" >
            <label htmlFor="email">Email : </label>
            <input
            
             
              type="email"
              id="email"
              className="mb-2 mt-1 rounded-lg border-2 py-1 pl-2 focus:outline-none"
            />
            <div className="flex justify-between">
              <label htmlFor="password">Password</label>
              <div className="mr-2 flex cursor-pointer gap-2 text-lg opacity-60">
                <FaEyeSlash />
              </div>
            </div>
            <input
              type="password"
              id="password"
             
              className="mb-2 mt-1 rounded-lg border-2 py-2 pl-2 focus:outline-none"
            />
            <span className="mb-2 mt-1 text-center text-bgColorDanger opacity-50">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>
            <button
              type="submit"
              className="mx-auto w-fit rounded-xl bg-mainColor px-6 py-2 text-xl font-bold text-white"
            >
              Sign In
            </button>
            <div className="mt-2 flex items-center justify-center gap-2">
              <p className="opacity-50">Don't Have An Account ? </p>
              <Link to="/regester" className="text-mainColor underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
        </div>
        </div>
    </>
  );
};

export default Page;
