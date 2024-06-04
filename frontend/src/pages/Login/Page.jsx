import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { useNavigate, useLocation } from "react-router-dom";
import { login, logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";
import "./style.css";
import {
  FaGooglePlusG,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

const Page = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(from, { state: { from: from } });
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setMessage("Please fill in all fields");
    } else if (!isValidEmail(email)) {
      setMessage("Please enter a valid email");
    } else {
      dispatch(login(email, password));
    }
  };

  return (

    <div className="bg-gradient-to-r from-gray-300 to-blue-200 flex items-center justify-center flex-col h-screen font-montserrat box-border container-togge">
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <div
        className="bg-[#fff] rounded-[30px] relative overflow-hidden w-[768px] max-w-[100%] min-h-[480px]"
        style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)" }}
        id="container"
      >
        <div className="absolute top-0 h-full transition-all duration-600 ease-in-out  left-0  z-10 w-[100%] sm:w-[50%]">
          <form
            onSubmit={submitHandler}
            className="bg-white h-[100%] flex items-center justify-center flex-col px-10"
          >
            <h1 className="text-3xl font-bold mb-6">Sign In</h1>
            <span className="text-sm pb-1"> use your email password</span>

            <input
              className="bg-gray-200 border-none my-2 py-[10px] px-[15px] text-sm rounded-lg w-full outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="bg-gray-200 border-none my-2 py-[10px] px-[15px] text-sm rounded-lg w-full outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-mainColor  text-white text-xs font-semibold uppercase py-[15px] px-[45px] rounded-[12px] font-montserrat tracking-wide hover:bg-blue-500 focus:outline-none focus:border-blue-900 focus:ring  disabled:opacity-50 cursor-pointer mt-[10px]"
            >
              {loading && <LoadingIndicator />}
              Sign In
            </button>
            <Link to="/register" className="block sm:hidden">
              or sing up?
            </Link>
          </form>
        </div>
        <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out rounded-bl-[100px]   rounded-tl-[150px] z-10 hidden sm:block">
          <div
            className=" text-white relative left-[-100%] h-full w-[200%] transform transition-all duration-600 ease-in-out"
            style={{
              backgroundColor: "#2b4162",
              backgroundImage:
                "linear-gradient(315deg, #2b4162 0%, #12100e 74%)",
            }}
          >
            <div className="toggle-panel toggle-right">
              <h1 className="text-3xl font-bold mb-6">Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                onClick={(e) =>
                  navigate("/register", { state: { from: from } })
                }
                type="submit"
                className="bg-mainColor  text-white text-xs font-semibold uppercase py-[15px] px-[45px] rounded-[12px] font-montserrat tracking-wide hover:bg-blue-500 focus:outline-none focus:border-blue-900 focus:ring  disabled:opacity-50 cursor-pointer mt-[10px]"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
