import { useEffect, useState } from "react";
import PostFeedCard from "./PostFeedCard";
import api from "../utils/axiosInstance";

const UserPosts = () => {
  const [posts, setPosts] = useState([""]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const post = await api.get("/post/userPost");
    //  console.log(post,"user posts");
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
     await api.delete(`/post/delete/${postId}`);
    
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

  if (posts.length <= 0) return <p className="text-center font-bold text-primary text-3xl mt-56">You have not posted yet.</p>;

  return (
    <div className="mt-16 px-4">
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
