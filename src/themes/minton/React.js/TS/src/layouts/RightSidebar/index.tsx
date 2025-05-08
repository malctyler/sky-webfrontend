import React, { useRef } from "react";
import { Nav, Offcanvas, Tab } from "react-bootstrap";

// components
import Chats from "../../components/Chats";
import Tasks from "../../components/Tasks";
import ThemeCustomizer from "../../components/ThemeCustomizer";

import { useLayoutContext } from "@/context/useLayoutContext";
import SimpleBar from "simplebar-react";
import { chats, tasks } from "./data";


const RightSideBar = () => {

    const {themeCustomizer} = useLayoutContext()

    const rightBarNodeRef: any = useRef(null);

    return (
        <React.Fragment>
            <Offcanvas
                show={themeCustomizer.open}
                onHide={themeCustomizer.toggle}
                className="right-bar"
                placement="end"
            >
                <div className="h-100" ref={rightBarNodeRef}>
                    <SimpleBar style={{maxHeight: '100%', zIndex: 10000}} scrollbarMaxSize={320}>
                        <Tab.Container
                            defaultActiveKey="themecustomizer"
                        >
                            <Nav
                                variant="tabs"
                                as="ul"
                                className="nav-bordered nav-justified"
                            >
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="chats" className="py-2">
                                        <i className="mdi mdi-message-text-outline d-block font-22 my-1"/>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="tasks" className="py-2">
                                        <i className="mdi mdi-format-list-checkbox d-block font-22 my-1"/>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="themecustomizer" className="py-2">
                                        <i className="mdi mdi-cog-outline d-block font-22 my-1"/>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <Tab.Content className="pt-0">
                                <Tab.Pane eventKey="chats">
                                    <Chats chats={chats}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="tasks">
                                    <Tasks tasks={tasks}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="themecustomizer">
                                    <ThemeCustomizer/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </SimpleBar>
                </div>
            </Offcanvas>
            <div className="rightbar-overlay"></div>
        </React.Fragment>
    );
};

export default RightSideBar;
