import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import codeIcon from "../assets/code_image.jpeg";

const PostFeedCard = ({ post, onDelete, isDeletable = false }) => {
  const navigate = useNavigate();

  const handleDelete = (postId) => {
    if (onDelete) onDelete(postId);
  };

  return (
    <div className="card bg-base-100  mx-auto  w-full max-w-2xl rounded-lg overflow-hidden">
      <div className="flex  flex-col-reverse lg:flex-row h-full">
        <div className="card-body flex flex-col justify-between p-6">
          <div className="text-sm text-gray-600  flex gap-4">
            <div>
              <img
                src={post.author.profileImage || userIcon}
                alt="Not found"
                className="h-7 w-7 rounded-full"
              />
            </div>
            <div>
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
          </div>
          <div>
            <h2 className="card-title text-2xl font-bold mb-2">
              {post?.title}
            </h2>

            <p className="text-gray-400 line-clamp-2">
              {post?.content || "No content available"}
            </p>
          </div>

          <div className="card-actions justify-end space-x-2 mt-4">
            <button
              onClick={() => navigate("/post/content/" + post?._id)}
              className="btn btn-primary btn-outline btn-sm"
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
        <div className="w-full lg:w-1/3 h-72 lg:h-44 lg:my-14 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={post?.postImage || codeIcon}
            alt="Post"
            className="w-full h-full object-cover lg:mt-5 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PostFeedCard;
