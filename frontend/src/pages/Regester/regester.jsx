import { useState } from "react";
import axios from "axios";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";

const Regester = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/api/user/register/", {
        username,
        password,
        email,
      });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/login");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div
          style={{
            minHeight: "calc(100vh - 70.94px)",
            boxShadow: "rgb(255 255 255 / 30%) 0px 0px 74px 55px",
          }}
          className="flex h-full  w-auto flex-col justify-center  px-6 md:w-1/2"
        >
          <p className="text-xl font-bold">Sign Up</p>
          <p className="text-sm">
            Sign up for free to access to in any of our products{" "}
          </p>

          <div className="log-in relative my-2 text-center  "></div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="username">Username : </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="mb-2 mt-1 rounded-lg border-2 py-1 pl-2 focus:outline-none"
            />

            <label htmlFor="email">Email : </label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-2 mt-1 rounded-lg border-2 py-1 pl-2 focus:outline-none" />
            <div className="flex justify-between">
              <label htmlFor="passworld" className="">
                Password
              </label>
              <div className="mr-2 flex cursor-pointer gap-2 text-lg opacity-60">
                <FaEyeSlash />
              </div>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mb-2 mt-1 rounded-lg border-2 py-2 pl-2 focus:outline-none"
            />
            <span className="mb-2 mt-1 text-center text-bgColorDanger opacity-50">
              Use 8 or more characters with a mix of letters, numbers & symbols
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
              Sign Up
            </button>
            <div className="mt-2 flex items-center justify-center gap-2">
              <p className="opacity-50">Already Have An Account ? </p>
              <Link to="/login" className="text-mainColor underline">
                log In
              </Link>
            </div>
          </form>
        </div>
        <div className=" my-container hidden h-full w-1/2 md:block"></div>
      </div>
    </>
  );
};

export default Regester;
