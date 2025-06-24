import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    isConnected: false,
  },
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    }
  }
});

export const { setConnectionStatus } = socketSlice.actions;
export default socketSlice.reducer;