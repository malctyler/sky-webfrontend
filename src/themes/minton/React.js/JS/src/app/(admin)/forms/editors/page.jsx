// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SimpleEditor from "@/app/(admin)/forms/editors/SimpleEditor";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import React from "react";
const Editors = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Forms",
      path: "/forms/editors"
    }, {
      label: "Editors",
      path: "/forms/editors",
      active: true
    }]} title={"Editors"} />

      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title">SimpleMDE</h4>
              <p className="sub-header">
                {" "}
                SimpleMDE is a light-weight, simple, embeddable, and beautiful
                JS markdown editor
              </p>

              <SimpleEditor />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>;
};
export default Editors;