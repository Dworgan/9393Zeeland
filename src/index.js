import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import mainStore from "./redux/RootReducer";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PlanDestination from "./features/planning/PlanDestination";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={mainStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
