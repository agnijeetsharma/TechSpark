import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import UserProfileDetails from "./UserProfileDetails";
import api from "../utils/axiosInstance";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchFeed = async () => {
    try {
      const response = await api.get("/feed");
      const users = response?.data?.data || [];
      dispatch(addFeed(users));
    } catch (error) {
      console.error("Feed fetch error:", error);
    } finally {
      setLoading(false);
      setFetched(true); 
    }
  };

  useEffect(() => {
    if (!fetched) {
      fetchFeed();
    }
  }, [fetched]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn btn-square text-primary btn-sm loading"></button>
      </div>
    );
  }


  if (fetched && (!feed || feed.length === 0)) {
    return (
      <h1 className="flex justify-center mt-56 font-bold text-xl text-base-content">
        No New Users found!
      </h1>
    );
  }


  const currentUser = feed[currentIndex];

  return (
    <div className="my-16 px-4">
      <div className="flex flex-col lg:flex-row justify-center gap-6">
        <div className="hidden lg:block w-full lg:w-1/2 mt-18">
          <UserProfileDetails user={currentUser} />
        </div>
        <div className="w-full lg:w-1/2">
          <FeedCard user={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Feed;
