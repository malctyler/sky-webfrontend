

import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import ShoppingDetail from "./ShoppingDetail";

const Cart = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "eCommerce", path: "/apps/ecommerce/shopping-cart" },
          {
            label: "Shopping Cart",
            path: "/apps/ecommerce/shopping-cart",
            active: true,
          },
        ]}
        title={"Shopping Cart"}
      />

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <ShoppingDetail />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
