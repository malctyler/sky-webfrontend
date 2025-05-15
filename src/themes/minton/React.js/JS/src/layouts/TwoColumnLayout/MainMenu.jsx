import React, { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

// constants

// components
import { UserBox } from "../LeftSidebar";
import SimpleBar from "simplebar-react";
import { useLayoutContext } from "@/context/useLayoutContext";
const MenuItemWithChildren = ({
  item,
  linkClassName,
  subMenuClassNames,
  activeMenuItems,
  toggleMenu
}) => {
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));
  useEffect(() => {
    setOpen(activeMenuItems.includes(item.key));
  }, [activeMenuItems, item]);
  const toggleMenuItem = e => {
    e.preventDefault();
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };
  return <>
            <li className={classNames("nav-item", {
      "menuitem-active": open
    })}>
                <Link to="" onClick={toggleMenuItem} data-menu-key={item.key} aria-expanded={open} className={classNames("nav-link", linkClassName, {
        "menuitem-active": activeMenuItems.includes(item.key) ? "active" : ""
      })}>
                    {!item.badge ? <span className="menu-arrow"></span> : <span className={`badge bg-${item.badge.variant} rounded-pill float-end`}>
              {item.badge.text}
            </span>}
                    <span> {item.label} </span>
                </Link>
                <Collapse in={open}>
                    <div>
                        <ul className={classNames(subMenuClassNames)}>
                            {(item.children || []).map((child, i) => {
              return <React.Fragment key={i}>
                                        {child.children ? <>
                                                {/* parent */}
                                                <MenuItemWithChildren item={child} linkClassName={activeMenuItems.includes(child.key) ? "active" : ""} activeMenuItems={activeMenuItems} subMenuClassNames="nav-second-level" toggleMenu={toggleMenu} />
                                            </> : <>
                                                {/* child */}
                                                <MenuItem item={child} className={activeMenuItems.includes(child.key) ? "menuitem-active" : ""} linkClassName={activeMenuItems.includes(child.key) ? "active" : ""} />
                                            </>}
                                    </React.Fragment>;
            })}
                        </ul>
                    </div>
                </Collapse>
            </li>
        </>;
};
const MenuItem = ({
  item,
  className,
  linkClassName
}) => {
  return <>
            <li className={classNames("nav-item", className)}>
                <MenuItemLink item={item} className={linkClassName} />
            </li>
        </>;
};
const MenuItemLink = ({
  item,
  className
}) => {
  return <Link to={item.url} target={item.target} className={classNames("nav-link-ref", "nav-link", className)} data-menu-key={item.key}>
            {item.badge && <span className={`badge bg-${item.badge.variant} float-end`}>
          {item.badge.text}
        </span>}
            <span> {item.label} </span>
        </Link>;
};
const MainMenu = ({
  menuItems,
  toggleMenu,
  activeMenuItems
}) => {
  const {
    showUserInfo
  } = useLayoutContext();
  return <>
            {activeMenuItems && <div className="sidebar-main-menu">
                    <div id="two-col-menu" className="h-100">
                        <SimpleBar style={{
          maxHeight: "100%"
        }} scrollbarMaxSize={320}>

                            {showUserInfo && <UserBox />}

                            {(menuItems || []).map((menuItem, key) => {
            const activeParent = activeMenuItems && activeMenuItems.length && activeMenuItems[activeMenuItems.length - 1] === menuItem["key"];
            return <div key={key} className={classNames("twocolumn-menu-item", {
              "d-block": activeParent
            })}>
                                        <div className="title-box">
                                            {menuItem.isTitle && <h5 className="menu-title">{menuItem.label}</h5>}
                                            <ul className="nav flex-column">
                                                {(menuItem.children || []).map((item, idx) => {
                    return <React.Fragment key={idx}>
                                                            {item.children ? <MenuItemWithChildren item={item} toggleMenu={toggleMenu} subMenuClassNames="nav-second-level" activeMenuItems={activeMenuItems} linkClassName="side-nav-link" /> : <MenuItem item={item} linkClassName="side-nav-link" className={activeMenuItems.includes(item.key) ? "menuitem-active" : ""} />}
                                                        </React.Fragment>;
                  })}
                                            </ul>
                                        </div>
                                    </div>;
          })}
                        </SimpleBar>
                    </div>
                </div>}
        </>;
};
export default MainMenu;