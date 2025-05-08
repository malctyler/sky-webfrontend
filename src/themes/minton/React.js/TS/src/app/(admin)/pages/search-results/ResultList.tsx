

import { Tab, Nav } from "react-bootstrap";

import AllResult from "./AllResult";
import Users from "./Users";

// dummy data
import { allResults, users } from "./data";
const ResultList = () => {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Nav
        as="ul"
        variant="tabs"
        className="nav nav-tabs nav-bordered"
      >
        <Nav.Item as="li">
          <Nav.Link eventKey="first" className="cursor-pointer">
            All results{" "}
            <span className="badge bg-success ms-1">325</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="second" className="cursor-pointer">
            Users <span className="badge bg-danger ms-1">89</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="first">
          <AllResult allResults={allResults} />
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          <Users users={users} />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  )
}

export default ResultList