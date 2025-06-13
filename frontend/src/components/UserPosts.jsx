import { useEffect, useState } from "react";
import PostFeedCard from "./PostFeedCard";
import { Base_URL } from "../constant";
import axios from "axios";

const UserPosts = () => {
  const [posts, setPosts] = useState([""]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const post = await axios.get(`${Base_URL}/post/userPost`, {
        withCredentials: true,
      });
      setLoading(false);
      setPosts(post?.data?.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, );
  const handleDeletePost = async (postId) => {
   
    try {
     await axios.delete(`${Base_URL}/post/delete/${postId}`, {
        withCredentials: true,
      });
    
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn btn-square btn-lg loading"></button>
      </div>
    );
  }

  if (posts.length <= 0) return <p className="text-center font-bold text-primary text-3xl mt-44">You have not posted yet.</p>;

  return (
    <div className="">
      {posts?.map((post, index) => (
        <PostFeedCard
          key={index}
          post={post}
          onDelete={handleDeletePost}
          isDeletable={true}
        />
      ))}
    </div>
  );
};

export default UserPosts;
