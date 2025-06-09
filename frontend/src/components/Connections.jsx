import { useState } from "react";
import { IMAGE_URL } from "../constant";
import { useEffect } from "react";
import { Base_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Connections = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${Base_URL}/match/connection`, {
        withCredentials: true,
      });
      setConnections(response?.data?.data);
      setLoading(false);
   
    } catch (error) {
      console.log(error, error?.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-56">
        <button className="btn btn-square btn-lg loading"></button>
      </div>
    );
  }

  if (connections?.length === 0) {
    return (
      <div className="text-center font-bold text-primary text-3xl mt-44">
        No connections
      </div>
    );
  }

  const filteredConnections = connections.filter(
    (connection) =>
      connection?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      connection?.bio?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 mt-20">
      <div className="max-w-4xl mx-auto pt-9">
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
              key={connection._id}
              className="flex items-center cursor-pointer bg-base-200 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img
                src={connection.profileImage || IMAGE_URL}
                alt={connection?.username}
                className="w-16 h-16 rounded-full"
                onClick={() => navigate(`/profile/${connection._id}`)}
              />

              <div
                className="flex-1 ml-4"
                onClick={() => navigate(`/profile/${connection._id}`)}
              >
                <h2 className="font-semibold text-lg text-primary">
                  {connection.username}
                </h2>
                <p className="text-sm text-gray-400">{connection?.bio}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {connection.connectedTime}
                </p>
              </div>

              <Link to={"/chat/" + connection?._id}>
                <button className="btn btn-outline btn-primary text-sm">
                  Message
                </button>
              </Link>
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
