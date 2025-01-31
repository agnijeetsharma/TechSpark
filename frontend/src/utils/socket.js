import io from 'socket.io-client'
import { Base_URL } from '../constant';

export const  createSocketConnection=()=>{
    // return io("http://localhost:3000")
    if (location.hostname === "localhost") {
        return io(Base_URL);
      } else {
        return io("/", { path: "/api/v1/users/socket.io" });
      }
}
  