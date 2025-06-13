import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Base_URL } from "../constant";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { useLogin } from "../utils/LoginContext";
import userIcon from "../assets/user.png";
import {  SunDim } from "lucide-react";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { setLoginVisible } = useLogin();
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const handleLogout = async () => {
    try {
      await axios.post(Base_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="navbar h-10 bg-base-300  top-0 z-50">
        <div className="flex-1">
        <Link to={user ? "/" : "/login"} className=" ml-4 text-xl font-semibold lg:font-extrabold hover:text-primary">Add commentMore actions
            TechSpark
          </Link>
        </div>
        <div className="flex-none gap-2">
        <div
            className="flex bg-base-300 items-center gap-2 transition-transform duration-200 hover:scale-75 hover:text-primary cursor-pointer "
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            onClick={toggleTheme}
          >
            <SunDim className="w-7 h-7" />
          </div>

          {user && (
            <div className="form-control">
              <p>Hi,{user?.username}</p>
            </div>
          )}
          {user && (
            <div className="dropdown dropdown-end m-3">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.profileImage || userIcon}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/connections"}>Connections</Link>
                </li>
                <li>
                  <Link to={"/requests"}>Requests</Link>
                </li>
                <li>
                  <Link to={"/posts"}>Posts</Link>
                </li>
                <li>
                  <Link to={"/createPost"}>Create Post</Link>
                </li>
                <li>
                  <Link to={"/myPost"}>My Post</Link>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
          {!user && (
            <div className="flex">
              {!setLoginVisible && (
                <button
                  className="btn btn-outline mr-4"
                  onClick={() => setLoginVisible(true)}
                >
                  LogIn
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
