import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useWizard, Wizard } from 'react-use-wizard';
import Billing from "./Billing";
import Shipping from "./Shipping";
import Payment from "./Payment";

// images
import product1 from "@/assets/images/products/product-1.png";
import product2 from "@/assets/images/products/product-6.png";
import product3 from "@/assets/images/products/product-8.png";
import Summary from "./Summary";
const Header = () => {
  const {
    goToStep,
    activeStep
  } = useWizard();
  return <ul className="nav-justified twitter-bs-wizard-nav mb-2 nav nav-pills" role="tablist">
            <li className="nav-item" role="presentation">
                <button onClick={() => goToStep(0)} type="button" className={`nav-link ${activeStep === 0 && 'active'}`}><span className="number">01</span><span className="d-none d-sm-inline">Billing Info</span></button>
            </li>
            <li className="nav-item" role="presentation">
                <button onClick={() => goToStep(1)} type="button" className={`nav-link ${activeStep === 1 && 'active'}`}><span className="number">02</span><span className="d-none d-sm-inline">Shipping Info</span></button>
            </li>
            <li className="nav-item" role="presentation">
                <button onClick={() => goToStep(2)} type="button" className={`nav-link ${activeStep === 2 && 'active'}`}><span className="number">03</span><span className="d-none d-sm-inline">Payment Info</span></button>
            </li>
        </ul>;
};
const Step1 = () => {
  const {
    nextStep
  } = useWizard();
  return <>
            <Billing />

            <ul className="pager wizard list-inline mt-2">
                <li className="list-inline-item">
                    <Link to="/apps/ecommerce/shopping-cart" className="btn btn-secondary">
                        <i className="mdi mdi-arrow-left"></i>{" "}
                        Back to Shopping Cart
                    </Link>
                </li>
                <li className="next list-inline-item float-end">
                    <Button onClick={nextStep} variant="success">
                        <i className="mdi mdi-truck-fast me-1"></i>{" "}
                        Proceed to Shipping
                    </Button>
                </li>
            </ul>
        </>;
};
const Step2 = ({
  updateShipping
}) => {
  return <>
            <Shipping updateShipping={updateShipping} />

            <ul className="pager wizard list-inline mt-3">
                <li className="previous list-inline-item">
                    <Button variant="secondary">
                        <i className="mdi mdi-arrow-left me-1"></i>{" "}
                        Back to Billing
                    </Button>
                </li>
                <li className="next list-inline-item float-end">
                    <Button variant="success">
                        <i className="mdi mdi-cash-multiple me-1"></i>{" "}
                        Continue to Payment
                    </Button>
                </li>
            </ul>
        </>;
};
const Step3 = () => {
  const {
    previousStep
  } = useWizard();
  return <>
            <Payment />
            <ul className="pager wizard list-inline mt-3">
                <li className="list-inline-item">
                    <Button onClick={previousStep} variant="secondary">
                        <i className="mdi mdi-arrow-left me-1"></i>
                        Back to Shopping Cart
                    </Button>
                </li>
                <li className="next list-inline-item float-end">
                    <Button variant="success">
                        <i className="mdi mdi-cash-multiple me-1"></i>{" "}
                        Complete Order
                    </Button>
                </li>
            </ul>
        </>;
};
const CheckOutPage = () => {
  const [cart, setCart] = useState({
    items: [{
      id: 1,
      image: product1,
      name: "Blue color T-shirt",
      size: "Large",
      color: "Light Green",
      price: 41,
      qty: 1,
      total: 41
    }, {
      id: 2,
      image: product2,
      name: "Blue Hoodie for men",
      size: "Medium",
      color: "Light pink",
      price: 45,
      qty: 2,
      total: 90
    }, {
      id: 3,
      image: product3,
      name: "Full sleeve Pink T-shirt",
      size: "Large",
      color: "Green",
      price: 45,
      qty: 1,
      total: 45
    }],
    sub_total: 176,
    shipping: 0,
    total: 176
  });

  /**
   * Update the shipping cost
   */
  const updateShipping = shippingCost => {
    const localCart = {
      ...cart
    };
    localCart["shipping"] = shippingCost;
    localCart["total"] = localCart["sub_total"] + shippingCost;
    setCart(localCart);
  };
  return <Card>
            <Card.Body>
                <Row>
                    <Col lg={8}>
                        <div id="checkout-nav-pills-wizard" className="twitter-bs-wizard form-wizard-header">
                            <Wizard header={<Header />}>
                                <Step1 />
                                <Step2 updateShipping={updateShipping} />
                                <Step3 />
                            </Wizard>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Summary cart={cart} />
                    </Col>
                </Row>
            </Card.Body>
        </Card>;
};
export default CheckOutPage;