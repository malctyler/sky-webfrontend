import { Link } from "react-router-dom";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import ProductList from "./ProductList";
const Products = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "eCommerce",
      path: "/apps/ecommerce/products"
    }, {
      label: "Products List",
      path: "/apps/ecommerce/products",
      active: true
    }]} title={"Products List"} />

      <Row>
        <Col lg={12}>
          <Card>ot
            <CardBody>
              <Row className="mb-2">
                <Col sm={6}>
                  <Link to="/apps/ecommerce/product-create" className="btn btn-danger mb-2">
                    <i className="mdi mdi-plus-circle me-1"></i> Add Products
                  </Link>
                </Col>
                <Col sm={6}>
                  <div className="float-sm-end">
                    <button className="btn btn-success mb-2 mb-sm-0">
                      <i className="mdi mdi-cog"></i>
                    </button>
                  </div>
                </Col>
              </Row>

              {/* products list */}
              <ProductList />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default Products;