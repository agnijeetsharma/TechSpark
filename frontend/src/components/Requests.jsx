import { useEffect, useState } from "react";
import { Base_URL, IMAGE_URL } from "../constant";
import axios from "axios";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [requestType, setRequestType] = useState("");

  const fetchReceivedRequest = async () => {
    try {
      const response = await axios.get(
        Base_URL + "/match/pending-receivedrequest",
        { withCredentials: true }
      );
      setRequests(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReceivedRequest();
  }, []);

  const acceptRejectRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        Base_URL + "/match/accept-request/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = (status, _id) => {
    acceptRejectRequest(status, _id);
    setRequests(requests.filter((request) => request?.sender?._id !== _id));
    setShowToast(true);
    setRequestType(status);
    setTimeout(() => {
      setShowToast(false);
      setRequestType("");
    }, 3000);
  };

  if (requests?.length === 0) {
    return (
      <div className="text-center font-bold text-primary text-3xl mt-44">
        No Requests
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 mt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-primary text-2xl font-bold mb-6">
          Connection Requests
        </h1>

        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request?.sender?._id}
              className="flex items-center bg-base-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={request?.sender?.profileImage || IMAGE_URL}
                alt={request?.sender?.username}
                className="w-16 h-16 rounded-full"
              />

              <div className="flex-1 ml-4">
                <h2 className="font-semibold text-lg text-primary">
                  {request?.sender?.username}
                </h2>
                <p className="text-sm text-gray-400">{request?.sender?.bio}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(request?.createdAt).toLocaleString("en-US", {
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

              <div className="flex space-x-2">
                <button
                  onClick={() => handleAction("Accepted", request?.sender?._id)}
                  className="btn btn-primary text-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction("Rejected", request?.sender?._id)}
                  className="btn btn-outline btn-error text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="alert alert-success shadow-lg">
            <span>Request {requestType} successfully 🔥</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
