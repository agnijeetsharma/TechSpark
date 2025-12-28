import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance"
import { removeUser } from "../utils/userSlice";
import { useLogin } from "../utils/LoginContext";
import userIcon from "../assets/user.png";
import { SunDim } from "lucide-react";
import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const NavBar = () => {
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useLogin();


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
      await api.post("/logout");
      dispatch(removeUser());
      logout();
      localStorage.removeItem("token"); 
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div >
      <div className="navbar h-5  bg-base-200  top-0">
        <div className="flex-1 z-50 cursor-pointer">
          <Link
            to={user ? "/posts" : "/login"}
            className=" ml-4 text-xl font-semibold lg:font-extrabold hover:text-primary cursor-pointer"
          >
            TechSpark
          </Link>
        </div>
        <div className="flex-none gap-4">
          {user && (
            <div className="px-20 hidden lg:block md:block">
              <button
                onClick={() => navigate("/createPost")}
                className="fixed bottom-3  flex items-center gap-2 px-4 py-2 rounded-full text-gray-500 hover:text-primary z-50 transition-all duration-300 group"
                title="Write a post"
              >
                <FiEdit className="text-xl group-hover:scale-110 transition-transform" />
                <span className="font-medium">Write</span>
              </button>
            </div>
          )}
          <div
            className="flex bg-base-200 items-center mr-4 gap-2 transition-transform duration-200 hover:scale-95 hover:text-primary cursor-pointer "
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
                  <Link to={"/"}>Explore</Link>
                </li>
                <li>
                  <Link to={"/connections"}>My Connections</Link>
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
                  <Link to={"/myPost"}>My Creation</Link>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
