import { createSlice } from "@reduxjs/toolkit";


const connectionSlice=createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addConnections:(state,action)=>{
            return action.payload
        },
        removeConnection:(state,action)=>{
            const newConnections=state.filter(c=>c._id!==action.payload)
            return newConnections
        }
    }
})

export const {addConnections,removeConnection}=connectionSlice.actions
export default connectionSlice.reducer