import { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// helpers
import { getMenuItems } from "../helpers/menu";

import AppMenu from "./Menu";

// images
import logoDark from "@/assets/images/logo-dark.png";
import logoLight from "@/assets/images/logo-light.png";
import logoSmDark from "@/assets/images/logo-sm-dark.png";
import logoSm from "@/assets/images/logo-sm.png";
import profileImg from "@/assets/images/users/avatar-1.jpg";
import SimpleBar from "simplebar-react";

import { useLayoutContext } from "@/context/useLayoutContext";

/* user box */
export const UserBox = () => {
    // get the profilemenu
    const ProfileMenus = [
        {
            label: "My Account",
            icon: "fe-user",
            redirectTo: "#",
        },
        {
            label: "Settings",
            icon: "fe-settings",
            redirectTo: "#",
        },
        {
            label: "Lock Screen",
            icon: "fe-lock",
            redirectTo: "/auth/lock-screen",
        },
        {
            label: "Logout",
            icon: "fe-log-out",
            redirectTo: "/auth/logout",
        },
    ];

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    /*
     * toggle dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="text-center">
            <img
                src={profileImg}
                alt="profile image"
                title="Mat Helme"
                className="rounded-circle avatar-md"
            />
            <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle
                    id="dropdown-notification"
                    as="a"
                    onClick={toggleDropdown}
                    className="cursor-pointer text-reset h5 mt-2 mb-1 d-block"
                >
                    Nik Patel
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-pro-dropdown">
                    <div onClick={toggleDropdown}>
                        {(ProfileMenus || []).map((item, index) => {
                            return (
                                <Link
                                    to={item.redirectTo}
                                    className="dropdown-item notify-item"
                                    key={index + "-profile-menu"}
                                >
                                    <i className={`${item.icon} me-1`}></i>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            <p className="text-reset">Admin Head</p>
        </div>
    );
};

/* sidebar content */
const SideBarContent = () => {

    const {showUserInfo} = useLayoutContext()

    return (
        <>
            {
                showUserInfo &&
                <UserBox/>
            }

            <div id="sidebar-menu">
                <AppMenu menuItems={getMenuItems()}/>
            </div>

            <div className="clearfix"/>
        </>
    );
};

interface LeftSidebarProps {
    isCondensed: boolean;
}

const LeftSidebar = ({isCondensed}: LeftSidebarProps) => {
    const menuNodeRef: any = useRef(null);

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e: any) => {
        if (
            menuNodeRef &&
            menuNodeRef.current &&
            menuNodeRef.current.contains(e.target)
        )
            return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove("sidebar-enable");
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOtherClick, false);

        return () => {
            document.removeEventListener("mousedown", handleOtherClick, false);
        };
    }, []);

    return (
        <div className="left-side-menu" ref={menuNodeRef} >
            {/* logo */}
            <div className="logo-box">
                <Link to="/" className="logo logo-dark text-center">
          <span className="logo-sm">
            <img src={logoSmDark} alt="" height={24} width={24}/>
          </span>
                    <span className="logo-lg">
            <img src={logoDark} alt="" height={20} width={108}/>
          </span>
                </Link>

                <Link to="/" className="logo logo-light text-center">
          <span className="logo-sm">
            <img src={logoSm} alt="" height={24} width={24}/>
          </span>
                    <span className="logo-lg">
            <img src={logoLight} alt="" height={20} width={108}/>
          </span>
                </Link>
            </div>

            {!isCondensed && (
                <SimpleBar
                    style={{maxHeight: "100%"}}
                    scrollbarMaxSize={320}
                >
                    <SideBarContent/>
                </SimpleBar>
            )}
            {isCondensed && <SideBarContent/>}
        </div>
    );
};

LeftSidebar.defaultProps = {
    isCondensed: false,
};

export default LeftSidebar;
