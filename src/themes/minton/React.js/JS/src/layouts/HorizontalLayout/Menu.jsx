import React, { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames";

// helpers
import { findAllParent, findMenuItem, getMenuItemFromURL } from "@/helpers/menu";

// constants

// utils
import { splitArray } from "@/utils";

// custom hook
import { useViewport } from "../../hooks";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
const MenuItemWithChildren = ({
  item,
  tag,
  linkClassName,
  className,
  subMenuClassNames,
  activeMenuItems,
  toggleMenu
}) => {
  const Tag = tag;
  const {
    width
  } = useViewport();
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));
  const showMenu = width <= 768 && open;
  const hasChild = item.children && (item.children || []).filter(child => child.children?.length && child.children);
  const hasGrandChild = !(hasChild.length > 0 && hasChild) && item.children.length >= 15;
  const chunks = hasGrandChild ? splitArray(item.children, 7) : [];
  useEffect(() => {
    setOpen(activeMenuItems.includes(item.key));
  }, [activeMenuItems, item]);

  /**
   * toggles the menu
   */
  const toggleMenuItem = e => {
    e.preventDefault();
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };
  return <Tag className={classNames("dropdown", className, activeMenuItems.includes(item.key) ? "active" : "")}>
      <Link to="/#" onClick={toggleMenuItem} data-menu-key={item.key} className={classNames("dropdown-toggle", linkClassName, {
      active: activeMenuItems.includes(item.key)
    })} id={item.key} role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded={open}>
        {item.icon && <i className={classNames(item.icon, "me-1")} />}
        <span> {item.label} </span>
        <div className="arrow-down"></div>
      </Link>

      {item.children && (hasGrandChild ? <div className={classNames(subMenuClassNames, "mega-dropdown-menu dropdown-mega-menu-xl", {
      show: showMenu
    })} aria-labelledby={item.key}>
            <Row>
              {(chunks || []).map((child, i) => {
          return <Col lg={4} key={i}>
                    <MegaMenu item={child} activeMenuItems={activeMenuItems} />
                  </Col>;
        })}
            </Row>
          </div> : <div className={classNames(subMenuClassNames, {
      show: showMenu
    })} aria-labelledby={item.key}>
            {(item.children || []).map((child, i) => {
        return <React.Fragment key={i}>
                  {child.children ? <>
                      {/* parent */}
                      <MenuItemWithChildren item={child} tag="div" linkClassName={classNames("dropdown-item", activeMenuItems.includes(child.key) ? "active" : "")} activeMenuItems={activeMenuItems} className="" subMenuClassNames="dropdown-menu" toggleMenu={toggleMenu} />
                    </> : <>
                      {/* child */}
                      <MenuItemLink item={child} className={classNames("dropdown-item", {
              active: activeMenuItems.includes(child.key)
            })} />
                    </>}
                </React.Fragment>;
      })}
          </div>)}
    </Tag>;
};
const MenuItem = ({
  item,
  className,
  linkClassName
}) => {
  return <li className={classNames("nav-item", className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>;
};
const MenuItemLink = ({
  item,
  className
}) => {
  return <Link to={item.url} target={item.target} className={classNames(className)} data-menu-key={item.key}>
      {item.icon && <i className={classNames(item.icon, "me-1")} />}
      <span> {item.label} </span>
    </Link>;
};
const MegaMenu = ({
  item,
  activeMenuItems
}) => {
  return <>
      {item.map((child, i) => {
      return <MenuItemLink key={i} item={child} className={classNames("dropdown-item", {
        active: activeMenuItems.includes(child.key)
      })} />;
    })}
    </>;
};

/**
 * Renders the application menu
 */

const AppMenu = ({
  menuItems
}) => {
  const menuRef = useRef(null);
  const [topnavMenuItems] = useState(menuItems);
  const [activeMenuItems, setActiveMenuItems] = useState([]);

  /*
   * toggle the menus
   */
  const toggleMenu = (menuItem, show) => {
    if (show) setActiveMenuItems([menuItem["key"], ...findAllParent(topnavMenuItems, menuItem)]);
  };

  /**
   * activate the menuitems
   */
  const activeMenu = useCallback(() => {
    const trimmedURL = location.pathname?.replaceAll('', '');
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
  }, [location.pathname, menuItems]);
  useEffect(() => {
    activeMenu();
  }, [activeMenu]);
  return <>
      <ul className="navbar-nav" ref={menuRef} id="main-side-menu">
        {(topnavMenuItems || []).map((item, idx) => {
        return <React.Fragment key={idx}>
              {item.children ? <MenuItemWithChildren item={item} tag="li" className="nav-item" subMenuClassNames="dropdown-menu" activeMenuItems={activeMenuItems} linkClassName="nav-link" toggleMenu={toggleMenu} /> : <MenuItem item={item} linkClassName={classNames("nav-link", "dropdown-toggle", {
            active: activeMenuItems.includes(item.key)
          })} />}
            </React.Fragment>;
      })}
      </ul>
    </>;
};
export default AppMenu;