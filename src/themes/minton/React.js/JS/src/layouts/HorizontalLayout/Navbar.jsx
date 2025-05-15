import { Collapse, Container } from "react-bootstrap";
import classNames from "classnames";

// helpers
import { getHorizontalMenuItems } from "../../helpers/menu";

// components
import AppMenu from "./Menu";
import React from "react";
const Navbar = ({
  isMenuOpened
}) => {
  // change the inputTheme value to light for creative theme
  const inputTheme = "light";
  return <React.Fragment>
      <div className="topnav">
        <Container fluid>
          <nav className={classNames("navbar", "navbar-expand-lg", "topnav-menu", "navbar-" + inputTheme)}>
            <Collapse in={isMenuOpened} className="navbar-collapse">
              <div id="topnav-menu-content">
                <AppMenu menuItems={getHorizontalMenuItems()} />
              </div>
            </Collapse>
          </nav>
        </Container>
      </div>
    </React.Fragment>;
};
export default Navbar;