import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

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
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-56 sm:w-64 lg:w-72 mx-auto shadow-xl">
      <figure onClick={handleViewProfile}>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{username}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-between">
          <button
            className="btn btn-primary"
            onClick={() => handleRequest("Rejected", user._id)}
          >
            Interseted
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleRequest("Pending", user._id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
