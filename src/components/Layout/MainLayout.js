import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { useLayoutContext } from '../../themes/minton/React.js/JS/src/context/useLayoutContext';
import VerticalLayout from '../../themes/minton/React.js/JS/src/layouts/VerticalLayout';
import Topbar from '../../themes/minton/React.js/JS/src/layouts/Topbar';
import LeftSidebar from '../../themes/minton/React.js/JS/src/layouts/LeftSidebar';

function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, changeTheme } = useLayoutContext();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Profile menu items
  const ProfileMenus = [
    {
      label: "My Account",
      icon: "fe-user",
      redirectTo: "/profile"
    },
    {
      label: "Logout",
      icon: "fe-log-out",
      redirectTo: "#",
      onClick: handleLogout
    }
  ];

  // Define menu items with role-based visibility
  const menuItems = [
    {
      key: 'home',
      label: 'Home',
      icon: 'fe-home',
      url: '/',
      roles: []
    },
    {
      key: 'customers',
      label: 'Customers',
      icon: 'fe-users',
      url: '/customers',
      roles: ['User', 'Admin']
    },
    {
      key: 'plant-categories',
      label: 'Plant Categories',
      icon: 'fe-grid',
      url: '/plant-categories',
      roles: ['Admin']
    },
    {
      key: 'manage-plant',
      label: 'Manage Plants',
      icon: 'fe-package',
      url: '/manage-plant',
      roles: ['Admin']
    },
    {
      key: 'user-management',
      label: 'User Management',
      icon: 'fe-user-check',
      url: '/user-management',
      roles: ['Admin']
    }
  ];

  // Filter menu items based on user roles
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.length === 0 || (user && item.roles.some(role => user.roles.includes(role)))
  );

  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.add("sidebar-enable");
      }
    }
  };

  return (
    <div id="wrapper">
      <Topbar 
        openLeftMenuCallBack={openMenu}
        menuItems={filteredMenuItems}
        ProfileMenus={ProfileMenus}
        toggleTheme={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
        user={user}
      />
      <LeftSidebar menuItems={filteredMenuItems} />
      <div className="content-page">
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;