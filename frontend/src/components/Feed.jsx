import axios from "axios";
import { Base_URL } from "../constant";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

 
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    if (feed && feed.length > 0) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(Base_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.log(error?.response?.message, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

 
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-56">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (!feed || feed.length <= 0) {
    return (
      <h1 className="flex justify-center mt-56 font-bold text-2xl text-base-content">
        No New Users found!
      </h1>
    );
  }

  return (
    <div className="flex justify-center my-28 relative">
      <FeedCard user={feed[0]} />
    </div>
  );
};

export default Feed;
