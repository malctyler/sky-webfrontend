import Spinner from "@/components/Spinner";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import ButtonSpinners from "./ButtonSpinners";
import React from "react";
const colors = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "blue", "pink"];
const BorderedSpinners = () => {
  return <Card>
      <CardBody>
        <h4 className="header-title">Border spinner</h4>
        <p className="sub-header">
          Use the border spinners for a lightweight loading indicator.
        </p>
        <Spinner type="bordered" className="m-2" color="primary" />
      </CardBody>
    </Card>;
};
const GrowingSpinners = () => {
  return <Card>
      <CardBody>
        <h4 className="header-title">Growing spinner</h4>
        <p className="sub-header">
          If you don’t fancy a border spinner, switch to the grow spinner. While
          it doesn’t technically spin, it does repeatedly grow!
        </p>
        <Spinner type="grow" color="success" />
      </CardBody>
    </Card>;
};
const Colors = () => {
  return <Card>
      <CardBody>
        <h4 className="header-title">Colors</h4>
        <p className="sub-header">
          All standard visual variants are available for both animation styles
          by setting the <code>variant</code> property.
        </p>

        {(colors || []).map((color, index) => {
        return <Spinner key={index} type="bordered" className="m-2" color={color} />;
      })}
      </CardBody>
    </Card>;
};
const ColorGrowingSpinners = () => {
  return <Card>
      <CardBody>
        <h4 className="header-title">Color Growing spinner</h4>
        <p className="sub-header">
          Here it is in blue, along with the supported variants.
        </p>
        {(colors || []).map((color, index) => {
        return <Spinner key={index} className="m-2" type="grow" color={color} />;
      })}
      </CardBody>
    </Card>;
};
const AlignmentSpinners = () => {
  return <>
      <Card>
        <CardBody>
          <h4 className="header-title">Alignment</h4>
          <p className="sub-header">
            Use flexbox utilities, float utilities, or text alignment utilities
            to place spinners exactly where you need them in any situation.
          </p>
          <div className="d-flex justify-content-center">
            <Spinner type="bordered" />
          </div>
        </CardBody>
      </Card>
    </>;
};
const SpinnerPlacements = () => {
  return <>
      <Card>
        <CardBody>
          <h4 className="header-title">Placement</h4>
          <p className="sub-header">
            Use <code>flexbox utilities</code>, <code>float utilities</code>, or{" "}
            <code>text alignment</code> utilities to place spinners exactly
            where you need them in any situation.
          </p>
          <div className="d-flex align-items-center">
            <strong>Loading...</strong>
            <Spinner type="bordered" className="ms-auto" />
          </div>
        </CardBody>
      </Card>
    </>;
};
const SpinnersSizes = () => {
  const sizes = ["lg", "md", "sm"];
  return <Card>
      <CardBody>
        <h4 className="header-title">Size</h4>
        <p className="sub-header">
          Add <code>size</code> attribute to make spinner with sizes including
          lg, md or sm.
        </p>
        <Row>
          {(sizes || []).map((size, index) => {
          return <Col lg={6} key={index}>
                <Spinner type="bordered" className="text-primary m-2" color="primary" size={size} />
                <Spinner className="text-secondary m-2" type="grow" size={size} />
              </Col>;
        })}
          <Col lg={6}>
            <Spinner type="bordered" className="spinner-border-sm m-2" />
            <Spinner type="grow" className="spinner-grow-sm m-2" />
          </Col>
        </Row>
      </CardBody>
    </Card>;
};
const Spinners = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/spinners"
    }, {
      label: "Spinners",
      path: "/ui/spinners",
      active: true
    }]} title={"Spinners"} />

      <Row>
        <Col lg={6}>
          <BorderedSpinners />
        </Col>
        <Col lg={6}>
          <GrowingSpinners />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Colors />
        </Col>

        <Col lg={6}>
          <ColorGrowingSpinners />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <AlignmentSpinners />
        </Col>
        <Col lg={6}>
          <SpinnerPlacements />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <SpinnersSizes />
        </Col>
        <Col lg={6}>
          <ButtonSpinners />
        </Col>
      </Row>
    </React.Fragment>;
};
export default Spinners;