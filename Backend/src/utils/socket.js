import { Server } from "socket.io";
import { apiError } from "./apiErrors.js";
import { Chat } from "../models/chat.models.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", (userId, fromUserId) => {
      const roomId = [userId, fromUserId].sort().join("_");
      socket.join(roomId);
      console.log("Room ID:", roomId);
    });
    socket.on(
      "sendMessage",
      async ({ username, userId, targetUserId, text }) => {
        try {
          const roomId = [userId, targetUserId].sort().join("_");
          console.log(username, text, "server side");

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
             chat =  new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({ sender: userId, text });
          await chat.save()
          io.to(roomId).emit("newMessageReceived", {
            username,
            text,
          });
        } catch (error) {
          return new apiError(400, "Chat not received properly");
        }
      },
    );
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default initializeSocket;
