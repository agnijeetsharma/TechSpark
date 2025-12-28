import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    const SOCKET_URL =
      location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://tech-spark.onrender.com";

    socket = io(SOCKET_URL, {
      path: "/socket.io",
      withCredentials: true,
      transports: ["websocket"], 
    });
  }

  return socket;
};
