
import CalendarPage from "./CalendarPage";
import {PageBreadcrumb} from "@/components";
import {Card, Col, Row,CardBody} from "react-bootstrap";

const CalendarApp = () => {

    return (
        <>
            <PageBreadcrumb
                breadCrumbItems={[
                    {label: "Apps", path: "/apps/calendar"},
                    {label: "Calendar", path: "/apps/calendar", active: true},
                ]}
                title={"Calendar"}
            />

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Row>
                                <CalendarPage/>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </>
    );
};

export default CalendarApp;
