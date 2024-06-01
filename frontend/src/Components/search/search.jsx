import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { FaMagnifyingGlass } from "react-icons/fa6";


function Search() {
    const [keyword, setKeyword] = useState('')

    let history = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history(`/shop/?keyword=${keyword}&page=1`)
        } else {
            history()
        }
    }
    return (
        
        <form onSubmit={submitHandler} >
        <div className="flex items-center rounded-2xl border-2 border-solid border-[#dddddd] text-base md:text-lg">
          <div className="flex items-center justify-center rounded-l-xl p-2">
            <FaMagnifyingGlass />
          </div>
          <input
            type="text"
            className="w-[50px] pl-1 placeholder:text-[0px] focus:outline-none sm:w-[200px] sm:placeholder:text-sm md:w-[300px]"
            placeholder="Search for products"
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button 
            className="bg-mainColor h-full rounded-r-xl px-3 py-2 text-sm text-[white] "
            type='submit'
          >
            Search
          </button>
        </div>
        </form>
    )
}

export default Search