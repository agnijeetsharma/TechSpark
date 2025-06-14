import { useParams } from "react-router-dom";
import { Base_URL, IMAGE_URL } from "../constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import contentImage from "../assets/code_image.jpeg";

const ReadMorePage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getContent = async () => {
    try {
      const response = await axios.get(`${Base_URL}/post/content/${postId}`, {
        withCredentials: true,
      });
      setPost(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialLikes = async () => {
    try {
      const response = await axios.get(`${Base_URL}/post/like/details/${postId}`, {
        withCredentials: true,
      });
      const { isLiked, likesCount } = response?.data?.data;
      setIsLike(isLiked);
      setLikeCount(likesCount);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLike = async () => {
    try {
      const response = await axios.put(`${Base_URL}/post/like/${postId}`, {}, {
        withCredentials: true,
      });
      setIsLike(response?.data?.data?.isLiked);
      setLikeCount(response?.data?.data?.likesCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContent();
    fetchInitialLikes();
  }, [postId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center mt-52 font-bold text-xl">
        No content for this post! Try again later.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mt-5 font-serif text-base leading-7 ">
      <img
        src={post?.postImage || contentImage}
        alt="Post"
        className="w-full h-80 object-cover rounded-lg mb-8"
      />

      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-8">
        <p>
          Posted by <span className="font-semibold text-primary">{post.author?.username}</span>
        </p>
        <p>{new Date(post.createdAt).toDateString()}</p>
      </div>

      <div className="prose prose-lg max-w-none mb-10 text-gray-500">
        <p>{post.content}</p>
      </div>

      <div className="flex justify-start items-center gap-4 mt-8">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border transition duration-200 
          ${isLike ? "bg-primary text-white border-primary" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"}`}
        >
          <FiThumbsUp className="text-lg" />
          {isLike ? "Liked" : "Like"}
          <span className="ml-1 font-bold">({likeCount})</span>
        </button>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => window.history.back()}
          className="text-primary hover:underline font-medium text-sm mb-5"
        >
          ← Back to Feed
        </button>
      </div>
    </div>
  );
};

export default ReadMorePage;
