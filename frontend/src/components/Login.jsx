import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import FrontPage from "./Landing";
import { useLogin } from "../utils/LoginContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import api from "../utils/axiosInstance";

const Login = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useLogin();
  const { isLoginVisible } = useLogin();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (user) navigate("/posts");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    isLogin ? handleLogin() : handleSignup();
  };

  const handleLogin = async () => {
    try {
      const result = await api.post("/login", { email: emailId, password });
      const data = result.data;
      dispatch(addUser(result?.data?.data));
      setShowToast(true);
      login(data?.token);
      localStorage.setItem("token", data?.data?.token);
      setTimeout(() => setShowToast(false), 3000);
      navigate("/posts");
    } catch (err) {
      setError(
        "Error: " + (err?.response?.data?.message || "Something went wrong")
      );
    }
  };

  const handleSignup = async () => {
    try {
      const result = await api.post("/register", {
        username,
        email: emailId,
        password,
      });
      const data = result.data;
      dispatch(addUser(result?.data?.data));
      localStorage.setItem("token", data?.token);
      navigate("/profile");
      login(data?.token);
      setIsLogin(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(
        "Error: " +
          (err?.response?.data?.errors?.[0] ||
            err?.response?.data?.message ||
            "Something went wrong")
      );
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
    setError("");
    setPassword("");
    setEmailId("");
    setUserName("");
  };

  return (
    <div className="relative min-h-screen bg-base-100 text-base-content">
      <FrontPage />

      {isLoginVisible && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50  max-w-md w-96">
          <div className="card bg-base-200 shadow-md text-center mt-10 sm:mt-16 md:mt-20 lg:mt-0">
            <div className="card-body ">
              <h2 className="card-title text-center text-2xl font-bold">
                {isLogin ? "Login" : "Sign Up"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="label label-text font-medium">
                      Username
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="label label-text font-medium">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label label-text font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible size={20} />
                      ) : (
                        <AiFillEye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="card-actions flex flex-col items-center gap-2 mt-4">
                  <button className="btn btn-primary w-full" type="submit">
                    {isLogin ? "Login" : "Sign Up"}
                  </button>
                  <p
                    className="text-sm text-primary cursor-pointer"
                    onClick={handleToggleMode}
                  >
                    {isLogin
                      ? "New here? Create an account"
                      : "Already have an account? Log in"}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="toast toast-top toast-center mt-24 z-50">
          <div className="alert alert-success">
            <span>
              {isLogin ? "Login successful 🎉" : "Signed up successfully 🎉"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
