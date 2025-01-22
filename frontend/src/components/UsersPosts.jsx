import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../constant";

const PostCard = () => {
  const navigate = useNavigate();

  const post = {
    title: "Exploring the Beauty of Nature",
    content: "Nature has always been a source of peace and tranquility. The vast landscapes, majestic mountains, and serene lakes create an environment that fosters relaxation and inspiration. Join me as I explore the hidden gems of the natural world.",
    username: "JaneDoe",
    createdAt: "2025-01-01T10:00:00Z",
    image: "https://source.unsplash.com/random/400x400/?nature", // Replace or use default IMAGE_URL
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl w-full sm:w-3/4 lg:w-2/3 mx-auto my-4 mt-24">
      {/* Image Section */}
      <figure className="w-full lg:w-2/3">
        <img
          src={ IMAGE_URL}
          alt="Post Image"
          className="w-full h-auto object-cover"
        />
      </figure>

      {/* Content Section */}
      <div className="card-body flex flex-col justify-between">
        {/* Post Details */}
        <div>
          <h2 className="card-title text-xl font-bold">{post.title}</h2>
          <p className="text-sm text-base-content">
            Posted by{" "}
            <span className="text-primary font-medium">{post.username}</span>
          </p>
          <p className="text-sm text-base-content">
            {new Date(post.createdAt).toDateString()}
          </p>
          <p className="mt-2 text-gray-600 line-clamp-3">{post.content}</p>
        </div>

        {/* Action Buttons */}
        <div className="card-actions justify-end mt-4">
          <button
            onClick={() => navigate("/post/content")}
            className="btn btn-secondary btn-sm"
          >
            Read More
          </button>
          <button className="btn btn-primary btn-sm">Like</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
