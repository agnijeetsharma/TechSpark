import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Base_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.webp";
import { useLogin } from "../utils/LoginContext";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUserName]=useState("")
  const [isLogin,setIsLogin]=useState(true)
  const [error, setError] = useState("");
  const { isLoginVisible } = useLogin();
  const handleLogin = async () => {
    console.log(emailId, password);
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
  const SignUpUser=async()=>{
    try {
      const response=await axios.post(Base_URL+"/register",{username,email:emailId,password},{withCredentials:true})
      console.log(response?.data?.data)
      navigate("/profile");
    } catch (error) {
      console.log(error)

      
    }
  }

  return (
    <div
      className="flex justify-center mt-10"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "60px",
      }}
    >
      {isLoginVisible && (
        <div className="card card-border bg-customGray w-96 ">
          <div className="card-body ">
            <h2 className="card-title justify-center">Login!</h2>
            <div className="">
           { !isLogin&&<fieldset className="fieldset py-2  w-full">
                <legend className="fieldset-legend">UserName</legend>
                <input
                  type="text"
                  className="input max-w-xs w-full"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </fieldset>}
              <fieldset className="fieldset py-2 max-w-xs w-full">
                <legend className="fieldset-legend"> Email Id</legend>
                <input
                  type="text"
                  className="input max-w-xs w-full"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset py-2  w-full">
                <legend className="fieldset-legend">Password</legend>
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
              <button className="btn btn-default " onClick={isLogin?handleLogin:SignUpUser}>
                {isLogin?"Login":"SignUp"}
              </button>   
              <p className="cursor-pointer text-red-400" onClick={()=>setIsLogin(value=>!value)}>{isLogin?"New User Sign Up":"LogIn Now"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
