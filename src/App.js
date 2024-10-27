import BasicLayout from "./layout/BasicLayout";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import PlanDestination from "./features/planning/PlanDestination";
import BookingOptions from "./features/booking/BookingOptions";
import BookingConfirmed from "./features/booking/BookingConfirmed";
import { Route, Routes } from "react-router-dom";
import UserEdit from "./features/user/UserEdit";
import UserBookings from "./features/user/UserBookings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route exact path="/" element={<PlanDestination />}></Route>
        <Route path="/BookingOptions" element={<BookingOptions />}></Route>
        <Route
          path="/BookingConfirmation"
          element={<BookingConfirmed />}
        ></Route>
        <Route path="/UserBookings" element={<UserBookings />}></Route>
        <Route path="/EditUser" element={<UserEdit />}></Route>
      </Route>
    </Routes>
  );
}
