import { createSlice } from "@reduxjs/toolkit";


const connectionSlice=createSlice({
    name:'connection',
    initialState: {
        selectedUser: null, 
      },
    reducers:{
        addConnections:(state,action)=>{
            return action.payload
        },
        removeConnection:(state,action)=>{
            const newConnections=state.filter(c=>c._id!==action.payload)
            return newConnections
        },
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
          },
    }
})

export const {addConnections,removeConnection,setSelectedUser}=connectionSlice.actions
export default connectionSlice.reducer