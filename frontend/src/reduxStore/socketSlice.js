import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socketId: null
  },
  reducers: {
    setSocket: (state, action) => {
      state.socketId = action.payload?.id || null; // Only store the socket ID
    }
  }
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;