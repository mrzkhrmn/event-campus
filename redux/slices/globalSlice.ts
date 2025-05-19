import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTermsAndConditionsDone: true,
  rememberMe: false,
  isLoading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsTermsAndConditionsDone: (state, action) => {
      state.isTermsAndConditionsDone = action.payload;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsTermsAndConditionsDone, setRememberMe, setIsLoading } =
  globalSlice.actions;

export default globalSlice.reducer;
