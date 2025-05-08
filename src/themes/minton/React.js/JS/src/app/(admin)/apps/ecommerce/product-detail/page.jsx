import { Link } from "react-router-dom";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import Stocks from "./Stocks";
import ProductSwiper from "./ProductSwiper";
import { Rating } from "@/components";
const ProductDetail = () => {
  const product = {
    brand: "T-shirts",
    name: "Hoodie for men (Blue) ",
    reviews: "36",
    status: "Instock",
    discount: 10,
    price: 50,
    description: "If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual new common simple and regular than existing",
    rating: 4.5,
    features: ["Full Sleeve", "Cotton", "All Sizes available", "All Sizes available", "4 Different Color", "4 Different Color", "Full Sleeve"]
  };
  const discountPrice = Math.round(product.price - product.price * product.discount / 100);
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "eCommerce",
      path: "/apps/ecommerce/product-detail"
    }, {
      label: "Product Detail",
      path: "/apps/ecommerce/product-detail",
      active: true
    }]} title={"Product Detail"} />

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <Row>
                <Col lg={5}>
                  <Row className="justify-content-center">
                    <ProductSwiper />
                  </Row>
                </Col>

                <Col lg={7}>
                  <div>
                    <div>
                      <Link to="" className="text-primary">
                        {product.brand}
                      </Link>
                    </div>
                    <h4 className="mb-1">
                      {" "}
                      {product.name}
                      <Link to="" className="text-muted">
                        <i className="mdi mdi-square-edit-outline ms-2"></i>
                      </Link>
                    </h4>

                    <Rating tag="div" value={product.rating} />

                    <div className="mt-3">
                      <h6 className="text-danger text-uppercase">
                        {product.discount} % Off
                      </h6>
                      <h4 className="mb-3">
                        Price :{" "}
                        <span className="text-muted me-2">
                          <del>$ {product.price}</del>
                        </span>{" "}
                        <b>$ {discountPrice}</b>
                      </h4>
                    </div>
                    <hr />

                    <div>
                      <p>{product.description}</p>

                      <div className="mt-3">
                        <h5 className="font-size-14">Specification :</h5>
                        <Row>
                          <Col md={6}>
                            <ul className="list-unstyled product-desc-list">
                              {(product.features || []).map((item, index) => {
                              return index % 2 === 0 && <li key={index}>
                                      <i className="mdi mdi-circle-medium me-1 align-middle"></i>
                                      {item}
                                    </li>;
                            })}
                            </ul>
                          </Col>
                          <Col md={6}>
                            <ul className="list-unstyled product-desc-list">
                              {(product.features || []).map((item, index) => {
                              return index % 2 !== 0 && <li key={index}>
                                      <i className="mdi mdi-circle-medium me-1 align-middle"></i>
                                      {item}
                                    </li>;
                            })}
                            </ul>
                          </Col>
                        </Row>
                      </div>

                      <div>
                        <form className="d-flex flex-wrap align-items-center mb-3">
                          <label className="my-1 me-2" htmlFor="quantityinput">
                            Quantity
                          </label>
                          <div className="me-sm-3">
                            <select className="form-select my-1" id="quantityinput">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                            </select>
                          </div>

                          <label className="my-1 me-2" htmlFor="sizeinput">
                            Size
                          </label>
                          <div className="me-sm-3">
                            <select defaultValue="0" className="form-select my-1" id="sizeinput">
                              <option value="0">Small</option>
                              <option value="1">Medium</option>
                              <option value="2">Large</option>
                              <option value="3">X-large</option>
                            </select>
                          </div>
                        </form>

                        <div>
                          <button className="btn btn-success waves-effect waves-light">
                            <span className="btn-label">
                              <i className="mdi mdi-cart"></i>
                            </span>
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <h5 className="mt-5 mb-3">Available Stocks & Outlets</h5>
              <Stocks />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default ProductDetail;