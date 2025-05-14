import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Nav, Navbar as RBNavbar } from "react-bootstrap";
import { HORIZONTAL_MENU_ITEMS } from "@/constants/menu";
import { useAuthContext } from "@/context/useAuthContext";
import NavbarItem from "./NavBarItem";

const Navbar = ({ isMenuOpened, setIsMenuOpened }) => {
  const { user } = useAuthContext();
  const isStaff = user?.roles?.includes('Staff') || user?.roles?.includes('Admin');
  const isCustomer = user?.isCustomer;

  // Filter menu items based on user role
  const filteredMenuItems = HORIZONTAL_MENU_ITEMS.filter(item => {
    if (item.staffOnly && !isStaff) return false;
    if (item.customerOnly && !isCustomer) return false;
    
    // For items with children, filter the children as well
    if (item.children) {
      item.children = item.children.filter(child => {
        if (child.staffOnly && !isStaff) return false;
        if (child.customerOnly && !isCustomer) return false;
        return true;
      });
      // Only include the parent if it has visible children
      if (item.children.length === 0) return false;
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
              {filteredMenuItems.map((item, index) => (
                <NavbarItem
                  key={index}
                  item={item}
                  isStaff={isStaff}
                />
              ))}
            </Nav>
          </RBNavbar.Collapse>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;