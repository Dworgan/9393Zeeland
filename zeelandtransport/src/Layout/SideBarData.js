import React from "react";
import * as IoIcons from "react-icons/io";
import * as FcIcons from "react-icons/fc";

export const SidebarData = [
  {
    title: "Planning",
    path: "/",
    icon: <FcIcons.FcPlanner />,
    cName: "nav-text",
  },
  {
    title: "Mijn boekingen",
    path: "/UserBookings",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Profiel",
    path: "/EditUser",
    icon: <FcIcons.FcPortraitMode />,
    cName: "nav-text",
  },
];
