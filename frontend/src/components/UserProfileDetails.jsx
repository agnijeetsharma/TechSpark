import axios from "axios";
import { Base_URL } from "../constant";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const UserProfileDetails = ({ user: passedUser }) => {
  const { id } = useParams();
  const [user, setUser] = useState(passedUser || null);

  useEffect(() => {
    if (passedUser) {
      setUser(passedUser);
    }
  }, [passedUser]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${Base_URL}/profile/${id}`, {
          withCredentials: true,
        });
        setUser(response?.data?.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (!passedUser && id) fetchUser();
  }, [id, passedUser]);

  if (!user) {
    return (
      <div className="bg-base-200 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 w-full flex items-center justify-center pt-24 rounded-xl">
      <div className="w-full max-w-4xl bg-base-300 shadow-lg rounded-lg p-8">
    
        <div className="flex flex-col items-center">
         
          <h1 className="text-3xl font-bold mt-4">
            {user?.username || "Anonymous"}
          </h1>
          <div className="flex gap-2 text-lg text-gray-700 mt-2">
            <span>{user?.firstName}</span>
            <span>{user?.lastName}</span>
          </div>
          {user?.title && (
            <p className="text-sm text-gray-500 mt-1">{user?.title}</p>
          )}
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <h2 className="text-lg font-semibold">Bio</h2>
            <p className="text-sm text-gray-600 mt-2">
              {user?.bio || "This user hasn't shared a bio yet."}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Skills</h2>
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              {user?.skills?.length > 0 ? (
                user.skills.map((skill, index) => <li key={index}>{skill}</li>)
              ) : (
                <p>This user hasn't added any skills yet.</p>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">Public Links</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {user?.githubLink && (
              <a
                href={user?.githubLink}
                className="btn btn-sm btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
            {user?.linkedinLink && (
              <a
                href={user?.linkedinLink}
                className="btn btn-sm btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            )}
            {!user?.githubLink && !user?.linkedinLink && (
              <p className="text-sm text-gray-500">No public links available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetails;
