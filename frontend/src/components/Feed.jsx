import axios from "axios";
import { Base_URL } from "../constant";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import UserProfileDetails from "./UserProfileDetails";


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // track current user

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
      <div className="flex justify-center items-center h-screen">
        <button className="btn btn-square btn-lg loading"></button>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <h1 className="flex justify-center mt-56 font-bold text-2xl text-base-content">
        No New Users found!
      </h1>
    );
  }

  const handleNext = () => {
    if (currentIndex < feed.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const currentUser = feed[currentIndex];

  return (
    <div className="my-16 px-4 mt-36">
      
      <div className="flex flex-col lg:flex-row justify-center gap-6">
        
        <div className="hidden lg:block w-full lg:w-1/2 -mt-24">
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
