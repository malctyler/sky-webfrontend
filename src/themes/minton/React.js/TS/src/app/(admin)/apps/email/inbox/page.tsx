
import PageBreadcrumb from "@/components/PageBreadcrumb";

import EmailList from "@/app/(admin)/apps/email/inbox/EmailList";
import { Col, Row } from "react-bootstrap";

// Inbox
const Inbox = () => {

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Email", path: "/apps/email/inbox" },
          { label: "Inbox", path: "/apps/email/inbox", active: true },
        ]}
        title={"Inbox"}
      />

      <Row>
        <Col>
          <EmailList />
        </Col>
      </Row>
    </>
  );
};

export default Inbox;
