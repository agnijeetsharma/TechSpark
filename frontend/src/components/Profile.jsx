import axios from "axios";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Base_URL } from "../constant";
import { addUser } from "../utils/userSlice";
import userImage from "../assets/user.png";
const Profile = () => {
  let currUser = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [imageToast, setImageToast] = useState(false);
  const fileInputRef = useRef();

  let [newUser, setUser] = useState({
    username: currUser?.username,
    firstName: currUser?.firstName,
    lastName: currUser?.lastName,
    email: currUser?.email,
    bio: currUser?.bio,
    gender: currUser?.gender,
    age: currUser?.age,
    skills: currUser?.skills || [],
    linkedinLink: currUser?.linkedinLink,
    githubLink: currUser?.githubLink,
  });
  const Updateduser = async () => {
    try {
      const updateUser = await axios.patch(
        Base_URL + "/updateProfile",
        { newUser },

        { withCredentials: true }
      );
      console.log(updateUser?.data);

      dispatch(addUser(updateUser?.data?.data));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        newUser = currUser;
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...newUser, [name]: value });
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setUser({ ...newUser, skills: [...newUser.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = newUser?.skills?.filter((_, i) => i !== index);
    setUser({ ...newUser, skills: updatedSkills });
  };

  const saveProfile = () => {
    setEditMode(false);
    Updateduser();
    setUser(currUser)
  };
  // const handleFileChange = (e) => {
  //   setProfileImage(e.target.files[0]);
  // };
  const handleProfileImage = async (e) => {
    // fileInputRef.current.click();
    // setProfileImage(e.target.files[0]);
    const profileImage = e.target.files[0];
    e.preventDefault();

    if (!profileImage) {
      console.log("No profile image selected");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", profileImage);

    try {
      const response = await axios.post(
        `${Base_URL}/update-profileImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      
      dispatch(addUser(response?.data?.data));
      setImageToast(true);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setImageToast(false);
       
      }, 3000);
    } catch (error) {
      console.error(
        "Error uploading profile image:",
        error.response?.data || error.message
      );
    }
  };

  if (!newUser) return;
  return (
    <div className="min-h-screen mt-16 text-base-content  ">
      <div className="max-w-5xl mx-auto p-10 bg-base-100 text-base-content rounded-lg ">
        <h1 className="text-3xl font-bold mb-8 text-primary-300">My Profile</h1>
        <div className="flex gap-6 ">
        
          <div className="w-1/3">
            <div className="avatar mb-6 gap-5 flex justify-center  ">
              <div
                className="w-28 rounded-full border-gray-600 border-2 cursor-pointer  "
                onClick={() => fileInputRef.current.click()}
                title="Click to change image"
              >
                <img src={currUser?.profileImage || userImage} alt="Profile" />
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProfileImage}
                  className="hidden"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">UserName</label>
              <input
                type="text"
                name="username"
                value={!editMode ? currUser?.username : newUser?.username}
                onChange={handleChange}
                disabled={!editMode}
                className={`input input-bordered w-full ${
                  editMode ? "bg-base-100" : "bg-base-300"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={!editMode ? currUser?.firstName : newUser?.firstName}
                onChange={handleChange}
                disabled={!editMode}
                className={`input input-bordered w-full ${
                  editMode ? "bg-base-100" : "bg-base-300"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={!editMode ? currUser?.lastName : newUser?.lastName}
                onChange={handleChange}
                disabled={!editMode}
                className={`input input-bordered w-full ${
                  editMode ? "bg-base-100" : "bg-base-300"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={!editMode ? currUser?.email : newUser?.email}
                onChange={handleChange}
                disabled={!editMode}
                className={`input input-bordered w-full ${
                  editMode ? "bg-base-100" : "bg-base-300"
                }`}
              />
            </div>
          </div>

          <div className="w-2/3 ">
            <div className="grid grid-cols-2 gap-4  flex-col">
              <div>
                <label className="block font-semibold">Gender</label>
                {editMode ? (
                  <select
                    name="gender"
                    value={!editMode ? currUser?.gender : newUser?.gender}
                    onChange={handleChange}
                    className="select select-bordered w-full bg-base-100"
                  > <option value="">Not Disclose</option>
                    <option value="Male">male</option>
                    <option value="Female">female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="bg-base-300 p-2 rounded">
                    {!editMode ? currUser?.gender : newUser?.gender}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold">Age</label>
                {editMode ? (
                  <select
                    name="age"
                    value={newUser.age}
                    onChange={handleChange}
                    className="select select-bordered w-full bg-base-100"
                  >
                    {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="bg-base-300 p-2 rounded">
                    {!editMode ? currUser?.age : newUser?.age}
                  </p>
                )}
              </div>

              
              <div className="col-span-2 flex justify-between gap-4">
                <div className="w-1/2">
                  <label className="block font-semibold">GitHub</label>
                  {editMode ? (
                    <input
                      type="url"
                      name="githubLink"
                      value={
                        !editMode ? currUser?.githubLink : newUser?.githubLink
                      }
                      onChange={handleChange}
                      className="input input-bordered w-full bg-base-100"
                      placeholder="GitHub Profile Link"
                    />
                  ) : (
                    <a
                      href={
                        !editMode ? currUser?.githubLink : newUser?.githubLink
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-base-300 p-2 rounded text-primary"
                    >
                      {!editMode ? currUser?.githubLink : newUser?.githubLink}
                    </a>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block font-semibold">LinkedIn</label>
                  {editMode ? (
                    <input
                      type="url"
                      name="linkedinLink"
                      value={
                        !editMode
                          ? currUser?.linkedinLink
                          : newUser?.linkedinLink
                      }
                      onChange={handleChange}
                      className="input input-bordered w-full bg-base-100"
                      placeholder="LinkedIn Profile Link"
                    />
                  ) : (
                    <a
                      href={
                        !editMode
                          ? currUser?.linkedinLink
                          : newUser?.linkedinLink
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-base-300 p-2 rounded text-primary"
                    >
                      {!editMode
                        ? currUser?.linkedinLink
                        : newUser?.linkedinLink}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold">Bio</h3>
              {editMode ? (
                <textarea
                  name="bio"
                  value= {!editMode ? currUser?.bio : newUser?.bio}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full bg-base-100"
                  rows="4"
                />
              ) : (
                <p className="bg-base-300 p-4 rounded">
                  {!editMode ? currUser?.bio : newUser?.bio}
                </p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold">Skills</h3>
              <div className="bg-base-300 p-4 rounded">
                {(!editMode ? currUser : newUser)?.skills?.map(
                  (skill, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
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
                  )
                )}
                {editMode && (
                  <div className="flex mt-4">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="input input-bordered w-full bg-base-100"
                      placeholder="Add a new skill"
                    />
                    <button className="btn btn-primary ml-2" onClick={addSkill}>
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-4  justify-end">
              {editMode ? (
                <>
                  <button className="btn btn-success btn-outline" onClick={saveProfile}>
                    Save
                  </button>
                  <button
                    className="btn btn-error btn-outline"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary w-34 btn-outline"
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
            <span>
              {imageToast ? "ProfileImage" : "Profile "}Updated successfully🔥
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
