import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Base_URL, IMAGE_URL } from "../constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import userImage from "../assets/user.png";

const FeedCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = user;

  const handleViewProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  const handleRequest = async (status, userId) => {
    try {
      const response = await axios.post(
        Base_URL + "/match/connection-request/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-full sm:w-64 lg:w-72 mx-auto shadow-xl">
      <figure onClick={handleViewProfile} className="cursor-pointer">
        <img
          src={user?.profileImage || userImage}
          alt="Profile"
          className="w-full h-60 object-cover"
          title="Click to view full profile"
        />
      </figure>
      <div className="card-body py-1 pb-10">
        <h2 className="card-title text-center text-lg font-semibold">
          {username}
        </h2>
        <p className="text-sm text-gray-600 text-center line-clamp-2">
          {user?.bio}
        </p>
        <div className="card-actions flex flex-col sm:flex-row justify-center gap-2 mt-4">
          <button
            className="btn btn-secondary w-full sm:w-auto"
            onClick={() => handleRequest("Pending", user?._id)}
            title="Send request to the user"
          >
            Interested
          </button>
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => handleRequest("Rejected", user?._id)}
           
            title="You won't see this user after ignoring"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
