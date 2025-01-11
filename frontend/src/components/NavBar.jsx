import { useDispatch, useSelector } from "react-redux";
import { Link,  useNavigate } from "react-router-dom";
import { Base_URL } from "../constant";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        Base_URL + "/logout",
        {},
        { withCredentials: true }
      );
      console.log(response);
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            TechSpark
          </Link>
        </div>
        <div className="flex-none gap-2">
          {user && (
            <div className="form-control">
              <h>Welcome,{user?.user?.username}</h>
              {/* <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            /> */}
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
        </div>
      </div>
    </div>
  );
};
export default NavBar;
