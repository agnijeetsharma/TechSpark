import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Base_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import FrontPage from "./Landing";
import { useLogin } from "../utils/LoginContext";
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
  const handleLogin = async () => {
    try {
      const result = await axios.post(
        Base_URL + "/login",
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
  const SignUpUser = async () => {
    try {
      let response = await axios.post(
        Base_URL + "/register",
        { username, email: emailId, password },
        { withCredentials: true }
      );
      console.log(response?.data?.data);
      dispatch(addUser(response?.data?.data));
      navigate("/profile");
    } catch (error) {
      setError(
        "Error: " + error?.response?.data?.errors[0] ||
          "Error: " + error?.response?.data?.message ||
          "Something went wrong"
      );
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  const handleSignUpAndSignIn = () => {
    setIsLogin((value) => !value);
    setError("");
    setPassword("");
    setEmailId("");
    setUserName("");
  };
  return (
    <div className="flex justify-center mt-16">
      <FrontPage />
      {isLoginVisible && (
        <div className="card card-border bg-base-300 text-base-content w-96 absolute mt-20">
          <div className="card-body ">
            <h2 className="card-title justify-center">{isLogin?"Login!":"SignUp!"}</h2>
            <div className="">
              {!isLogin && (
                <fieldset className="fieldset py-2  w-full">
                  <legend className="fieldset-legend">UserName*</legend>
                  <input
                    type="text"
                    className="input max-w-xs w-full"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </fieldset>
              )}
              <fieldset className="fieldset py-2 max-w-xs w-full">
                <legend className="fieldset-legend"> Email Id*</legend>
                <input
                  type="text"
                  className="input max-w-xs w-full"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset py-2  w-full">
                <legend className="fieldset-legend">Password*</legend>
                <input
                  type="text"
                  className="input max-w-xs w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500 font-thin">{error}</p>
            <div className="card-actions items-center flex flex-col">
              <button
                className="btn btn-default "
                onClick={isLogin ? handleLogin : SignUpUser}
              >
                {isLogin ? "Login" : "SignUp"}
              </button>
              <p
                className="cursor-pointer text-red-400"
                onClick={() => handleSignUpAndSignIn()}
              >
                {isLogin
                  ? "New User? Sign Up"
                  : "Already have an account? Log In"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
