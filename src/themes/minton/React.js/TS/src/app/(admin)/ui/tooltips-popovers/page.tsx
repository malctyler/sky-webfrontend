

import React from "react";
import PopoverDirection from "./PopoverDirection";
import TooltipDirection from "./TooltipsDirections";

// components
import  PageBreadcrumb from "@/components/PageBreadcrumb";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const TooltipsPopovers = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/tooltips-popovers" },
          {
            label: "Tooltips & Popovers",
            path: "/ui/tooltips-popovers",
            active: true,
          },
        ]}
        title={"Tooltips & Popovers"}
      />

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <PopoverDirection />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <TooltipDirection />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TooltipsPopovers;
