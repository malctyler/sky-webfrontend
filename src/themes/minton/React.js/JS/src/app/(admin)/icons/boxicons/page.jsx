import classNames from "classnames";

// component
import PageBreadcrumb from "@/components/PageBreadcrumb";

// icon data
import { REGULAR_ICONS, SOLID_ICONS, LOGO_ICONS } from "./data";
import { Card, CardBody, Col, Row } from "react-bootstrap";
const BoxIcons = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Icons",
      path: "/icons/boxicons"
    }, {
      label: "Boxicons",
      path: "/icons/boxicons",
      active: true
    }]} title={"Boxicons"} />

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <h4 className="header-title">Examples</h4>
              <p className="sub-header">
                Use class <code>&lt;i class=&quot;bx bx-**&quot;&gt;&lt;/i&gt;</code>
              </p>

              <h5>Regular</h5>

              <Row className="icons-list-demo">
                {(REGULAR_ICONS || []).map((icon, index) => {
                return <Col sm={6} lg={4} xl={3} key={index}>
                      <i className={classNames(icon.name)}></i> {icon.name}
                    </Col>;
              })}
              </Row>

              <h5 className="mt-5">Solid Icons</h5>

              <Row className="icons-list-demo">
                {(SOLID_ICONS || []).map((icon, index) => {
                return <Col sm={6} lg={4} xl={3} key={index}>
                      <i className={classNames(icon.name)}></i> {icon.name}
                    </Col>;
              })}
              </Row>

              <h5 className="mt-5">Logos</h5>

              <Row className="icons-list-demo">
                {(LOGO_ICONS || []).map((icon, index) => {
                return <Col sm={6} lg={4} xl={3} key={index}>
                      <i className={classNames(icon.name)}></i> {icon.name}
                    </Col>;
              })}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default BoxIcons;