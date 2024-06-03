import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { FaMagnifyingGlass } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";

function Search() {
  const [keyword, setKeyword] = useState("");
  let location = useLocation();
  let locationPath = location.pathname;

  let history = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      console.log("keyword", keyword);
      console.log("location.pathname", locationPath);
      if (locationPath.includes("/admin")) {
        history(`/admin/productlist/?keyword=${keyword}&?page=1`);
      } else {
        history(`/shop/?keyword=${keyword}&page=1`);
      }
    } else {
      history();
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="flex items-center rounded-2xl border-2 border-solid border-[#dddddd] text-base md:text-lg">
        <div className="flex items-center justify-center rounded-l-xl p-2">
          <FaMagnifyingGlass />
        </div>
        <input
          type="text"
          className="w-[50px] pl-1 placeholder:text-[0px] focus:outline-none sm:w-[200px] sm:placeholder:text-sm md:w-[300px]"
          placeholder="Search for products"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="bg-mainColor h-full rounded-r-xl px-3 py-2 text-sm text-[white] "
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
