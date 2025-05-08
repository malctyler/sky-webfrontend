// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Col, Row } from "react-bootstrap";
import ReadEmail from "./ReadEmail";
const EmailDetail = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Email",
      path: "/apps/email/details"
    }, {
      label: "Email Read",
      path: "/apps/email/details",
      active: true
    }]} title={"Email Read"} />

      <Row>
        <Col>
          <ReadEmail />
        </Col>
      </Row>
    </>;
};
export default EmailDetail;