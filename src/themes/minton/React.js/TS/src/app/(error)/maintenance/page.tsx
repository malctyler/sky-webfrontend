
import { Link } from "react-router-dom";

import classNames from "classnames";

// dummy data
import { maintenanceQuery } from "../../(admin)/pages/data";

// images
import maintenanceGif from "@/assets/images/animat-diamond-color.gif";

import { Col, Container, Row } from "react-bootstrap";

const Maintenance = () => {
  return (
    <>
      <div className="mt-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={10}>
              <div className="text-center">
                <img src={maintenanceGif} alt="" height={160} width={160} />
                <h3 className="mt-1">
                  We are currently performing maintenance
                </h3>
                <p className="text-muted">
                  We&apos;re making the system more awesome. We&apos;ll be back shortly.
                </p>

                <Row className="mt-5">
                  {(maintenanceQuery || []).map((item, index) => {
                    return (
                      <Col md={4} key={index}>
                        <div className="text-center mt-3 px-1">
                          <div className="avatar-md rounded-circle bg-soft-primary mx-auto">
                            <i
                              className={classNames(
                                item.icon,
                                "font-22",
                                "avatar-title",
                                " text-primary"
                              )}
                            ></i>
                          </div>
                          <h5 className="font-16 mt-3">{item.title}</h5>
                          <p className="text-muted">{item.desc}</p>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="footer footer-alt">
        {new Date().getFullYear()} &copy; Minton theme by{" "}
        <Link to="https://coderthemes.com/" target="_blank">Coderthemes</Link>
      </footer>
    </>
  );
};

export default Maintenance;
