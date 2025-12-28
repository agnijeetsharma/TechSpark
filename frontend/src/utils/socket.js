import { io } from "socket.io-client";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io("http://localhost:3000", {
      transports: ["websocket"],
    });
  }
  if (import.meta.env.VITE_USE_NGINX === "true") {
    return io(window.location.origin, {
      transports: ["websocket"],
    });
  }
  return io(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
    transports: ["polling", "websocket"],
  });
};
