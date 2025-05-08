import { Link } from "react-router-dom";
import Counter from "@/app/(error)/coming-soon/Counter";

// images
import rocketGif from "@/assets/images/animat-rocket-color.gif";
import { Col, Container, Row } from "react-bootstrap";
const ComingSoon = () => {
  return <>
      <div className="my-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={10}>
              <div className="text-center">
                <img src={rocketGif} alt="" height={160} width={160} />

                <h3 className="mt-4">Stay tunned, we&apos;re launching very soon</h3>
                <p className="text-muted">
                  We&apos;re making the system more awesome.
                </p>

                <Row className="mt-5 justify-content-center">
                  <Col md={8}>
                    <Counter />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="footer footer-alt">
        {new Date().getFullYear()} &copy; Minton theme by{" "}
        <Link to="https://coderthemes.com/" target='_blank'>Coderthemes</Link>
      </footer>
    </>;
};
export default ComingSoon;