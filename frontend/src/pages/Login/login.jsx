import { useState } from "react";
import axios from "axios";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";

const Page = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = "Login"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post("/api/token/", { username, password })
            
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };


  return (
    <>
      <div className="">
        <div className=" flex items-center justify-center ">
          <div className=" my-container hidden h-full  w-1/2 md:block"></div>
          <div
            style={{
              minHeight: "calc(100vh )",
              boxShadow: "rgb(255 255 255 / 30%) 0px 0px 74px 55px",
            }}
            className="flex h-full w-full flex-col justify-center  px-6 md:w-1/2"
          >

            <div className="log-in relative my-2 text-center  ">

            </div>
            <form onSubmit={handleSubmit} className="flex flex-col"> 
              <label htmlFor="name">Name : </label>
              <input
                type="text"
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                id="password"
                className="mb-2 mt-1 rounded-lg border-2 py-2 pl-2 focus:outline-none"
              />
              <span className="mb-2 mt-1 text-center text-bgColorDanger opacity-50">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </span>
              <div
                className="mt-2 flex items-center justify-center gap-2"
                >
              {loading && <LoadingIndicator />}
              </div>
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
