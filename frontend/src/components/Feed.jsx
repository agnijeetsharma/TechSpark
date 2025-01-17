import axios from "axios";
import { Base_URL } from "../constant";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import FeedCard from "./FeedCard";
import { useNavigate } from "react-router-dom";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const navigate=useNavigate()
  // console.log(feed)
  const dispatch = useDispatch();
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(Base_URL + "/feed", {
        withCredentials: true,
      });
      console.log(response);
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.log(error?.reponse?.message, error); //i will make a seprate page for handle this
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  const handleViewProfile = () => {
    navigate(`/profile/${feed[0]._id}`);
  };
  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center ">No new users founds!</h1>;
  return (
    feed && (
      <div className="flex justify-center my-28 relative" onClick={handleViewProfile}>
      
        <FeedCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
