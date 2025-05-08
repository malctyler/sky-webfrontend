
import PageBreadcrumb from "@/components/PageBreadcrumb";

import {Col, Row} from "react-bootstrap";
import CheckOutPage from "./CheckOutPage";


const Checkout = () => {

    return (
        <>
            <PageBreadcrumb
                breadCrumbItems={[
                    {label: "Ecommerce", path: "/apps/ecommerce/checkout"},
                    {label: "Checkout", path: "/apps/ecommerce/checkout", active: true},
                ]}
                title={"Checkout"}
            />
            <Row>
                <Col lg={12}>
                    <CheckOutPage/>
                </Col>
            </Row>
        </>
    );
};

export default Checkout;
