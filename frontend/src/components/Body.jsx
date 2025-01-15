import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useEffect } from "react";
import { Base_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const selector = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location =useLocation()
  const fetchUser = async () => {
    if (selector) return;
    try {
      const response = await axios.get(Base_URL + "/profile/view", {
        withCredentials: true,
      });
      // console.log(response);
      // dispatch(removeUser())
      dispatch(addUser(response?.data?.data));
      navigate(location?.pathname);

    } catch (error) {
      if (error.status == 401) navigate("/login");
      navigate("/login"); //for now i will change it
      console.log("refresh error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="relative">
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Body;
