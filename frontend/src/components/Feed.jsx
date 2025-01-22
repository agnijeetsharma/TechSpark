import axios from "axios";
import { Base_URL } from "../constant";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import FeedCard from "./FeedCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
 
  const dispatch = useDispatch();
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(Base_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.log(error?.reponse?.message, error); //i will make a seprate page for handle this
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  
  
  if (feed?.length <= 0||feed===null){
    return <h1 className="flex justify-center text-base-content">No new users founds!</h1>;
  }
  if (!feed) return;
  return (
    feed && (
      <div className="flex justify-center my-28 relative" >
      
        <FeedCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
