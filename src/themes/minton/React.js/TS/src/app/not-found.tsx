;
import React from 'react'

// images
import ghostSvg from "@/assets/images/error.svg";
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <React.Fragment>
      <div className="account-pages my-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}  xl={4}>
              <Card>
                <CardBody className="p-4">
                  <div className="error-ghost text-center">
                    <img src={ghostSvg} width={200} height={109} alt="" />
                  </div>

                  <div className="text-center">
                    <h3 className="mt-4 text-uppercase fw-bold">
                      Page not found{" "}
                    </h3>
                    <p
                      className="text-muted mb-0 mt-3"
                      style={{ lineHeight: "20px" }}
                    >
                      It&apos;s looking like you may have taken a wrong turn. Don&apos;t
                      worry... it happens to the best of us. You might want to
                      check your internet connection. Here&apos;s a little tip that
                      might help you get back on track.
                    </p>

                    <Link to="/" className="btn btn-primary mt-3">
                      <i className="mdi mdi-reply me-1"></i> Return Home
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="footer footer-alt">
        {new Date().getFullYear()} &copy; Minton theme by{" "}
        <Link to="https://coderthemes.com/" target='_blank'>Coderthemes</Link>
      </footer>
    </React.Fragment>
  )
}

export default NotFound