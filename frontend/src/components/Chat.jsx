import { useState, useRef, useEffect } from "react";
import "../App.css";

const ChatFeature = () => {
  const [messages, setMessages] = useState([
    { sender: "John", text: "Hey! How's it going?", timestamp: "10:30 AM" },
    { sender: "You", text: "Good, how about you?", timestamp: "10:31 AM" },
    { sender: "John", text: "I'm doing great, thanks!", timestamp: "10:32 AM" },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  
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
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        { sender: "You", text: inputMessage, timestamp: "Now" },
      ]);
      setInputMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base mt-24 mb-2">
      {/* Chat Area Container */}
      <div className="flex flex-col w-full max-w-screen-md h-full bg-base-100 border border-base-300 rounded-lg shadow-lg overflow-hidden">
        {/* Chat Messages */}
        <div
          className="flex-grow overflow-y-auto p-4 bg-base-200 custom-scrollbar"
          style={{ paddingBottom: "6rem" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`p-3 rounded-lg max-w-lg ${
                  msg.sender === "You"
                    ? "bg-primary text-primary-content self-end"
                    : "bg-base-100 border border-base-300 self-start"
                }`}
              >
                <p className="font-semibold">{msg.sender}</p>
                <p>{msg.text}</p>
                <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          {/* Ref to auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 bg-base-100 border-t border-base-300">
          <div className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="input input-bordered flex-grow"
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
