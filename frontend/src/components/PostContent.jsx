
import { useParams } from "react-router-dom"; // To fetch dynamic post data based on ID
import { IMAGE_URL } from "../constant";

const ReadMorePage = () => {
  
  const { postId } = useParams(); 
  const post = {
    title: "Exploring the Beauty of Nature",
    content: "Nature has always been a source of peace and tranquility. The vast landscapes, majestic mountains, and serene lakes create an environment that fosters relaxation and inspiration. Join me as I explore the hidden gems of the natural world. The beauty of nature is not just in the grand landscapes but also in the smallest details, like a blooming flower or the sound of rustling leaves. It reminds us to slow down and appreciate the simple things in life. Nature’s ever-changing beauty is a reminder that life, too, is ever-evolving and full of surprises.",
    username: "JaneDoe",
    createdAt: "2025-01-01T10:00:00Z",
  };

  return (
    <div className="container text-base-content mx-auto mt-28 mb-8 px-4 mt-24">
     
      <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
        <figure>
          <img
            src={IMAGE_URL}
            alt="Post Image"
            className="w-full sm:h-28 lg:h-64 object-cover rounded-lg"
          />
        </figure>
        <div className="card-body p-6">
         
          <h1 className="text-3xl font-bold text-center mb-4">{post.title}</h1>
          
         
          <div className="flex justify-between items-center text-sm text-base-content mb-4">
            <p className="text-base-content font-medium">Posted by {post.username}</p>
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>

        
          <p className="text-lg  leading-relaxed mb-6">{post.content}</p>
          
         
          <div className="flex justify-center gap-4">
            <button className="btn btn-primary">Like</button>
            <button className="btn btn-secondary">Comment</button>
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
