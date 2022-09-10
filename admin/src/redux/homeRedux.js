import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    userStats: [],
    isFetching: false,
    isError: false,
  },
  reducers: {
    getStatsStart: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    getStatsSuccess: (state, action) => {
      state.isFetching = false;
      state.userStats = action.payload;
    },
    getStatsFailure: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { getStatsStart, getStatsSuccess, getStatsFailure } =
  homeSlice.actions;
export default homeSlice.reducer;
