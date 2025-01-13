import  { useState } from "react";
import image from "../assets/image.png"
const Profile = () => {
  const [user, setUser] = useState({
    firstName: "Arthur",
    lastName: "Nancy",
    email: "bradley.ortiz@gmail.com",
    phone: "477-046-1827",
    bio: "Land acquisition specialist with over 10 years of experience in commercial real estate.",
    gender: "Male",
    age: 34,
    skills: ["Negotiation", "Market Analysis", "Project Management"], // Initial skills
  });

  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setUser({ ...user, skills: [...user.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = user.skills.filter((_, i) => i !== index);
    setUser({ ...user, skills: updatedSkills });
  };

  const saveProfile = () => {
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content py-24">
      <div className="max-w-5xl mx-auto p-8 bg-neutral rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-primary">My Profile</h1>
        <div className="flex gap-6">
          {/* Left Column */}
          <div className="w-1/3">
            <div className="avatar mb-6 gap-7">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={image} alt="Profile" />
              </div>
              <div>
              <button className="btn btn-sm btn-primary mt-7">Change</button>

              </div>
            </div>

            <div className="mb-4">
              <label className="block font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
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
                value={user.lastName}
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
                value={user.email}
                onChange={handleChange}
                disabled={!editMode}
                className={`input input-bordered w-full ${
                  editMode ? "bg-base-100" : "bg-base-300"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Phone</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                disabled={!editMode}
                className={`input input-bordered w-full ${
                  editMode ? "bg-base-100" : "bg-base-300"
                }`}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-2/3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Gender</label>
                {editMode ? (
                  <select
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                    className="select select-bordered w-full bg-base-100"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="bg-base-300 p-2 rounded">{user.gender}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold">Age</label>
                {editMode ? (
                  <select
                    name="age"
                    value={user.age}
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
                  <p className="bg-base-300 p-2 rounded">{user.age}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold">Bio</h3>
              {editMode ? (
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full bg-base-100"
                  rows="4"
                />
              ) : (
                <p className="bg-base-300 p-4 rounded">{user.bio}</p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold">Skills</h3>
              <div className="bg-base-300 p-4 rounded">
                {user.skills.map((skill, index) => (
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
                ))}
                {editMode && (
                  <div className="flex mt-4">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="input input-bordered w-full bg-base-100"
                      placeholder="Add a new skill"
                    />
                    <button
                      className="btn btn-primary ml-2"
                      onClick={addSkill}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-4">
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
                  className="btn btn-primary w-full"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
