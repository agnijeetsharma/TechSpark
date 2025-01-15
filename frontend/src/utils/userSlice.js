import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => {
        const isNested = action.payload?.user;
  
        if (!state) {

          return isNested ? action.payload.user : action.payload;
        }
        return isNested
          ? { ...state, ...action.payload.user }
          : { ...state, ...action.payload };
      },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
