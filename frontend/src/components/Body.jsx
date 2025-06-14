import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Base_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const selector = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUser = async () => {
    if (selector) return;
    try {
      const response = await axios.get(Base_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response?.data?.data));
      navigate(location?.pathname);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <NavBar />
      </div>

      <div className="pt-16 flex-grow">
        <Outlet />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Body;
