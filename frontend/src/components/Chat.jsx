import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { Base_URL } from "../constant";

const ChatFeature = () => {
  const targetUserId = useParams().id;
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const getChat = async () => {
    try {
      const allChat = await axios.get(Base_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      console.log(allChat?.data?.data?.messages);
      const chatMessages = allChat?.data?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        console.log(senderId?.username);
        return {
          sender: senderId?.username,
          text,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChat();
  }, []);
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", userId, targetUserId);
    socket.on("newMessageReceived", ({ username, text }) => {
      console.log(username, text);
      // const currentTime = new Date().toLocaleTimeString();
      setMessages((messages) => [
        ...messages,
        { sender: username, text: text },
      ]);
    });
    return () => {
      console.log("disconnect");
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    if (inputMessage.trim()) {
      socket.emit("sendMessage", {
        username: user?.username,
        userId,
        targetUserId,
        text: inputMessage,
      });

      setInputMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base mt-24 mb-2">
  
      <div className="flex flex-col w-full max-w-screen-md h-full bg-base-100 border border-base-300 rounded-lg shadow-lg overflow-hidden">
       
        <div
          className="flex-grow overflow-y-auto p-4 bg-base-200"
          style={{ paddingBottom: "6rem", maxHeight: "calc(100% - 10rem)" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === user?.username ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`p-3 rounded-lg max-w-lg break-words whitespace-pre-wrap ${
                  msg.sender === user?.username
                    ? "bg-primary text-primary-content self-end"
                    : "bg-base-100 border border-base-300 self-start"
                }`}
              >
                <p className="font-semibold">{msg.sender}</p>
                <p>{msg?.text}</p>
                <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

   
        <div className="p-4 bg-base-100 border-t border-base-300">
          <div className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="input input-bordered flex-grow resize-none"
              style={{ overflowY: "auto", maxHeight: "5rem" }}
            />
            <button
              className="btn btn-primary ml-4"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFeature;
