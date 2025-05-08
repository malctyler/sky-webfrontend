import classNames from "classnames";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

// icon data
import { FEATHERICONLIST } from "./data";
import { Card, CardBody, Col, Row } from "react-bootstrap";
const FeatherIcons = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Icons",
      path: "/icons/feather"
    }, {
      label: "Feather Icons",
      path: "/icons/feather",
      active: true
    }]} title={"Feather Icons"} />

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <Row className="icons-list-demo">
                {(FEATHERICONLIST || []).map((icon, index) => {
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
export default FeatherIcons;