import  { useState } from "react";

const Requests = () => {
  // Sample pending requests data
  const [requests, setRequests] = useState([
    { id: 1, name: "John Doe", mutualConnections: 5 },
    { id: 2, name: "Jane Smith", mutualConnections: 2 },
    { id: 3, name: "Alex Johnson", mutualConnections: 3 },
  ]);

  // Handle accept and reject
  const handleAccept = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    alert(`Accepted request from ID: ${id}`);
  };

  const handleReject = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    alert(`Rejected request from ID: ${id}`);
  };

  return (
    <div className="p-4 bg-base-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-base-content mb-4">
        Pending Connection Requests
      </h1>
      <div className="flex flex-wrap gap-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.id}
              className="card w-full sm:w-96 bg-base-200 shadow-xl"
            >
              <div className="card-body">
                <h2 className="card-title text-base-content">
                  {request.name}
                </h2>
                <p className="text-gray-500">
                  {request.mutualConnections} mutual connections
                </p>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="btn btn-primary"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="btn btn-error"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No pending requests.
          </p>
        )}
      </div>
    </div>
  );
};

export default Requests;
