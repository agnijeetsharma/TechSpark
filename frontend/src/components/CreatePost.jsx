import { useState } from "react";
import axios from "axios";
import { Base_URL } from "../constant";
import { FiImage, FiEdit } from "react-icons/fi";

const CreatePost = () => {
  const [showToast, setShowToast] = useState(false);
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
      await axios.post(`${Base_URL}/post/create`, postData, {
        withCredentials: true,
      });

      setFormData({ title: "", content: "", postImage: null });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-20 font-serif">
      <div className="bg-base-100  rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Write a new story
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full text-2xl font-semibold outline-none border-b  focus:border-gray-300 transition-all bg-transparent placeholder-gray-400"
            />
          </div>

          <div>
            <textarea
              name="content"
              placeholder="Write your story..."
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full min-h-[200px] resize-none border border-gray-200 focus:border-black outline-none p-4 rounded-lg placeholder-gray-400 bg-base-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FiImage />
              Upload Image (optional)
            </label>
            <input
              type="file"
              name="postImage"
              accept="image/*"
              onChange={handleChange}
              className="file-input file-input-bordered w-full"
            />
            {formData.postImage && (
              <img
                src={URL.createObjectURL(formData.postImage)}
                alt="Preview"
                className="mt-2 h-48 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-2 btn btn-sm btn-outline btn-primary rounded-full hover:bg-gray-900 transition-all"
            >
              Publish
            </button>
          </div>
        </form>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center mt-24">
          <div className="alert alert-success shadow-lg">
            <span>Post created successfully ✨</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
