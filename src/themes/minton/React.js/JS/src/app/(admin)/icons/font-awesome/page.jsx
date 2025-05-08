import classNames from "classnames";

// component
import PageBreadcrumb from "@/components/PageBreadcrumb";

// data
import { FAICONS_LIST } from "./data";
import { Card, CardBody, Col, Row } from "react-bootstrap";
const FontAwesomeIcons = () => {
  const solidIcons = FAICONS_LIST.data && FAICONS_LIST.data.length && FAICONS_LIST.data.filter(icon => icon.attributes.membership.free.includes("solid"));
  const regularIcons = FAICONS_LIST.data && FAICONS_LIST.data.length && FAICONS_LIST.data.filter(icon => icon.attributes.membership.free.includes("regular"));
  const brandsIcons = FAICONS_LIST.data && FAICONS_LIST.data.length && FAICONS_LIST.data.filter(icon => icon.attributes.membership.free.includes("brands"));
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Icons",
      path: "/icons/font-awesome"
    }, {
      label: "Font Awesome",
      path: "/icons/font-awesome",
      active: true
    }]} title={"Font Awesome"} />
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <h4 className="header-title">Solid</h4>
              <p className="sub-header">
                Use <code>&lt;i className=&quot;fas fa-ad&quot;&gt;&lt;/i&gt;</code>{" "}
                <span className="badge bg-success">v 5.13.0</span>.
              </p>

              <Row className="icons-list-demo" id="solid">
                {(solidIcons || []).map((icon, index) => {
                return <Col sm={6} md={4} lg={3} key={index}>
                      <i className={classNames("fas", "fa-" + icon.attributes.id)}></i>
                      fas fa-{icon.attributes.id}
                    </Col>;
              })}
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h4 className="header-title">Regular</h4>
              <p className="sub-header">
                Use{" "}
                <code>&lt;i className=&quot;far fa-address-book&quot;&gt;&lt;/i&gt;</code>{" "}
                <span className="badge bg-success">v 5.13.0</span>.
              </p>

              <Row className="icons-list-demo">
                {(regularIcons || []).map((icon, index) => {
                return <Col sm={6} md={4} lg={3} key={index}>
                      <i className={classNames("far", "fa-" + icon.attributes.id)}></i>
                      far fa-{icon.attributes.id}
                    </Col>;
              })}
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h4 className="header-title">Brands</h4>
              <p className="sub-header">
                Use <code>&lt;i className=&quot;fab fa-500px&quot;&gt;&lt;/i&gt;</code>{" "}
                <span className="badge bg-success">v 5.13.0</span>.
              </p>

              <Row className="icons-list-demo">
                {(brandsIcons || []).map((icon, index) => {
                return <Col sm={6} md={4} lg={3} key={index}>
                      <i className={classNames("fab", "fa-" + icon.attributes.id)}></i>
                      far fa-{icon.attributes.id}
                    </Col>;
              })}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default FontAwesomeIcons;