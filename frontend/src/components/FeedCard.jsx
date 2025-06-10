import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Base_URL, IMAGE_URL } from "../constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import userImage from "../assets/user.png";

const FeedCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, bio, profileImage, _id } = user;

  const handleViewProfile = () => {
    navigate(`/profile/${_id}`);
  };

  const handleRequest = async (status) => {
    try {
      await axios.post(
        `${Base_URL}/match/connection-request/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card w-full max-w-sm bg-base-300 shadow-md hover:shadow-xl transition duration-300 rounded-xl mx-auto">
      <figure
        onClick={handleViewProfile}
        className="cursor-pointer w-full h-64 overflow-hidden flex items-center justify-center bg-base-200"
      >
        <img
          src={profileImage || userImage}
          alt={`${username}'s profile`}
          className="object-contain w-full h-full"
          title="Click to view full profile"
        />
      </figure>

      <div className="card-body px-4 py-4 text-center">
        <h2 className="text-xl font-semibold text-primary">{username}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{bio || "No bio provided."}</p>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={() => handleRequest("Pending")}
            title="Send request to the user"
          >
            Interested
          </button>
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={() => handleRequest("Rejected")}
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
