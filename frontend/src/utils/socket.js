// import io from "socket.io-client";
// import { Base_URL } from "../constant";

// export const createSocketConnection = () => {
//     if (location.hostname === "localhost") {
//       return io("http://localhost:3000")
//     // return io(Base_URL);
//   } else {
//     // return io("/", { path: "/api/v1/users/socket.io" });
//     const socketUrl = location.hostname === "localhost" ? Base_URL : "/";
//     return io(socketUrl); // Remove the extra '/api/v1/users'
//   }
// };



import io from "socket.io-client";
import { Base_URL } from "../constant";

export const createSocketConnection = () => {
  const socketUrl = location.hostname === "localhost" ? "http://localhost:3000" : `${Base_URL}/socket.io`;
  return io(socketUrl);
};

