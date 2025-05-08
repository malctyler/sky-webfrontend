

import DeliveryInfo from "./DeliveryInfo";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { OrderDetailsType } from "./types";

// images
import product1 from "@/assets/images/products/product-1.png";
import product2 from "@/assets/images/products/product-6.png";
import product3 from "@/assets/images/products/product-8.png";
import { Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";
import Items from "./Items";
import OrderSummary from "./OrderSummary";
import ShippingInfo from "./ShippingInfo";
import BillingInfo from "./BillingInfo";

// order details
const OrderDetail = () => {
  const order: OrderDetailsType = {
    id: "#MN2048",
    tracking_id: "123456789",
    billing_name: "Charles Wilson",
    order_status: "Packed",
    order_date: "Apr 16 2020",
    order_time: "10:24 AM",
    items: [
      {
        id: 1,
        name: "Blue color T-shirt",
        image: product1,
        size: "Large",
        quantity: 1,
        price: "$41",
        total: "$41",
      },
      {
        id: 2,
        name: "Blue Hoodie for men",
        image: product2,
        size: "Medium",
        quantity: 2,
        price: "$45",
        total: "$90",
      },
      {
        id: 3,
        name: "Full sleeve Pink T-shirt",
        image: product3,
        size: "Large",
        quantity: 1,
        price: "$45",
        total: "$45",
      },
    ],
    sub_total: "$176",
    shipping_charge: "$24",
    tax: "$12",
    net_total: "$213",
    shipping: {
      provider: "Arnold Jackson",
      address: "707 Locust View Drive San Francisco, CA 94115",
      phone: "(123) 456-7890 ",
      mobile: "(+01) 12345 67890",
    },
    billing: {
      type: "Credit Card",
      provider: "Visa ending in 2851",
      valid: "02/2021",
    },
    delivery: {
      provider: "UPS Delivery",
      order_id: "xxxx048",
      payment_mode: "COD",
    },
  };

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "eCommerce", path: "/apps/ecommerce/order/detail" },
          {
            label: "Order Detail",
            path: "/apps/ecommerce/order/detail",
            active: true,
          },
        ]}
        title={"Order Detail"}
      />

      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <div className="border-bottom bg-transparent">
                <h5 className="header-title mb-0">Order #MN2048</h5>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                <Row>
                  <Col lg={3} sm={6}>
                    <div className="d-flex mb-2">
                      <div className="me-2 align-self-center">
                        <i className="ri-hashtag h2 m-0 text-muted"></i>
                      </div>
                      <div className="flex-1">
                        <p className="mb-1">ID No.</p>
                        <h5 className="mt-0">{order.id}</h5>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} sm={6}>
                    <div className="d-flex mb-2">
                      <div className="me-2 align-self-center">
                        <i className="ri-user-2-line h2 m-0 text-muted"></i>
                      </div>
                      <div className="flex-1">
                        <p className="mb-1">Billing Name</p>
                        <h5 className="mt-0">{order.billing_name}</h5>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} sm={6}>
                    <div className="d-flex mb-2">
                      <div className="me-2 align-self-center">
                        <i className="ri-calendar-event-line h2 m-0 text-muted"></i>
                      </div>
                      <div className="flex-1">
                        <p className="mb-1">Date</p>
                        <h5 className="mt-0">
                          Apr 16 2020{" "}
                          <small className="text-muted">10:29 PM</small>
                        </h5>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} sm={6}>
                    <div className="d-flex mb-2">
                      <div className="me-2 align-self-center">
                        <i className="ri-map-pin-time-line h2 m-0 text-muted"></i>
                      </div>
                      <div className="flex-1">
                        <p className="mb-1">Tracking ID</p>
                        <h5 className="mt-0">{order.tracking_id}</h5>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="mt-2">
                <h4 className="header-title mb-3">
                  Items from Order {order.id}
                </h4>
                <Row>
                  <Col lg={8}>
                    <Items order={order} />
                  </Col>
                  <Col lg={4}>
                    <OrderSummary order={order} />
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col lg={4}>
          <div>
            <h4 className="font-15 mb-2">Shipping Information</h4>
            <Card className="p-2 mb-lg-0">
              <ShippingInfo details={order.shipping} />
            </Card>
          </div>
        </Col>

        <Col lg={4}>
          <div>
            <h4 className="font-15 mb-2">Billing Information</h4>
            <Card className="p-2 mb-lg-0">
              <BillingInfo details={order.billing} />
            </Card>
          </div>
        </Col>

        <Col lg={4}>
          <div>
            <h4 className="font-15 mb-2">Delivery Info</h4>
            <Card className="p-2 mb-lg-0">
              <DeliveryInfo details={order.delivery} />
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetail;
