import { configureStore } from "@reduxjs/toolkit";
import planReducer from "../features/planning/PlanSlice";
import bookingReducer from "../features/booking/BookingSlice";
import appReducer from "../AppSlice";

const mainStore = configureStore({
  reducer: {
    plan: planReducer,
    booking: bookingReducer,
    app: appReducer,
  },
});
//mainStore.dispatch(planReducer.setFromQuery('test'));

export default mainStore;
