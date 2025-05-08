import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

// components
import TopbarSearch from "@/components/Topbar/TopbarSearch";
import MaximizeScreen from "@/components/Topbar/MaximizeScreen";
import AppsDropdown from "@/components/Topbar/AppsDropdown/";
import SearchDropdown from "@/components/Topbar/SearchDropdown";
import LanguageDropdown from "@/components/Topbar/LanguageDropdown";
import NotificationDropdown from "@/components/Topbar/NotificationDropdown";
import ProfileDropdown from "@/components/Topbar/ProfileDropdown";
import CreateNew from "@/components/Topbar/CreateNew";
import MegaMenu from "@/components/Topbar/MegaMenu";

// images
import profilePic from "@/assets/images/users/avatar-1.jpg";
import avatar2 from "@/assets/images/users/avatar-2.jpg";
import avatar4 from "@/assets/images/users/avatar-4.jpg";
import logoSm from "@/assets/images/logo-sm.png";
import logoSmDark from "@/assets/images/logo-sm-dark.png";
import logoDark from "@/assets/images/logo-dark.png";
import logoDark2 from "@/assets/images/logo-2-dark.png";
import logoLight from "@/assets/images/logo-light.png";
import logoLight2 from "@/assets/images/logo-2-light.png";
import { useLayoutContext } from "@/context/useLayoutContext";
// get the notifications
const Notifications = [{
  id: 1,
  text: "Doug Dukes commented on Admin Dashboard",
  subText: "1 min ago",
  icon: "mdi mdi-comment-account-outline",
  bgColor: "primary"
}, {
  id: 2,
  text: "Mario Drummond",
  subText: "Hi, How are you? What about our next meeting",
  avatar: avatar2
}, {
  id: 3,
  text: "Karen Robinson",
  subText: "Wow ! this admin looks good and awesome design",
  avatar: avatar4
}, {
  id: 4,
  text: "New user registered.",
  subText: "5 hours ago",
  icon: "mdi mdi-account-plus",
  bgColor: "warning"
}, {
  id: 5,
  text: "Caleb Flakelar commented on Admin",
  subText: "1 min ago",
  icon: "mdi mdi-comment-account-outline",
  bgColor: "info"
}, {
  id: 6,
  text: "Carlos Crouch liked Admin",
  subText: "13 days ago",
  icon: "mdi mdi-heart",
  bgColor: "secondary"
}];

// get the profilemenu
const ProfileMenus = [{
  label: "My Account",
  icon: "ri-account-circle-line",
  redirectTo: "#"
}, {
  label: "Settings",
  icon: "ri-settings-3-line",
  redirectTo: "#"
}, {
  label: "My Wallet",
  icon: "ri-wallet-line",
  badge: {
    variant: "success",
    text: "3"
  },
  redirectTo: "#"
}, {
  label: "Lock Screen",
  icon: "ri-lock-line",
  redirectTo: "/auth/lock-screen"
}, {
  label: "Logout",
  icon: "ri-logout-box-line",
  redirectTo: "/auth/logout"
}];
const otherOptions = [{
  id: 1,
  label: "New Projects",
  icon: "fe-briefcase"
}, {
  id: 2,
  label: "Create Users",
  icon: "fe-user"
}, {
  id: 3,
  label: "Revenue Report",
  icon: "fe-bar-chart-line-"
}, {
  id: 4,
  label: "Settings",
  icon: "fe-settings"
}, {
  id: 4,
  label: "Help & Support",
  icon: "fe-headphones"
}];

