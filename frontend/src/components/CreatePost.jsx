import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    if (formData.image) {
      postData.append("image", formData.image);
    }

    try {
      const response = await axios.post("/api/post/create", {postData},{
        method: "POST",
        body: postData,
      });
        
      console.log("Post created successfully:", response);
      setFormData({ title: "", content: "", image: null });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="card w-full sm:w-3/4 lg:w-2/3 mx-auto shadow-xl bg-base-100 p-6 mt-24">
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
            name="image"
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
    </div>
  );
};

export default CreatePost;
