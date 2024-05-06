import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: null,
  reducers: {
    setSocket(state, action) {
      state = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
