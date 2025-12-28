import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import userImage from "../assets/user.png";
import api from "../utils/axiosInstance";

const Profile = () => {
  const currUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [imageToast, setImageToast] = useState(false);
  const fileInputRef = useRef(null);

  const [newUser, setUser] = useState(null);

  useEffect(() => {
    if (currUser) {
      setUser({
        username: currUser.username || "",
        firstName: currUser.firstName || "",
        lastName: currUser.lastName || "",
        email: currUser.email || "",
        bio: currUser.bio || "",
        gender: currUser.gender || "",
        age: currUser.age || "",
        skills: currUser.skills || [],
        linkedinLink: currUser.linkedinLink || "",
        githubLink: currUser.githubLink || "",
      });
    }
  }, [currUser]);

  if (!newUser) return null;

  const updateUserProfile = async () => {
    try {
      const res = await api.patch("/updateProfile", newUser);
      dispatch(addUser(res.data.data));
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const saveProfile = () => {
    setEditMode(false);
    updateUserProfile();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setUser((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }));
    setNewSkill("");
  };

  const removeSkill = (index) => {
    setUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleProfileImage = async (e) => {
    const profileImage = e.target.files[0];
    if (!profileImage) return;

    const formData = new FormData();
    formData.append("profileImage", profileImage);

    try {
      const res = await api.patch("/update-profileImage", formData);
      dispatch(addUser(res.data.data));

      setImageToast(true);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        setImageToast(false);
      }, 3000);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="min-h-screen mt-16 text-base-content">
      <div className="max-w-5xl mx-auto p-10 bg-base-100 rounded-lg">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="flex gap-6">
          <div className="w-1/3">
            <div className="avatar mb-6 flex justify-center">
              <div
                className="w-28 rounded-full border-2 cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <img src={currUser.profileImage || userImage} alt="Profile" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfileImage}
                className="hidden"
                accept="image/*"
              />
            </div>

            {["username", "firstName", "lastName", "email"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block font-semibold capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={editMode ? newUser[field] : currUser[field]}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="input input-bordered w-full"
                />
              </div>
            ))}
          </div>
          <div className="w-2/3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">Gender</label>
                {editMode ? (
                  <select
                    name="gender"
                    value={newUser.gender}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Not Disclose</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="bg-base-300 p-2 rounded">{currUser.gender}</p>
                )}
              </div>

              <div>
                <label className="font-semibold">Age</label>
                {editMode ? (
                  <select
                    name="age"
                    value={newUser.age}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                      <option key={age}>{age}</option>
                    ))}
                  </select>
                ) : (
                  <p className="bg-base-300 p-2 rounded">{currUser.age}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label className="font-semibold">Bio</label>
              {editMode ? (
                <textarea
                  name="bio"
                  value={newUser.bio}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                />
              ) : (
                <p className="bg-base-300 p-4 rounded">{currUser.bio}</p>
              )}
            </div>
            <div className="mt-6">
              <label className="font-semibold">Skills</label>
              <div className="bg-base-300 p-4 rounded">
                {newUser.skills.map((skill, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>{skill}</span>
                    {editMode && (
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => removeSkill(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {editMode && (
                  <div className="flex mt-4">
                    <input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Add skill"
                    />
                    <button className="btn btn-primary ml-2" onClick={addSkill}>
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              {editMode ? (
                <>
                  <button className="btn btn-success" onClick={saveProfile}>
                    Save
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center mt-24">
          <div className="alert alert-success">
            {imageToast ? "Profile image" : "Profile"} updated successfully 🔥
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
