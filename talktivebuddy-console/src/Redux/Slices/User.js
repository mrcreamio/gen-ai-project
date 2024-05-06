import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let init = {
  _id: "",
  loginAt: null,
  logoutAt: null,
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  image: "",
  password: "",
  phone: null,
};

const validateUser = createAsyncThunk("/auth", async () => {
  let data = "function here";

  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: init,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(validateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