// get mega-menu options
const MegaMenuOptions = [{
  id: 1,
  title: "UI Components",
  menuItems: ["Widgets", "Nestable List", "Range Sliders", "Masonry Items", "Sweet Alerts", "Treeview Page", "Tour Page"]
}, {
  id: 2,
  title: "Applications",
  menuItems: ["eCommerce Pages", "CRM Pages", "Email", "Calendar", "Team Contacts", "Task Board", "Email Templates"]
}, {
  id: 3,
  title: "Extra Pages",
  menuItems: ["Left Sidebar with User", "Menu Collapsed", "Small Left Sidebar", "New Header Style", "Search Result", "Gallery Pages", "Maintenance & Coming Soon"]
}];
const Topbar = ({
  hideLogo,
  navCssClasses,
  openLeftMenuCallBack
}) => {
  const [isopen, setIsopen] = useState(false);
  const {
    theme,
    menu,
    orientation,
    themeCustomizer,
    changeTheme,
    changeMenuSize
  } = useLayoutContext();
  const navbarCssClasses = navCssClasses || "";
  const containerCssClasses = !hideLogo ? "container-fluid" : "";

  /**
   * Toggle the leftmenu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    setIsopen(!isopen);
    if (openLeftMenuCallBack) openLeftMenuCallBack();
  };

  /**
   * Toggle Dark Mode
   */
  const toggleDarkMode = () => {
    if (theme === 'dark') {
      changeTheme('light');
    } else {
      changeTheme('dark');
    }
  };

  /**
   * Toggles the left sidebar width
   */
  const toggleLeftSidebarWidth = () => {
    if (menu.size === "default" || menu.size === "compact") changeMenuSize('condensed');
    if (menu.size === "condensed") changeMenuSize('default');
  };
  return <React.Fragment>
            <div className={`navbar-custom ${navbarCssClasses}`}>
                <div className={containerCssClasses}>
                    {!hideLogo && <div className="logo-box">
                            <Link to="/" className="logo logo-dark text-center">
                                <span className="logo-sm">
                                    <img src={logoSmDark} alt="" height={24} width={24} />
                                </span>
                                <span className="logo-lg">
                                    <img src={orientation === 'two-column' ? logoDark2 : logoDark} alt="logo" height={20} width={108} />
                                </span>
                            </Link>
                            <Link to="/" className="logo logo-light text-center">
                                <span className="logo-sm">
                                    <img src={logoSm} alt="" height={24} width={24} />
                                </span>
                                <span className="logo-lg">
                                    <img src={orientation === 'two-column' ? logoLight2 : logoLight} alt="logo" height={20} width={108} />
                                </span>
                            </Link>
                        </div>}

                    <ul className="list-unstyled topnav-menu float-end mb-0">
                        <li className="d-none d-lg-block">
                            <TopbarSearch />
                        </li>

                        <li className="dropdown d-inline-block d-lg-none">
                            <SearchDropdown />
                        </li>

                        <li className="d-none d-md-inline-block">
                            <span className="nav-link dropdown-toggle arrow-none waves-effect waves-light" onClick={toggleDarkMode}>
                                <i className="fe-moon noti-icon" />
                            </span>
                        </li>

                        <li className="dropdown d-none d-lg-inline-block">
                            <MaximizeScreen />
                        </li>
                        <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
                            <AppsDropdown />
                        </li>
                        <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
                            <LanguageDropdown />
                        </li>
                        <li className="dropdown notification-list">
                            <NotificationDropdown notifications={Notifications} />
                        </li>
                        <li className="dropdown notification-list topbar-dropdown">
                            <ProfileDropdown profilePic={profilePic} menuItems={ProfileMenus} username={"Nik Patel"} userTitle={"Founder"} />
                        </li>
                        <li className="dropdown notification-list">
                            <Link to="" className="nav-link dropdown-toggle right-bar-toggle waves-effect waves-light" onClick={themeCustomizer.toggle}>
                                <i className="fe-settings noti-icon"></i>
                            </Link>
                        </li>
                    </ul>

                    <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                        {orientation !== 'horizontal' && <li>
                                <button className="button-menu-mobile waves-effect waves-light d-none d-lg-block" onClick={toggleLeftSidebarWidth}>
                                    <i className="fe-menu"></i>
                                </button>
                            </li>}

                        <li>
                            <button className="button-menu-mobile open-left d-lg-none d-bolck waves-effect waves-light" onClick={handleLeftMenuCallBack}>
                                <i className="fe-menu" />
                            </button>
                        </li>

                        {/* Mobile menu toggle (Horizontal Layout) */}
                        <li>
                            <Link to="" className={classNames("navbar-toggle nav-link", {
              open: isopen
            })} onClick={handleLeftMenuCallBack}>
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </li>

                        <li className="dropdown d-none d-xl-block">
                            <CreateNew otherOptions={otherOptions} />
                        </li>

                        <li className="dropdown dropdown-mega d-none d-xl-block">
                            <MegaMenu subMenus={MegaMenuOptions} />
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>;
};
export default Topbar;