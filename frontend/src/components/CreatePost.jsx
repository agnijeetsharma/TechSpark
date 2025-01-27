import { useState } from "react";
import axios from "axios";
import { Base_URL } from "../constant";

const CreatePost = () => {
  const[showToast,setShowToast]=useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    postImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "postImage") {
      setFormData({ ...formData, postImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    if (formData.postImage) {
      postData.append("postImage", formData.postImage);
    }
  
    try {
      await axios.post(Base_URL+"/post/create", postData,{withCredentials:true});
        
     
      setFormData({ title: "", content: "", postImage: null });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="card w-full sm:w-3/4 lg:w-2/3 mx-auto shadow-xl bg-base-300 p-6 mt-24">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter post title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Content Input */}
        <div>
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            name="content"
            placeholder="Write something about your post..."
            value={formData.content}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-32"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">
            <span className="label-text">Upload an Image</span>
          </label>
          <input
            type="file"
            name="postImage"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Create Post
          </button>
        </div>
      </form>
      {showToast && (
        <div className="toast toast-top toast-center mt-24">
          <div className="alert alert-success">
            <span>
             Posted successfully🔥
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
