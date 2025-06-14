import { useState, useEffect } from "react";
import axios from "axios";
import { Base_URL } from "../constant";
import userIcon from "../assets/user.png";
import { useNavigate } from "react-router-dom";

const FeaturePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fecthPost = async () => {
    try {
      const response = await axios.get(`${Base_URL}/post/feature`, {
        withCredentials: true,
      });
  
      setPosts(response?.data?.data);
    } catch (error) {
      console.error("Failed to fetch featured posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthPost();
  }, []);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn btn-square btn-sm text-primary loading"></button>
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <p className="text-center font-bold text-primary text-3xl mt-44">
        No featured posts available.
      </p>
    );
  }

  return (
    <div className="max-w-4xl  p-4 sticky top-0  rounded-lg">
      <h2 className="text-xl  font-bold mb-6">Featured Posts</h2>
      {posts.map((post) => (
        <div key={post._id}   onClick={() => navigate(`/post/content/`+post._id)} className="cursor-pointer">
        <div className="flex items-center mb-2">
          <img
            src={
              post.author.profileImage||userIcon

            }
            alt={post.title}
            className="rounded-full object-cover  h-7 w-7"
          />
        <span className="ml-2 text-sm font-normal">{post.author.username}</span>
        </div>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p className="mt-2 line-clamp-1">{post.content}</p>
          <p className="mt-2 text-sm mb-3 text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeaturePost;
