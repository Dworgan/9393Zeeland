import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import { IconContext } from 'react-icons';

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: 'undefined' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FiIcons.FiMenu onClick={showSidebar} />
          </Link>
          <Link to={'/'}>
            <div className='flex1 h1 text-align-center font-bold'>
              {' '}
              FLEXITAXI
            </div>
          </Link>
          <div>
            {/* <Link to={'/EditUser'}>
              <UserIcon width={'40px'} height={'40px'} color='color-primary' />
            </Link> */}
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
