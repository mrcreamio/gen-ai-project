import { createSlice } from "@reduxjs/toolkit";

const storesSlice = createSlice({
  name: "shops",
  initialState: null,
  reducers: {
    setStores(state, action) {
      state = action.payload;
    },
  },
});

export const { setStores } = storesSlice.actions;

export default storesSlice.reducer;
