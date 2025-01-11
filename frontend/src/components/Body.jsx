import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useEffect } from "react";
import { Base_URL } from "../constant";

const Body = () => {
  const fetchUser = async () => {
    const response = await axios.post(Base_URL+);
  };

  useEffect(
    {
      fetchUser,
    },
    []
  );

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
