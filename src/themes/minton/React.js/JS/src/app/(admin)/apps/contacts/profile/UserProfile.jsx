import { Card, Nav, Tab } from "react-bootstrap";
import About from "./About";
import Settings from "./Settings";

//data
import { projectDetails } from "./data";
const UserProfile = () => {
  return <Tab.Container defaultActiveKey="about-me">
            <Card>
                <Card.Body>
                    <Nav variant="pills" as="ul" className="navtab-bg">
                        <Nav.Item as="li" className="nav-item">
                            <Nav.Link href="" eventKey="about-me" className="ms-0">
                                <i className="mdi mdi-face-profile me-1"></i>About Me
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item">
                            <Nav.Link href="" eventKey="settings">
                                <i className="mdi mdi-cog me-1"></i>Settings
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="about-me">
                            <About projectDetails={projectDetails} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="settings">
                            <Settings />
                        </Tab.Pane>
                    </Tab.Content>
                </Card.Body>
            </Card>
        </Tab.Container>;
};
export default UserProfile;