
import { Container, Row, Col, Card, CardBody } from "react-bootstrap";

// images
import LogoDark from "@/assets/images/logo-dark.png";
import LogoLight from "@/assets/images/logo-light.png";
import { Link } from "react-router-dom";


interface AccountLayoutProps {
  helpText?: string;
  bottomLinks?: any;
  isCombineForm?: boolean;
  children?: any;
}

const AuthLayout = ({
  helpText,
  bottomLinks,
  children,
  isCombineForm,
}: AccountLayoutProps) => {
  return (
    <>
      <div className="account-pages mt-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}  className={`col-xl-${isCombineForm ? 9 : 4}`}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center w-75 m-auto">
                    <div className="auth-logo">
                      <Link to="/" className="logo logo-dark text-center">
                        <span className="logo-lg">
                          <img src={LogoDark} alt="logo" height={22} width={119} />
                        </span>
                      </Link>

                      <Link to="/" className="logo logo-light text-center">
                        <span className="logo-lg">
                          <img src={LogoLight} alt="logo" height={22} width={119} />
                        </span>
                      </Link>
                    </div>
                    {helpText && (
                      <p className="text-muted mb-4 mt-3">{helpText}</p>
                    )}
                  </div>
                  {children}
                </CardBody>
              </Card>

              {/* bottom links */}
              {bottomLinks}
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="footer footer-alt">
        {new Date().getFullYear()} &copy; Minton theme by{" "}
        <Link to="https://coderthemes.com/" className="text-dark" target="_blank">
          Coderthemes
        </Link>
      </footer>
    </>
  );
};

export default AuthLayout;
