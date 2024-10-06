import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listOfTravelOptions: [],
  listOfAdditionalTravelOptions: [],
  selectedTravelOption: null,
  confirmedTravelOption: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setListOfTravelOptions(state, action) {
      state.listOfTravelOptions = action.payload;
    },
    setListOfAdditionalTravelOptions(state, action) {
      state.listOfAdditionalTravelOptions = action.payload;
    },
    setSelectedTravelOption(state, action) {
      state.selectedTravelOption = action.payload;
    },
    setConfirmedTravelOption(state, action) {
      state.confirmedTravelOption = action.payload;
    },
  },
});

export const {
  setListOfTravelOptions,
  setListOfAdditionalTravelOptions,
  setSelectedTravelOption,
  setConfirmedTravelOption,
} = bookingSlice.actions;

export default bookingSlice.reducer;
