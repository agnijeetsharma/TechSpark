
import { useParams } from "react-router-dom"; // To fetch dynamic post data based on ID
import { Base_URL, IMAGE_URL } from "../constant";
import axios from "axios";
import { useEffect, useState } from "react";

const ReadMorePage = () => {
   const [post,setPost]=useState("")
  const { postId } = useParams(); 
  const getContent=async()=>{
    const reponse=await axios.get(Base_URL+"/post/content/"+postId,{withCredentials:true})
    console.log(reponse)
    setPost(reponse?.data)
  }
     useEffect(()=>{
      getContent()
     },[])
     if(post===undefined||post==="")
      return <div className="flex justify-center mt-52 font-bold text-xl">No content for this post! Check Again After Some Time</div>
  return (
    <div className="container text-base-content mx-auto mt-28 mb-8 px-4">
     
      <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
        <figure>
          <img
            src={IMAGE_URL}
            alt="Post Image"
            className="w-full sm:h-28 lg:h-64 object-cover rounded-lg"
          />
        </figure>
        <div className="card-body p-6">
         
          <h1 className="text-3xl font-bold text-center mb-4">{post?.title}</h1>
          
         
          <div className="flex justify-between items-center text-sm text-base-content mb-4">
            <p className="text-base-content font-medium">Posted by {post?.username}</p>
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>

        
          <p className="text-lg  leading-relaxed mb-6">{post?.content}</p>
          
         
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
