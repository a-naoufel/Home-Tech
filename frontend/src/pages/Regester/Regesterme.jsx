import { useState } from "react";
import axios from "axios";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  FaGooglePlusG,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
const Regesterme = () => {
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
    <div className="bg-gradient-to-r from-gray-300 to-blue-200 flex items-center justify-center flex-col h-screen font-montserrat box-border container-togge">
      <div
        className="bg-[#fff] rounded-[30px] relative overflow-hidden w-[768px] max-w-[100%] min-h-[480px] "
        style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)" }}
        id="container"
      >
        <div className="absolute top-0 h-full transition-all duration-600 ease-in-out  right-0 w-1/2 z-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white h-[100%] flex items-center justify-center flex-col px-10"
          >
            <h1 className="text-3xl font-bold mb-6">Sign In</h1>
            <div className="my-5 mx-0 social-icons">
              <a href="#" className="icon">
                <FaGooglePlusG />
              </a>
              <a href="#" className="icon">
                <FaFacebookF />
              </a>
              <a href="#" className="icon">
                <FaGithub />
              </a>
              <a href="#" className="icon">
                <FaLinkedinIn />
              </a>
            </div>
            <span className="text-sm pb-1">or use your email password</span>
            <input
              className="bg-gray-200 border-none my-2 py-[10px] px-[15px] text-sm rounded-lg w-full outline-none"
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <button  type="submit" className="bg-mainColor  text-white text-xs font-semibold uppercase py-[15px] px-[45px] rounded-[12px] font-montserrat tracking-wide hover:bg-blue-500 focus:outline-none focus:border-blue-900 focus:ring  disabled:opacity-50 cursor-pointer mt-[10px]">
            Sign In
            </button>
          </form>
        </div>
        <div className="absolute top-0 right-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out rounded-br-[150px]   rounded-tr-[100px] z-10">
          <div
            className=" text-white relative left-[-100%] h-full w-[200%] transform transition-all duration-600 ease-in-out"
            style={{
              backgroundColor: "#2b4162",
              backgroundImage:
                "linear-gradient(315deg, #2b4162 0%, #12100e 74%)",
            }}
          >
            <div className="toggle-panel toggle-right">
              <h1 className="text-3xl font-bold mb-6">Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button onClick={(e)=>navigate("/login") } className="bg-mainColor  text-white text-xs font-semibold uppercase py-[15px] px-[45px] rounded-[12px] font-montserrat tracking-wide hover:bg-blue-500 focus:outline-none focus:border-blue-900 focus:ring  disabled:opacity-50 cursor-pointer mt-[10px]">
              <Link to="/login">Sign Up</Link>  
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regesterme;
