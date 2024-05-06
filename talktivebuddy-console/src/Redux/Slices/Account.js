import { createSlice } from "@reduxjs/toolkit";

let init = {
  _id: "",
  status: "",
  stores: [],
  preferences: "",
  userId: "",
  role: "",
  referralId: null,
  staff: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState: null,
  reducers: {
    setAccount(state, action) {
      state = action.payload;
    },
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
