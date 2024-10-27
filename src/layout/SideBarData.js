import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Planning',
    path: '/',
    icon: <MdIcons.MdOutlineModeOfTravel />,
    cName: 'nav-text',
  },
  {
    title: 'Mijn boekingen',
    path: '/UserBookings',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
  },
  {
    title: 'Profiel',
    path: '/EditUser',
    icon: <FaIcons.FaUser />,
    cName: 'nav-text',
  },
];
