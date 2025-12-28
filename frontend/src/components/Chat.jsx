import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/axiosInstance";
import { getSocket } from "../utils/socket";

const ChatFeature = () => {
  const { id: targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatWith, setChatWith] = useState("Loading...");
  const [chatWithImage, setChatWithImage] = useState(null);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!targetUserId || !userId) return;

    const loadChat = async () => {
      try {
        const res = await api.get(`/chat/${targetUserId}`);
        const chat = res.data.data;

        const chatPartner = chat.participants.find(
          (p) => p._id.toString() !== userId
        );

        setChatWith(chatPartner?.username || "Unknown User");
        setChatWithImage(chatPartner?.profileImage || null);

        const chatMessages =
          chat.messages?.map((msg) => ({
            sender: msg.senderId?.username,
            text: msg.text,
          })) || [];

        setMessages(chatMessages);
      } catch (err) {
        console.error("Chat fetch error:", err);
      }
    };

    loadChat();
  }, [targetUserId, userId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = getSocket();
    socketRef.current = socket;

    socket.emit("joinChat", userId, targetUserId);

    const handleMessage = ({ username, text }) => {
      setMessages((prev) => [...prev, { sender: username, text }]);
    };

    socket.on("newMessageReceived", handleMessage);

    return () => {
      socket.off("newMessageReceived", handleMessage);
    };
  }, [userId, targetUserId]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      username: user?.username,
      userId,
      targetUserId,
      text: inputMessage,
    });

    setInputMessage("");
  };

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="flex flex-col w-full max-w-3xl h-[90vh] bg-base-100 rounded-xl shadow-lg overflow-hidden">

     
        <div className="p-4 border-b border-base-300 bg-base-100 flex items-center pt-10">
          {chatWithImage ? (
            <img
              src={chatWithImage}
              alt={chatWith}
              className="w-10 h-10 rounded-full mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
          )}
          <h2 className="text-lg font-semibold text-primary">
            Chat with {chatWith}
          </h2>
        </div>

       
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
          {messages.map((msg, index) => {
            const isMe = msg.sender === user?.username;
            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-xl shadow-sm break-words
                    ${
                      isMe
                        ? "bg-primary text-primary-content rounded-br-none"
                        : "bg-base-100 border border-base-300 rounded-bl-none"
                    }`}
                >
                  <p className="text-xs opacity-70 mb-1">{msg.sender}</p>
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-base-300 bg-base-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="input input-bordered flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatFeature;
