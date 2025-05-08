import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { products as data } from "../data";
const ProductBox = ({
  product
}) => {
  const rating = Math.floor(product.rating || 0);
  const emptyStars = Math.floor(rating < 5 ? 5 - rating : 0);
  return <Card className="product-box">
      <div className="product-img">
        <div className="p-3">
          <img src={product.image} alt="product" className="img-fluid" height={334} width={334} />
        </div>
        <div className="product-action">
          <div className="d-flex">
            <Link to="" className="btn btn-white d-block w-100 action-btn m-2">
              <i className="ri-edit-2-fill align-middle"></i> Edit
            </Link>
            <Link to="" className="btn btn-white d-block w-100 action-btn m-2">
              <i className="ri-delete-bin-fill align-middle"></i> Delete
            </Link>
          </div>
        </div>
      </div>

      <div className="product-info border-top p-3">
        <div>
          <h5 className="font-16 mt-0 mb-1">
            <Link to="/apps/ecommerce/product-details" className="text-dark">
              {product.product}
            </Link>
          </h5>
          <p className="text-muted">
            {(Array(rating) || []).map((_x, i) => <i key={i} className="mdi mdi-star text-warning"></i>)}
            {(Array(emptyStars) || []).map((_x, i) => <i key={i} className="mdi mdi-star"></i>)}
          </p>
          <h4 className="m-0">
            <span className="text-muted"> Price : {product.price}</span>
          </h4>
        </div>
      </div>
    </Card>;
};
const ProductList = () => {
  const [products, setProducts] = useState(data);

  /*
   * search product by name
   */
  const searchProduct = value => {
    if (value === "") setProducts(data);else {
      let modifiedProducts = data;
      modifiedProducts = modifiedProducts.filter(item => item.product.toLowerCase().includes(value));
      setProducts(modifiedProducts);
    }
  };
  return <>
      <Row className="mb-2">
        <Col sm={4}>
          <Link to="/apps/ecommerce/product-create" className="btn btn-danger mb-2">
            <i className="mdi mdi-plus-circle me-1"></i> Add Products
          </Link>
        </Col>
        <Col sm={8}>
          <div className="float-sm-end">
            <form className="d-flex align-items-center flex-wrap">
              <div className="me-2">
                <label htmlFor="productssearch-input" className="visually-hidden">
                  Search
                </label>
                <input type="search" className="form-control border-light" id="productssearch-input" placeholder="Search..." onChange={e => searchProduct(e.target.value)} />
              </div>
              <Button variant="success" className="mb-2 mb-sm-0">
                <i className="mdi mdi-cog"></i>
              </Button>
            </form>
          </div>
        </Col>
      </Row>

      <Row>
        {(products.slice(0, 8) || []).map((product, index) => {
        return <Col md={6} xl={3} key={index}>
              <ProductBox product={product} />
            </Col>;
      })}
      </Row>
    </>;
};
export default ProductList;