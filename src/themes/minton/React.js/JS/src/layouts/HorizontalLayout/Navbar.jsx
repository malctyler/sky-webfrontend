import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Nav, Navbar as RBNavbar } from "react-bootstrap";
import { HORIZONTAL_MENU_ITEMS } from "@/constants/menu";
import { useAuthContext } from "@/context/useAuthContext";
import { Collapse, Container } from "react-bootstrap";

// helpers
import { getHorizontalMenuItems } from "../../helpers/menu";

// components
import AppMenu from "./Menu";

const Navbar = ({ isMenuOpened }) => {
  const { user } = useAuthContext();
  const isStaff = user?.roles?.includes('Staff') || user?.roles?.includes('Admin');

  // Filter out staff-only items for non-staff users
  const filteredMenuItems = HORIZONTAL_MENU_ITEMS.filter(item => {
    if (item.staffOnly && !isStaff) {
      return false;
    }
    if (item.children) {
      item.children = item.children.filter(child => !child.staffOnly || isStaff);
    }
    return true;
  });

  return (
    <div className="topnav">
      <div className="container-fluid">
        <nav className={classNames("navbar", "navbar-expand-lg", "topnav-menu", "navbar-light")}>
          <RBNavbar.Toggle onClick={() => setIsMenuOpened(!isMenuOpened)}>
            <i className="fe-menu"></i>
          </RBNavbar.Toggle>

          <RBNavbar.Collapse>
            <Nav as="ul">
              {(filteredMenuItems || []).map((item, index) => {
                return (
                  <NavbarItem
                    key={index}
                    item={item}
                    isStaff={isStaff}
                  />
                );
              })}
            </Nav>
          </RBNavbar.Collapse>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;