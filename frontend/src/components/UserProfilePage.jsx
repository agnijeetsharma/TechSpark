import axios from "axios";
import { Base_URL, IMAGE_URL } from "../constant";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfileView = () => {
    const [user,setUser]=useState("")
    const id=useParams().id
    console.log(id)

      const getProfile=async()=>{
        try {
            const response=await axios.get(Base_URL+"/profile/"+id,{withCredentials:true})
            console.log(response)
            setUser(response?.data?.data)
        } catch (error) {
            console.log(error)
        }
      }
      useEffect(()=>{
         getProfile()
      },[id])
    if (!user) return <div>No user selected</div>;
  return (
    <div className="bg-base-200 text-base-content min-h-screen  flex items-center justify-center mt-20">
      <div className="w-full max-w-4xl bg-base-100 text-base-content shadow-lg rounded-lg p-6">
       
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="avatar">
            <div className="w-28 rounded-full ">
              <img
                src={user?.profileImage || IMAGE_URL}
                alt={`${user?.username}'s avatar`}
              />
            </div>
          </div>
          <h1 className="text-2xl text-base-content font-bold mt-4">{user?.username || "Anonymous"}</h1>
          {user?.title && <p className="text-sm text-gray-500">{user?.title}</p>}
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
          <div>
            <h2 className="text-lg font-semibold">Bio</h2>
            <p className="text-sm text-gray-600 mt-2">
              {user?.bio || "This user hasn't shared a bio yet."}
            </p>
          </div>

          
          <div>
            <h2 className="text-lg font-semibold">Skills</h2>
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              {user?.skills && user?.skills?.length > 0 ? (
                user?.skills.map((skill, index) => <li key={index}>{skill}</li>)
              ) : (
                <p>This user hasn't added any skills yet.</p>
              )}
            </ul>
          </div>
        </div>

       
        <div className="mt-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
