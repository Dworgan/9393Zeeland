import { createSlice } from "@reduxjs/toolkit";

const userInfo = {
  id: 12345,
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const initialState = {
  userInfo: userInfo,
  listOfBookings: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUpdateUserInfo: {
      prepare(firstName, lastName, email, phoneNumber) {
        return {
          payload: { firstName, lastName, email, phoneNumber },
        };
      },
      reducer(state, action) {
        state.userInfo.firstName = action.payload.firstName;
        state.userInfo.lastName = action.payload.lastName;
        state.userInfo.email = action.payload.email;
        state.userInfo.phoneNumber = action.payload.phoneNumber;
      },
    },
    setAddUserBooking(state, action) {
      state.listOfBookings.push(action.payload);
    },
  },
});

export const { setUpdateUserInfo, setAddUserBooking } = userSlice.actions;

export default userSlice.reducer;
