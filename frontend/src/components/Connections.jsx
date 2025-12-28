import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../utils/axiosInstance";
import userImage from "../assets/user.png";

const Connections = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const response = await api.get("/match/connection");
      setConnections(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log(error, error?.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn btn-square text-primary btn-sm loading"></button>
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
      connection?.username
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      connection?.bio?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 mt-16">
      <div className="max-w-4xl mx-auto pt-9">
        <div className="mb-6 flex flex-center text-center">
          <input
            type="text"
            placeholder="Search connections...by username or bio"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full max-w-md rounded-full "
          />
        </div>

        <div className="space-y-4">
          {filteredConnections.map((connection) => (
            <div
              key={connection._id}
              className="flex items-center cursor-pointer bg-base-200 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img
                src={connection.profileImage || userImage}
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
                <p className="text-sm text-gray-400">
                  {connection.bio || "No bio for this User"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(connection?.createdAt).toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>

              <Link to={"/chat/" + connection?._id}>
                <button className="btn btn-outline btn-primary text-sm">
                  Chat Now
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
