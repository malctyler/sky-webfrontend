import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";

//helpers
import { findAllParent, findMenuItem, getMenuItemFromURL } from '@/helpers/menu';

// constants

import { Link, useLocation } from "react-router-dom";
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
  return <li className={classNames("side-nav-item", {
    "menuitem-active": open
  })}>
      <Link to="" onClick={toggleMenuItem} data-menu-key={item.key} aria-expanded={open} className={classNames("has-arrow", "side-sub-nav-link", linkClassName, {
      "menuitem-active": activeMenuItems.includes(item.key) ? "active" : ""
    })}>
        {item.icon && <i className={item.icon} />}
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
                      <MenuItemWithChildren item={child} linkClassName={activeMenuItems.includes(child.key) ? "active" : ""} activeMenuItems={activeMenuItems} subMenuClassNames="side-nav-third-level" toggleMenu={toggleMenu} />
                    </> : <>
                      {/* child */}
                      <MenuItem item={child} className={activeMenuItems.includes(child.key) ? "menuitem-active" : ""} linkClassName={activeMenuItems.includes(child.key) ? "active" : ""} />
                    </>}
                </React.Fragment>;
          })}
          </ul>
        </div>
      </Collapse>
    </li>;
};
const MenuItem = ({
  item,
  className,
  linkClassName
}) => {
  return <li className={classNames("side-nav-item", className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>;
};
const MenuItemLink = ({
  item,
  className
}) => {
  return <Link to={item.url} target={item.target} className={classNames("side-nav-link-ref", "side-sub-nav-link", className)} data-menu-key={item.key}>
      {item.icon && <i className={item.icon} />}
      {item.badge && <span className={`badge bg-${item.badge.variant} float-end`}>
          {item.badge.text}
        </span>}
      <span> {item.label} </span>
    </Link>;
};

/**
 * Renders the application menu
 */

const AppMenu = ({
  menuItems
}) => {
  const [activeMenuItems, setActiveMenuItems] = useState([]);
  const {
    pathname
  } = useLocation();
  const menuRef = useRef(null);

  /*
   * toggle the menus
   */
  const toggleMenu = (menuItem, show) => {
    if (show) setActiveMenuItems([menuItem.key, ...findAllParent(menuItems, menuItem)]);
  };

  /**
   * activate the menuitems
   */
  const activeMenu = useCallback(() => {
    const trimmedURL = pathname?.replaceAll('', '');
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL);
    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key);
      if (activeMt) {
        setActiveMenuItems([activeMt.key, ...findAllParent(menuItems, activeMt)]);
      }
      setTimeout(function () {
        const activatedItem = document.querySelector(`#sidebar-menu a[href="${trimmedURL}"]`);
        if (activatedItem) {
          const simplebarContent = document.querySelector('.left-side-menu .simplebar-content-wrapper');
          if (simplebarContent) {
            const offset = activatedItem.offsetTop - window.innerHeight * 0.4;
            scrollTo(simplebarContent, offset > 100 ? offset : 100, 600);
          }
        }
      }, 200);

      // scrollTo (Right Side Bar Active Menu)
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };
      const scrollTo = (element, to, duration) => {
        if (element) {
          const start = element.scrollTop,
            change = to - start,
            increment = 20;
          let currentTime = 0;
          const animateScroll = function () {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
              setTimeout(animateScroll, increment);
            }
          };
          animateScroll();
        }
      };
    }
  }, [location, menuItems]);
  useEffect(() => {
    activeMenu();
  }, [activeMenu]);
  return <ul className="side-menu" ref={menuRef} id="side-menu">
      {(menuItems || []).map((item, idx) => {
      return <React.Fragment key={idx}>
            {item.isTitle ? <li className={classNames("menu-title", {
          "mt-2": idx !== 0
        })}>
                {item.label}
              </li> : <>
                {item.children ? <MenuItemWithChildren item={item} toggleMenu={toggleMenu} subMenuClassNames="nav-second-level" activeMenuItems={activeMenuItems} linkClassName="side-nav-link" /> : <MenuItem item={item} linkClassName="side-nav-link" className={activeMenuItems.includes(item.key) ? "menuitem-active" : ""} />}
              </>}
          </React.Fragment>;
    })}
    </ul>;
};
export default AppMenu;