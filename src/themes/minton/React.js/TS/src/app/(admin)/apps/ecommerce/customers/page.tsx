
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Col, Row } from "react-bootstrap";
import Customer from "./CustomerList";


// main component
const Customers = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "eCommerce", path: "/apps/ecommerce/customers" },
          {
            label: "Customers",
            path: "/apps/ecommerce/customers",
            active: true,
          },
        ]}
        title={"Customers"}
      />

      <Row>
        <Col xs={12}>
          <Customer />
        </Col>
      </Row>
    </>
  );
};

export default Customers;
