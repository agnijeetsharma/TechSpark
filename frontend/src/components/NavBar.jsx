import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Base_URL } from "../constant";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { useLogin } from "../utils/LoginContext";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { setLoginVisible } = useLogin();

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
      <div className="navbar bg-base-300 fixed top-0 z-50">
        <div className="flex-1">
          <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl">
            TechSpark
          </Link>
        </div>
        <div className="flex-none gap-2">
          {user && (
            <div className="form-control">
              <p>Welcome,{user?.user?.username}</p>
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
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
          {!user && (
            <div className="flex">
              <div>
                <ul className="menu menu-horizontal px-4 pt-3 gap-4">
                  <Link to={"/login"}>
                    <li>Explore</li>
                  </Link>
                  <Link to={"/about"}>
                    <li>About Us</li>
                  </Link>
                </ul>
              </div>
              <button
                className="btn btn-outline mr-4"
                onClick={() => setLoginVisible(true)}
              >
                LogIn
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
