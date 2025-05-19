import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTermsAndConditionsDone: true,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsTermsAndConditionsDone: (state, action) => {
      state.isTermsAndConditionsDone = action.payload;
    },
  },
});

export const { setIsTermsAndConditionsDone } = globalSlice.actions;

export default globalSlice.reducer;
