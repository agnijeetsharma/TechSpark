import { io } from "socket.io-client";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io("http://localhost:3000", {
      transports: ["websocket"], // Ensure WebSocket is preferred
    });
  } else {
    return io(window.location.origin, {
      path: "/socket.io", // Match NGINX's WebSocket route
      transports: ["websocket"],
    });
  }
};
