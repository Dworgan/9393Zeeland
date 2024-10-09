import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

function BasicLayout() {
  return (
    <div className="layout">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default BasicLayout;
