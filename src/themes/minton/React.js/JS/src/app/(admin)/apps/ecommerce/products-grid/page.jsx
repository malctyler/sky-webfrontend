import { Link } from "react-router-dom";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Col, Row } from "react-bootstrap";
import ProductList from "./ProductList";

// pagination
const Pagination = () => {
  return <Row>
      <Col>
        <ul className="pagination pagination-rounded justify-content-end mb-3">
          <li className="page-item">
            <Link className="page-link" to="" aria-label="Previous">
              <span aria-hidden="true">«</span>
              <span className="visually-hidden">Previous</span>
            </Link>
          </li>
          <li className="page-item active">
            <Link className="page-link" to="">
              1
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="">
              2
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="">
              3
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="">
              4
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="">
              5
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="" aria-label="Next">
              <span aria-hidden="true">»</span>
              <span className="visually-hidden">Next</span>
            </Link>
          </li>
        </ul>
      </Col>
    </Row>;
};
const ProductsGrid = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "eCommerce",
      path: "/apps/ecommerce/products-grid"
    }, {
      label: "Products Grid",
      path: "/apps/ecommerce/products-grid",
      active: true
    }]} title={"Products Grid"} />

      <ProductList />

      <Pagination />
    </>;
};
export default ProductsGrid;