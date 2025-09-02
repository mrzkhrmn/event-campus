import { User } from "@/types/UserTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null as User | null,
  token: null as string | null,
  rememberMe: true as boolean,
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
      state.userInfo = null;
      state.token = null;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
  },
});

export const { loginSuccess, logout, setRememberMe } = userSlice.actions;
export default userSlice.reducer;
