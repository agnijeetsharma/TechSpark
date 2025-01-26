import { useParams } from "react-router-dom"; // To fetch dynamic post data based on ID
import { Base_URL, IMAGE_URL } from "../constant";
import axios from "axios";
import { useEffect, useState } from "react";

const ReadMorePage = () => {
  const [post, setPost] = useState("");
  const { postId } = useParams();
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState();
  const getContent = async () => {
    const response = await axios.get(Base_URL + "/post/content/" + postId, {
      withCredentials: true,
    });
    setPost(response?.data?.data);
  };
  useEffect(() => {
    getContent();
  }, []);

  const fetchInitialLikes = async () => {
    try {
      const response = await axios.get(
        Base_URL + "/post/like/details/" + postId,
        { withCredentials: true }
      );
      const { isLiked, likesCount } = response?.data?.data;
      setIsLike(isLiked);
      setLikeCount(likesCount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInitialLikes();
  }, [postId]);

  const toggleLike = async () => {
    try {
      const response = await axios.put(
        Base_URL + "/post/like/" + postId,
        {},
        { withCredentials: true }
      );
      setIsLike(response?.data?.data?.isLiked);
      setLikeCount(response?.data?.data?.likesCount);
    } catch (error) {
      console.log(error);
    }
  };

  if (post === undefined || post === "")
    return (
      <div className="flex justify-center mt-52 font-bold text-xl">
        No content for this post! Check Again After Some Time
      </div>
    );
  return (
    <div className="container text-base-content mx-auto mt-28 mb-8 px-4">
      <div className="card bg-base-300 shadow-xl max-w-4xl mx-auto">
        <figure>
          <img
            src={post?.postImage || IMAGE_URL}
            alt="Post Image"
            className="w-full sm:h-28 lg:h-64 object-cover rounded-lg"
          />
        </figure>
        <div className="card-body p-6">
          <h1 className="text-3xl font-bold text-center mb-4">{post?.title}</h1>

          <div className="flex justify-between items-center text-sm text-base-content mb-4">
            <p className="text-base-content font-medium">
              Posted by {post?.author?.username}
            </p>
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>

          <p className="text-lg  leading-relaxed mb-6">{post?.content}</p>

          <div className="flex justify-center gap-4">
            <button
              className={`btn btn-primary flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-200 ${
                isLike
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              onClick={toggleLike}
            >
              <span className="text-white font-medium">
                {isLike ? "Liked" : "Disliked"}
              </span>
              <span className="bg-white text-black font-bold px-2 py-1 rounded-lg">
                {likeCount}
              </span>
            </button>

            {/* <button className="btn btn-secondary">Comment</button> */}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline btn-primary"
        >
          Back to Feed
        </button>
      </div>
    </div>
  );
};

export default ReadMorePage;
