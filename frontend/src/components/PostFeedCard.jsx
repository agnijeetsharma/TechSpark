import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../constant";

const PostFeedCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl w-full sm:w-3/4 lg:w-2/3 mx-auto my-10">
   
      <figure className="w-full lg:w-1/3">
        <img
          src={post?.postImage || IMAGE_URL}
          alt="Post Image"
          className="w-full h-full max-h-[200px] object-cover rounded-l-lg lg:rounded-lg"
        />
      </figure>

      
      <div className="card-body flex flex-col justify-between p-4 lg:p-6">
       
        <div>
          <h2 className="card-title text-xl font-bold mb-1">{post?.title}</h2>
          <p className="text-sm text-base-content mb-1">
            Posted by{" "}
            <span className="text-primary font-medium">{post?.username}</span>
          </p>
          <p className="text-sm text-gray-500 mb-3">
            {new Date(post?.createdAt).toDateString()}
          </p>
          <p className="mt-2 text-gray-600 line-clamp-3">
            {post?.content || "No content available"}
          </p>
        </div>

      
        <div className="card-actions justify-end mt-4">
          <button
            onClick={() => navigate("/post/content/"+post?._id)}
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

export default PostFeedCard;
