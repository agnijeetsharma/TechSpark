import io from 'socket.io-client'
// import{ Base_URL} from "../constant.js"
export const  createSocketConnection=()=>{
    return io("http://localhost:3000")
}
  