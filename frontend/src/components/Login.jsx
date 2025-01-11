import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Base_URL } from "../constant";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
 const [error,setError]=useState("")
  const handleLogin = async () => {
    console.log(emailId, password);
    try {
      const result = await axios.post(
        Base_URL + "/login",
        { email: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(result?.data?.data));
      navigate("/feed");
      // console.log(result);
    } catch (error) {
      setError(error?.response?.data?.message||
        "Something went wrong"
      )
      
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card card-border bg-base-300 w-96 ">
        <div className="card-body ">
          <h2 className="card-title justify-center">Login!</h2>
          <div className="">
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
          <p1 className="text-red-500 font-thin">{error}</p1>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
