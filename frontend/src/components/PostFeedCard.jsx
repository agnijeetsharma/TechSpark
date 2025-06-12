import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../constant";

const PostFeedCard = ({ post, onDelete, isDeletable = false }) => {
  const navigate = useNavigate();

  const handleDelete = (postId) => {
    if (onDelete) onDelete(postId);
  };

  return (
    <div className="card bg-base-100  mx-auto my-8 w-full max-w-2xl rounded-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Fixed-size image */}
        <div className="w-full lg:w-1/3 h-36 lg:h-auto flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={post?.postImage || IMAGE_URL}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card content */}
        <div className="card-body flex flex-col justify-between p-6">
          <div>
            <h2 className="card-title text-2xl font-bold mb-2">
              {post?.title}
            </h2>

            <div className="text-sm text-gray-600 mb-4">
              <span>
                Posted by{" "}
                <span className="text-primary font-medium">
                  {post?.author?.username}
                </span>
              </span>
              <span className="block">
                {new Date(post?.createdAt).toDateString()}
              </span>
            </div>

            <p className="text-gray-700 line-clamp-2">
              {post?.content || "No content available"}
            </p>
          </div>

          <div className="card-actions justify-end space-x-2 mt-4">
            <button
              onClick={() => navigate("/post/content/" + post?._id)}
              className="btn btn-secondary btn-sm"
            >
              Read More
            </button>
            {isDeletable && (
              <button
                onClick={() => handleDelete(post?._id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFeedCard;
