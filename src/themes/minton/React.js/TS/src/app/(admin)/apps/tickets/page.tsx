

import Statistics from "./Statistics";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

// dummy data
import { ticketDetails } from "./data";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import ManageTickets from "./ManageTickets";


const List = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Apps", path: "/apps/tickets" },
          { label: "Tickets", path: "/apps/tickets", active: true },
        ]}
        title={"Tickets"}
      />
      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="text-center">
                <Row>
                  <Col md={6} xl={3}>
                    <Statistics
                      icon="fe-tag"
                      stats="25563"
                      desc="Total Tickets"
                    />
                  </Col>
                  <Col md={6} xl={3}>
                    <Statistics
                      icon="fe-archive"
                      textClass="text-warning"
                      stats="6952"
                      desc="Pending Tickets"
                    />
                  </Col>
                  <Col md={6} xl={3}>
                    <Statistics
                      icon="fe-shield"
                      textClass="text-success"
                      stats="18361"
                      desc="Closed Tickets"
                    />
                  </Col>
                  <Col md={6} xl={3}>
                    <Statistics
                      icon="fe-delete"
                      textClass="text-danger"
                      stats="250"
                      desc="Deleted Tickets"
                    />
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <ManageTickets ticketDetails={ticketDetails} />
        </Col>
      </Row>
    </>
  );
};

export default List;
