

import classNames from "classnames";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import React from "react";

interface RibbonProps {
  label: string;
  color: string;
  direction?: string;
}

const Ribbon1 = ({ label, color, direction }: RibbonProps) => {
  return (
    <Card className="ribbon-box">
      <CardBody>
        <div
          className={classNames(
            "ribbon",
            "ribbon-" + color,
            direction === "left" ? "float-start" : "float-end"
          )}
        >
          <i className="mdi mdi-access-point me-1"></i> {label}
        </div>
        <h5
          className={classNames(
            "text-" + color,
            "mt-0",
            direction === "left" ? "float-end" : "float-start"
          )}
        >
          {label} Header
        </h5>
        <div className="ribbon-content">
          <p className="mb-0">
            Quisque nec turpis at urna dictum luctus. Suspendisse convallis
            dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
            dictum aliquet. Nulla sapien mauris, eleifend et sem ac, commodo
            dapibus odio.
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

const Ribbon2 = ({ label, color }: RibbonProps) => {
  return (
    <Card className="ribbon-box">
      <CardBody>
        <div className={classNames("ribbon-two", "ribbon-two-" + color)}>
          <span>{label}</span>
        </div>
        <p className="mb-0">
          Quisque nec turpis at urna dictum luctus. Suspendisse convallis
          dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
          dictum aliquet. Nulla sapien mauris, eleifend et sem ac, commodo
          dapibus odio. Vivamus pretium nec odio cursus elementum. Suspendisse
          molestie ullamcorper ornare.
        </p>
      </CardBody>
    </Card>
  );
};

const Ribbon3 = ({ label, color, direction }: RibbonProps) => {
  return (
    <Card className="ribbon-box">
      <CardBody>
        <div
          className={classNames(
            "ribbon",
            "ribbon-shape",
            "ribbon-" + color,
            direction === "left" ? "float-start" : "float-end"
          )}
        >
          {label}
        </div>
        <h5
          className={classNames(
            "text-" + color,
            "mt-0",
            direction === "left" ? "float-end" : "float-start"
          )}
        >
          {label} Header
        </h5>

        <div className="ribbon-content">
          <p className="mb-0">
            Quisque nec turpis at urna dictum luctus. Suspendisse convallis
            dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
            dictum aliquet. Nulla sapien mauris, eleifend et sem ac, commodo
            dapibus odio.
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

const Ribbons = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/ribbons" },
          { label: "Ribbons", path: "/ui/ribbons", active: true },
        ]}
        title={"Ribbons"}
      />

      <Row>
        <Col lg={4}>
          <Ribbon1 label="Purple" color="purple" direction="left" />
        </Col>
        <Col lg={4}>
          <Ribbon1 label="Primary" color="primary" direction="right" />
        </Col>
        <Col lg={4}>
          <Ribbon1 label="Success" color="success" direction="right" />
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <Ribbon1 label="Info" color="info" direction="left" />
        </Col>
        <Col lg={4}>
          <Ribbon1 label="Warning" color="warning" direction="right" />
        </Col>
        <Col lg={4}>
          <Ribbon1 label="Danger" color="danger" direction="right" />
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <Ribbon3 label="Pink" color="pink" direction="left" />
        </Col>
        <Col lg={4}>
          <Ribbon3 label="Secondary" color="secondary" direction="right" />
        </Col>
        <Col lg={4}>
          <Ribbon3 label="Dark" color="dark" direction="right" />
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <Ribbon2 label="Secondary" color="secondary" />
        </Col>
        <Col lg={4}>
          <Ribbon2 label="Primary" color="primary" />
        </Col>
        <Col lg={4}>
          <Ribbon2 label="Success" color="success" />
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <Ribbon2 label="Info" color="info" />
        </Col>
        <Col lg={4}>
          <Ribbon2 label="Warning" color="warning" />
        </Col>
        <Col lg={4}>
          <Ribbon2 label="Danger" color="danger" />
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <Ribbon2 label="Pink" color="pink" />
        </Col>
        <Col lg={4}>
          <Ribbon2 label="Purple" color="purple" />
        </Col>
        <Col lg={4}>
          <Ribbon2 label="Dark" color="dark" />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Ribbons;
