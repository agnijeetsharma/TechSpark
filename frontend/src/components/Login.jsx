import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Base_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import FrontPage from "./Landing";
import { useLogin } from "../utils/LoginContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const { isLoginVisible } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (isLogin) {
      handleLogin();
    } else {
      SignUpUser();
    }
  };

  // Handle login
  const handleLogin = async () => {
    try {
      const result = await axios.post(
        `${Base_URL}/login`,
        { email: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(result?.data?.data));
      navigate("/");
    } catch (error) {
      setError(
        "Error: " + error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  // Handle signup
  const SignUpUser = async () => {
    try {
      const response = await axios.post(
        `${Base_URL}/register`,
        { username, email: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.data));
      navigate("/profile");
    } catch (error) {
      setError(
        "Error: " +
          (error?.response?.data?.errors?.[0] ||
            error?.response?.data?.message ||
            "Something went wrong")
      );
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignUpAndSignIn = () => {
    setIsLogin((value) => !value);
    setError("");
    setPassword("");
    setEmailId("");
    setUserName("");
  };

  return (
    <div className="flex justify-center mt-16 sm:mt-12">
      <FrontPage />
      {isLoginVisible && (
        <div className="card card-border bg-base-300 text-base-content sm:w-96 absolute mt-20 sm:mt-12">
          <div className="card-body">
            <h2 className="card-title justify-center text-center text-xl sm:text-2xl">
              {isLogin ? "Login!" : "SignUp!"}
            </h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <fieldset className="fieldset py-2 w-full">
                  <legend className="fieldset-legend">UserName*</legend>
                  <input
                    type="text"
                    className="input w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </fieldset>
              )}
              <fieldset className="fieldset py-2 w-full">
                <legend className="fieldset-legend">Email Id*</legend>
                <input
                  type="text"
                  className="input w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
              <fieldset className="relative py-2 w-full">
                <legend className="fieldset-legend">Password*</legend>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </button>
                </div>
              </fieldset>
              <p className="text-red-500 font-thin">{error}</p>
              <div className="card-actions items-center flex flex-col">
                <button
                  className="btn btn-default w-full sm:w-auto"
                  type="submit"
                >
                  {isLogin ? "Login" : "SignUp"}
                </button>
                <p
                  className="cursor-pointer text-red-400 text-sm mt-4"
                  onClick={handleSignUpAndSignIn}
                >
                  {isLogin
                    ? "New User? Sign Up"
                    : "Already have an account? Log In"}
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
