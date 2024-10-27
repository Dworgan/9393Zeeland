import { createSlice } from "@reduxjs/toolkit";

/*
  app state:
  empty
  appPlanning
  appBookingOptions
  appTravelConfirmation
*/
const initialState = {
  appState: "appPlanning",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppState(state, action) {
      state.appState = action.payload;
    },
  },
});

export const { setAppState } = appSlice.actions;

export default appSlice.reducer;
