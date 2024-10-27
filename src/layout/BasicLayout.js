import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

function BasicLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default BasicLayout;
