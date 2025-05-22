import React, {useEffect, useState} from "react";
import {Collapse} from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

// constants
import {MenuItemTypes} from "../../constants/menu";

// components
import {UserBox} from "../LeftSidebar";
import SimpleBar from "simplebar-react";
import {useLayoutContext} from "../../context/useLayoutContext";
import { useAuthContext } from "../../context/useAuthContext";

interface SubMenus {
    item: MenuItemTypes;
    linkClassName?: string;
    subMenuClassNames?: string;
    activeMenuItems?: Array<string>;
    toggleMenu?: (item: any, status: boolean) => void;
    className?: string;
}

const MenuItemWithChildren = ({
                                  item,
                                  linkClassName,
                                  subMenuClassNames,
                                  activeMenuItems,
                                  toggleMenu,
                              }: SubMenus) => {
    const [open, setOpen] = useState<boolean>(
        activeMenuItems!.includes(item.key)
    );

    useEffect(() => {
        setOpen(activeMenuItems!.includes(item.key));
    }, [activeMenuItems, item]);

    const toggleMenuItem = (e: any) => {
        e.preventDefault();
        const status = !open;
        setOpen(status);
        if (toggleMenu) toggleMenu(item, status);
        return false;
    };

    return (
        <>
            <li className={classNames("nav-item", {"menuitem-active": open})}>
                <Link
                    to=""
                    onClick={toggleMenuItem}
                    data-menu-key={item.key}
                    aria-expanded={open}
                    className={classNames("nav-link", linkClassName, {
                        "menuitem-active": activeMenuItems!.includes(item.key)
                            ? "active"
                            : "",
                    })}
                >
                    {!item.badge ? (
                        <span className="menu-arrow"></span>
                    ) : (
                        <span
                            className={`badge bg-${item.badge.variant} rounded-pill float-end`}
                        >
              {item.badge.text}
            </span>
                    )}
                    <span> {item.label} </span>
                </Link>
                <Collapse in={open}>
                    <div>
                        <ul className={classNames(subMenuClassNames)}>
                            {(item.children || []).map((child: MenuItemTypes, i: number) => {
                                return (
                                    <React.Fragment key={i}>
                                        {child.children ? (
                                            <>
                                                {/* parent */}
                                                <MenuItemWithChildren
                                                    item={child}
                                                    linkClassName={
                                                        activeMenuItems!.includes(child.key) ? "active" : ""
                                                    }
                                                    activeMenuItems={activeMenuItems}
                                                    subMenuClassNames="nav-second-level"
                                                    toggleMenu={toggleMenu}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {/* child */}
                                                <MenuItem
                                                    item={child}
                                                    className={
                                                        activeMenuItems!.includes(child.key)
                                                            ? "menuitem-active"
                                                            : ""
                                                    }
                                                    linkClassName={
                                                        activeMenuItems!.includes(child.key) ? "active" : ""
                                                    }
                                                />
                                            </>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    </div>
                </Collapse>
            </li>
        </>
    );
};

const MenuItem = ({item, className, linkClassName}: SubMenus) => {
    return (
        <>
            <li className={classNames("nav-item", className)}>
                <MenuItemLink item={item} className={linkClassName}/>
            </li>
        </>
    );
};

const MenuItemLink = ({item, className}: SubMenus) => {
    return (
        <Link
            to={item.url!}
            target={item.target}
            className={classNames("nav-link-ref", "nav-link", className)}
            data-menu-key={item.key}
        >
            {item.badge && (
                <span className={`badge bg-${item.badge.variant} float-end`}>
          {item.badge.text}
        </span>
            )}
            <span> {item.label} </span>
        </Link>
    );
};

interface MainMenuProps {
    menuItems: MenuItemTypes[];
    toggleMenu: (item: MenuItemTypes, show: boolean) => void;
    activeMenuItems: string[];
}

const MainMenu = ({
                      menuItems,
                      toggleMenu,
                      activeMenuItems,
                  }: MainMenuProps) => {

    const { showUserInfo } = useLayoutContext();
    const { user } = useAuthContext(); // Access user roles

    return (
        <>
            {activeMenuItems && (
                <div className="sidebar-main-menu">
                    <div id="two-col-menu" className="h-100">
                        <SimpleBar style={{ maxHeight: "100%" }} scrollbarMaxSize={320}>

                            {showUserInfo && <UserBox user={user || { name: '', email: '' }} />}                            {menuItems.map((menuItem: MenuItemTypes) => {
                                // Conditionally render "Customers" menu item
                                if (menuItem.label === "Customers" && !user?.roles?.includes("Staff") && !user?.roles?.includes("Admin")) {
                                    return null;
                                }

                                const activeParent = activeMenuItems && activeMenuItems.length && activeMenuItems[activeMenuItems.length - 1] === menuItem.key;                                return (
                                    <div
                                        key={menuItem.key}
                                        className={classNames("twocolumn-menu-item", {
                                            "d-block": activeParent,
                                        })}
                                    >
                                        <div className="title-box">
                                            {menuItem.isTitle && (
                                                <h5 className="menu-title">{menuItem.label}</h5>
                                            )}
                                            <ul className="nav flex-column">                                                {(menuItem.children || []).map((childItem: MenuItemTypes, childIdx: number) => {
                                                    return (
                                                        <React.Fragment key={childIdx}>
                                                            {childItem.children ? (
                                                                <MenuItemWithChildren
                                                                    item={childItem}
                                                                    toggleMenu={toggleMenu}
                                                                    subMenuClassNames="nav-second-level"
                                                                    activeMenuItems={activeMenuItems}
                                                                    linkClassName="side-nav-link"
                                                                />
                                                            ) : (                                                                <MenuItem
                                                                    item={childItem}
                                                                    linkClassName="side-nav-link"
                                                                    className={activeMenuItems!.includes(childItem.key) ? "menuitem-active" : ""}
                                                                />
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                        </SimpleBar>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainMenu;
