


// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import AllDropdowns from "./AllDropdowns";
import React from "react";

const Dropdowns = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/dropdowns" },
          { label: "Dropdowns", path: "/ui/dropdowns", active: true },
        ]}
        title={"Dropdowns"}
      />

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <h4 className="header-title">Examples</h4>
              <p className="sub-header">
                Toggle contextual overlays for displaying lists of links and
                more with the Bootstrap dropdown plugin.
              </p>

              <AllDropdowns />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Dropdowns;
