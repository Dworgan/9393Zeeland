import BasicLayout from "./layout/BasicLayout";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import PlanDestination from "./features/planning/PlanDestination";
import { useSelector } from "react-redux";
import BookingOptions from "./features/booking/BookingOptions";
import BookingConfirmed from "./features/booking/BookingConfirmed";
import { Outlet, Route, Routes } from "react-router-dom";
import Navigation from "./layout/Navigation";

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
      </Route>
    </Routes>
  );
}
