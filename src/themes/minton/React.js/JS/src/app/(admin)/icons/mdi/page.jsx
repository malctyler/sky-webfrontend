// component
import PageBreadcrumb from "@/components/PageBreadcrumb";
import AllIcons from "./AllIcons";
import IconSizes from "./IconSizes";
import NewIcons from "./NewIcons";
import RotateIcons from "./RotateIcons";
import SpinIcons from "./SpinIcons";

// icon data
import { MDIICONS_LIST, ICONSIZE_LIST, ROTATEICON_LIST, SPINICON_LIST } from "./data";
import { Card, CardBody, Col, Row } from "react-bootstrap";
const MDIIcons = () => {
  const newIcons = MDIICONS_LIST && MDIICONS_LIST.filter(icon => icon.version === "5.8.55");
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Icons",
      path: "/icons/mdi"
    }, {
      label: "Material Design",
      path: "/icons/mdi",
      active: true
    }]} title={"Material Design"} />

      <Row className="icons-list-demo">
        <Col xs={12}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-4">New Icons v5.8.55</h4>
              <NewIcons icons={newIcons} />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h4 className="header-title mb-4">All Icons</h4>
              <AllIcons icons={MDIICONS_LIST} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-4">Size</h4>
              <IconSizes sizeList={ICONSIZE_LIST} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-4">Rotate</h4>
              <RotateIcons icons={ROTATEICON_LIST} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-4">Spin</h4>
              <SpinIcons icons={SPINICON_LIST} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default MDIIcons;