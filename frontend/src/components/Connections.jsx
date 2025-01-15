import { useState } from "react";
import { IMAGE_URL } from "../constant";
import { useEffect } from "react";
import { Base_URL } from "../constant";
import axios from "axios";

const Connections = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [connections, setConnections] = useState([])
  
  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${Base_URL}/match/connection`, {
        withCredentials: true,
      });
      setConnections(response?.data?.data);

      console.log(response?.data?.data);
    } catch (error) {
      console.log(error, error?.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections?.length === 0) {
    return (
      <div className="text-center font-bold text-primary text-3xl mt-44">
        No connections
      </div>
    );
  }

  const filteredConnections = connections.filter(
    (connection) =>
      connection.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-neutral min-h-screen p-4 mt-20">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-6 flex flex-center text-center">
          <input
            type="text"
            placeholder="Search connections...by username or bio"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full max-w-md "
          />
        </div>

        
        <div className="space-y-4">
          {filteredConnections.map((connection) => (
            <div
              key={connection.id}
              className="flex items-center bg-base-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
            
              <img
                src={connection.profileImage||IMAGE_URL}
                alt={connection?.username}
                className="w-16 h-16 rounded-full"
              />

            
              <div className="flex-1 ml-4">
                <h2 className="font-semibold text-lg text-primary">
                  {connection.username}
                </h2>
                <p className="text-sm text-gray-400">{connection?.bio}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {connection.connectedTime}
                </p>
              </div>

             
              <button className="btn btn-outline btn-primary text-sm">
                Message
              </button>
            </div>
          ))}

          {filteredConnections.length === 0 && (
            <p className="text-gray-400 text-center">No connections found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connections;
