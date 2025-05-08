import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md={6}>
            2015 - {new Date().getFullYear()} &copy; Minton - Coderthemes.com
          </Col>
          <Col md={6}>
            <div className="text-md-end footer-links d-none d-md-block">
              <Link to="">About</Link>
              <Link to="">Support</Link>
              <Link to="">Contact Us</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer >
  );
};

export default Footer;
