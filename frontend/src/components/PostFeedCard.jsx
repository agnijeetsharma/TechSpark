import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../constant";

const PostFeedCard = ({post}) => {
  const navigate=useNavigate()
  console.log(post)
  return (
    <div className="card lg:card-side bg-base-300 shadow-xl w-full sm:w-3/4 lg:w-2/3 mx-auto my-5 justify-end">
     
      <figure className="w-full lg:w-2/3">
        <img
          src={ post?.postImage||IMAGE_URL}
          alt="Post Image"
          className="w-full max-h-[250px] object-cover rounded-lg"
        />
      </figure>

      
      <div className="card-body flex flex-col justify-between">
       
        <div>
          <h2 className="card-title text-xl font-bold">{post?.title}</h2>
          <p className="text-sm text-base-content">
            Posted by{" "}
            <span className="text-primary font-medium">{post?.username}</span>
          </p>
          <p className="text-sm text-base-content overflow-hidden">
            {new Date(post?.createdAt).toDateString()}
          </p>
          <p className="mt-2 text-gray-600 line-clamp-3">{post?.content}</p>
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

export default PostFeedCard;
