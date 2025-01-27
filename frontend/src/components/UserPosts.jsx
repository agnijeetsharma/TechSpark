import { useEffect, useState } from "react";
import PostFeedCard from "./PostFeedCard";
import { Base_URL } from "../constant";
import axios from "axios";

const UserPosts = () => {
  const [posts, setPosts] = useState([""]);

  const fetchPosts = async () => {
    try {
      const post = await axios.get(`${Base_URL}/post/userPost`, {
        withCredentials: true,
      });
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
      const response = await axios.delete(`${Base_URL}/post/delete/${postId}`, {
        withCredentials: true,
      });
    //   console.log("Post deleted successfully:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (posts.length <= 0) return <p className="text-center font-bold text-primary text-3xl mt-56">You have not posted yet.</p>;

  return (
    <div className="mt-24">
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
