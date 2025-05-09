import classNames from "classnames";
import { useState } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";

// utils
import { splitArray } from "../../../utils/";

// apps icon
import { Link } from "react-router-dom";
import bitbucketIcon from "./icons/bitbucket.png";
import dribbbleIcon from "./icons/dribbble.png";
import dropboxIcon from "./icons/dropbox.png";
import gSuiteIcon from "./icons/g-suite.png";
import githubIcon from "./icons/github.png";
import slackIcon from "./icons/slack.png";

// get the apps
const Apps = [{
  name: "GitHub",
  icon: githubIcon,
  redirectTo: "#"
}, {
  name: "Dribbble",
  icon: dribbbleIcon,
  redirectTo: "#"
}, {
  name: "Slack",
  icon: slackIcon,
  redirectTo: "#"
}, {
  name: "G Suite",
  icon: gSuiteIcon,
  redirectTo: "#"
}, {
  name: "Bitbucket",
  icon: bitbucketIcon,
  redirectTo: "#"
}, {
  name: "Dropbox",
  icon: dropboxIcon,
  redirectTo: "#"
}];
const AppsDropdown = () => {
  const apps = Apps || [];
  const chunk_size = 3;
  const appsChunks = splitArray(apps, chunk_size);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /*
   * toggle apps-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle id="dropdown-apps" as="a" onClick={toggleDropdown} className={classNames("nav-link", "waves-effect", "waves-light", {
      show: dropdownOpen
    })}>
        <i className="fe-grid noti-icon"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-lg dropdown-menu-end p-0">
        <div className="p-2" onClick={toggleDropdown}>
          {(appsChunks || []).map((chunk, idx) => <Row className="g-0" key={idx}>
              {(chunk || []).map((item, i) => <Col key={i}>
                  <Link className="dropdown-icon-item" to={item.redirectTo}>
                    <img src={item.icon} alt="app icon" height={24} width={24} />
                    <span>{item.name}</span>
                  </Link>
                </Col>)}
            </Row>)}
        </div>
      </Dropdown.Menu>
    </Dropdown>;
};
export default AppsDropdown;