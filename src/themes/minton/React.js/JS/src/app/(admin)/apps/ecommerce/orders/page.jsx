import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Col, Row } from "react-bootstrap";
import OrderList from "./OrderList";

// main component
const Orders = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "eCcommerce",
      path: "/apps/ecommerce/orders"
    }, {
      label: "Orders",
      path: "/apps/ecommerce/orders",
      active: true
    }]} title={"Orders"} />

      <Row>
        <Col xs={12}>
          <OrderList />
        </Col>
      </Row>
    </>;
};
export default Orders;