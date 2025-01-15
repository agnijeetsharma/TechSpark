import { useState,useEffect } from "react";
import axios from 'axios'
import { IMAGE_URL } from "../constant";
import { Base_URL } from "../constant";

const ConnectionsPage = () => {
  const [connections, setConnections] = useState([
  ]);
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
const [searchTerm, setSearchTerm] = useState("");
  if(connections?.length===0){
    return <div className="text-center font-bold text-primary text-3xl mt-44">No connections</div>
  }

  // Filter connections based on search
  const filteredConnections = connections.filter((connection) =>
    connection?.username.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="bg-base-200 min-h-screen p-6 mt-24">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-primary">
          My Connections
        </h1>
      </header>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search connections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered input-primary w-full max-w-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnections?.length > 0 ? (
          filteredConnections.map((connection) => (
            <div
              key={connection.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <figure className="px-10 pt-10">
                <img
                  src={connection.profileImage||IMAGE_URL}
                  alt={connection?.name}
                  className="rounded-full w-24 h-24"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-lg font-semibold text-accent">
                  {connection?.username}
                </h2>
                <p className="text-sm text-seconadry">{connection?.bio}</p>
                <div className="card-actions mt-4">
                  <button className="btn btn-primary btn-sm">
                    View Profile
                  </button>
                  <button className="btn btn-secondary btn-sm">Message</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-100 font-thin">
            No connections found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;
