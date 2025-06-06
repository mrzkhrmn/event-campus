import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: null,
  rememberMe: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      if (!state.rememberMe) {
        state.userInfo = null;
      }
      state.token = null;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
  },
});

export const { loginSuccess, logout, setRememberMe } = userSlice.actions;
export default userSlice.reducer;
