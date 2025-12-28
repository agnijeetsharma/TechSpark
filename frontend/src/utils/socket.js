import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    const SOCKET_URL =
      location.hostname === "localhost"
        ? "http://localhost:3000"
        : import.meta.env.VITE_SOCKET_URL;

    socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["polling", "websocket"], // DO NOT FORCE WS
    });
  }

  return socket;
};
