

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import GridTable from "./GridTable";

const Grid = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/grid" },
          { label: "Grid System", path: "/ui/grid", active: true },
        ]}
        title={"Grid System"}
      />

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <h4 className="header-title">Grid options</h4>
              <p className="sub-header">
                See how aspects of the Bootstrap grid system work across
                multiple devices with a handy table.
              </p>

              <GridTable />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* example */}
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-3">Grid Example</h4>

              <div className="grid-structure">
                <Row>
                  <Col lg={12}>
                    <div className="grid-container">
                      &lt;Col lg={12}&gt; - col-lg-12
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={11}>
                    <div className="grid-container">
                      &lt;Col lg={11}&gt; - col-lg-11
                    </div>
                  </Col>
                  <Col lg={1}>
                    <div className="grid-container">col-lg-1</div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={10}>
                    <div className="grid-container">
                      &lt;Col lg={10}&gt; - col-lg-10
                    </div>
                  </Col>
                  <Col lg={2}>
                    <div className="grid-container">
                      &lt;Col lg={2}&gt; - col-lg-2
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={9}>
                    <div className="grid-container">
                      &lt;Col lg={9}&gt; - col-lg-9
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="grid-container">
                      &lt;Col lg={3}&gt; - col-lg-3
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={8}>
                    <div className="grid-container">
                      &lt;Col lg={8}&gt; - col-lg-8
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="grid-container">
                      &lt;Col lg={4}&gt; - col-lg-4
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={7}>
                    <div className="grid-container">
                      &lt;Col lg={7}&gt; - col-lg-7
                    </div>
                  </Col>
                  <Col lg={5}>
                    <div className="grid-container">
                      &lt;Col lg={5}&gt; - col-lg-5
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6}>
                    <div className="grid-container">
                      &lt;Col lg={6}&gt; - col-lg-6
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="grid-container">
                      &lt;Col lg={6}&gt; - col-lg-6
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={5}>
                    <div className="grid-container">
                      &lt;Col lg={5}&gt; - col-lg-5
                    </div>
                  </Col>
                  <Col lg={7}>
                    <div className="grid-container">
                      &lt;Col lg={7}&gt; - col-lg-7
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4}>
                    <div className="grid-container">
                      &lt;Col lg={4}&gt; - col-lg-4
                    </div>
                  </Col>
                  <Col lg={8}>
                    <div className="grid-container">
                      &lt;Col lg={8}&gt; - col-lg-8
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={3}>
                    <div className="grid-container">
                      &lt;Col lg={3}&gt; - col-lg-3
                    </div>
                  </Col>
                  <Col lg={9}>
                    <div className="grid-container">
                      &lt;Col lg={9}&gt; - col-lg-9
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={2}>
                    <div className="grid-container">
                      &lt;Col lg={2}&gt; - col-lg-2
                    </div>
                  </Col>
                  <Col lg={10}>
                    <div className="grid-container">
                      &lt;Col lg={10}&gt; - col-lg-10
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={1}>
                    <div className="grid-container">col-lg-1</div>
                  </Col>
                  <Col lg={11}>
                    <div className="grid-container">
                      &lt;Col lg={11}&gt; - col-lg-11
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={2}>
                    <div className="grid-container">col-lg-2</div>
                  </Col>
                  <Col lg={3}>
                    <div className="grid-container">col-lg-3</div>
                  </Col>

                  <Col lg={4}>
                    <div className="grid-container">col-lg-4</div>
                  </Col>

                  <Col lg={2}>
                    <div className="grid-container">col-lg-2</div>
                  </Col>

                  <Col lg={1}>
                    <div className="grid-container">col-lg-1</div>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Grid;
