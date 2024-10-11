import { configureStore } from "@reduxjs/toolkit";
import planReducer from "../features/planning/PlanSlice";
import bookingReducer from "../features/booking/BookingSlice";
import appReducer from "../AppSlice";
import userReducer from "../features/user/UserSlice";

const mainStore = configureStore({
  reducer: {
    plan: planReducer,
    booking: bookingReducer,
    app: appReducer,
    user: userReducer,
  },
});
//mainStore.dispatch(planReducer.setFromQuery('test'));

export default mainStore;
