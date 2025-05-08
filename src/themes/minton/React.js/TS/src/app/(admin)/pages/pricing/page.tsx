

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import PricingCard from "@/components/PricingCard";

// dummy data
import { pricingPlans } from "../data";
import { Col, Row } from "react-bootstrap";


// Pricing component
const Pricing = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Extra Pages", path: "/pages/pricing" },
          { label: "Pricing", path: "/pages/pricing", active: true },
        ]}
        title={"Pricing"}
      />

      <Row className="justify-content-center">
        <Col xs={12}>
          <div className="text-center pb-2">
            <h3 className="mb-2">
              Our <span className="text-primary">Plans</span>
            </h3>
            <p className="text-muted w-50 m-auto">
              We have plans and prices that fit your business perfectly. Make
              your client site a success with our products.
            </p>
          </div>

          {/* pricing cards */}
          <PricingCard plans={pricingPlans} containerClass={"my-3"} />
        </Col>
      </Row>
    </>
  );
};

export default Pricing;
