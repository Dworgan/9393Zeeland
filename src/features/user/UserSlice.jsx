import { createSlice } from '@reduxjs/toolkit';

const userInfoInitial = {
  id: 12345,
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
};
const userInfoLoaded =
  localStorage.getItem('userinfo') !== null
    ? JSON.parse(localStorage.getItem('userinfo'))
    : userInfoInitial;
const userBookingsLoaded =
  localStorage.getItem('userbookings') !== null
    ? JSON.parse(localStorage.getItem('userbookings'))
    : [];

const initialState = {
  userInfo: userInfoLoaded,
  listOfBookings: userBookingsLoaded,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // =========== User Info ===========
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
        localStorage.setItem('userinfo', JSON.stringify(state.userInfo));
      },
    },
    setAddUserBooking(state, action) {
      state.listOfBookings.push(action.payload);
      localStorage.setItem(
        'userbookings',
        JSON.stringify(state.listOfBookings)
      );
    },
  },
});

export const { setUpdateUserInfo, setAddUserBooking } = userSlice.actions;

export default userSlice.reducer;
