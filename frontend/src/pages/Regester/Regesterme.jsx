import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



import { useNavigate, useLocation } from "react-router-dom";
import { register } from "../../actions/userActions";
import Message from "../../Components/Message";
import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";

const Regesterme = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  console.log("from", from);

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(from, { state: { from: from } });
    }
  }, [userInfo]);

  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [confirmationValidationMessage, setConfirmationValidationMessage] =
    useState("");
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  const [hasStartedTypingPassword, setHasStartedTypingPassword] =
    useState(false);
  const [hasStartedTypingConfirmation, setHasStartedTypingConfirmation] =
    useState(false);

  let debounceTimeoutPassword;
  let debounceTimeoutConfirmation;

  const handleChangePassword = (value) => {
    if (!hasStartedTypingPassword) setHasStartedTypingPassword(true);

    setPasswordInput(value);

    clearTimeout(debounceTimeoutPassword);
    debounceTimeoutPassword = setTimeout(() => validatePassword(value), 500); // 500ms debounce time
  };

  const handleChangeConfirmation = (value) => {
    if (!hasStartedTypingConfirmation) setHasStartedTypingConfirmation(true);

    setConfirmPasswordInput(value);

    clearTimeout(debounceTimeoutConfirmation);
    debounceTimeoutConfirmation = setTimeout(
      () => validateConfirmation(value),
      500
    ); // 500ms debounce time
  };

  const validatePassword = (value) => {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");

    setLowerValidated(lower.test(value));
    setUpperValidated(upper.test(value));
    setNumberValidated(number.test(value));
    setSpecialValidated(special.test(value));
    setLengthValidated(length.test(value));
  };

  const validateConfirmation = (value) => {
    if (value !== passwordInput) {
      setConfirmationValidationMessage(
        "password and confirmation aren't matching !"
      );
    } else {
      setConfirmationValidationMessage("");
    }
  };

  const getValidationMessagePassword = () => {
    if (!hasStartedTypingPassword || passwordInput === "") return "";
    // No validation message if the user hasn't started typing yet
    if (!lowerValidated) return "must contain lowercase!";
    if (!upperValidated) return "must contain uppercase!";
    if (!numberValidated) return "must contain numbers !";
    if (!specialValidated) return "must contain special characters !";
    if (!lengthValidated) return "must be at least 8 characters !";
    return "";
  };

  const getValidationMessageConfirmation = () => {
    if (!hasStartedTypingConfirmation || confirmPasswordInput === "") return ""; // No validation message if the user hasn't started typing yet
    return confirmationValidationMessage;
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  


  const submitHandler = (e) => {
    e.preventDefault();

    if (
      passwordInput !== confirmPasswordInput ||
      !lowerValidated ||
      !upperValidated ||
      !numberValidated ||
      !specialValidated ||
      !lengthValidated 
    ) {
      setPasswordValidationMessage("Password is not valid");
    }else if (username === "" || email === "" || passwordInput === "") {
      setMessage("Please fill in all fields");
    } else if(!isValidEmail(email)){
      setMessage("Please enter a valid email");
    }
     else {
      dispatch(register(username, email, passwordInput));
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-300 to-blue-200 flex items-center justify-center flex-col h-screen font-montserrat box-border container-togge">
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <div
        className="bg-[#fff] rounded-[30px] relative overflow-hidden w-[768px] max-w-[100%] min-h-[480px] "
        style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)" }}
        id="container"
      >
        <div className="absolute top-0 h-full transition-all duration-600 ease-in-out  right-0  z-10 w-[100%] sm:w-[50%]">
          <form
            onSubmit={submitHandler}
            className="bg-white h-[100%] flex items-center justify-center flex-col px-10"
          >
            <h1 className="text-3xl font-bold mb-6">Creat Acount</h1>

            <span className="text-sm pb-1"> use your email password</span>
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
              value={passwordInput}
              onChange={(e) => handleChangePassword(e.target.value)}
            />
            {hasStartedTypingPassword && (
              <div className="text-[12px] text-red-600 text-left">
                {getValidationMessagePassword()}
              </div>
            )}
            <input
              className="bg-gray-200 border-none my-2 py-[10px] px-[15px] text-sm rounded-lg w-full outline-none"
              type="password"
              placeholder="Confirm Password"
              value={confirmPasswordInput}
              onChange={(e) => handleChangeConfirmation(e.target.value)}
            />
            {hasStartedTypingConfirmation && (
              <div className="text-[12px] text-red-600 text-left">
                {getValidationMessageConfirmation()}
              </div>
            )}

            <button
              type="submit"
              className="bg-mainColor  text-white text-xs font-semibold uppercase py-[15px] px-[45px] rounded-[12px] font-montserrat tracking-wide hover:bg-blue-500 focus:outline-none focus:border-blue-900 focus:ring  disabled:opacity-50 cursor-pointer mt-[10px]"
            >
              {loading && <LoadingIndicator />}
              Sign Up
            </button>
            <Link to="/login" className="block sm:hidden">
              or sing in?
            </Link>
          </form>
        </div>
        <div className="absolute top-0 right-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out rounded-br-[150px]   rounded-tr-[100px] z-10 hidden sm:block">
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
              <button
                onClick={(e) => navigate("/login", { state: { from: from } })}
                className="bg-mainColor  text-white text-xs font-semibold uppercase py-[15px] px-[45px] rounded-[12px] font-montserrat tracking-wide hover:bg-blue-500 focus:outline-none focus:border-blue-900 focus:ring  disabled:opacity-50 cursor-pointer mt-[10px]"
              >
                <Link to="/login">Sign In</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regesterme;