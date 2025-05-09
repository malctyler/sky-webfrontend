

import { Link } from "react-router-dom";

// components
import PageBreadcrumb  from "@/components/PageBreadcrumb";

// images
import small1 from "@/assets/images/small/img-1.jpg";
import small2 from "@/assets/images/small/img-2.jpg";
import small3 from "@/assets/images/small/img-3.jpg";

import { Col, Row } from "react-bootstrap";
import React from "react";

// Timeline component
const Timeline = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Extra Pages", path: "/pages/timeline" },
          { label: "Timeline", path: "/pages/timeline", active: true },
        ]}
        title={"Timeline"}
      />

      <Row className="justify-content-center">
        <Col xs={12}>
          <div className="timeline">
            <article className="timeline-item">
              <h2 className="m-0 d-none">&nbsp;</h2>
              <div className="time-show mt-0">
                <Link to="" className="btn btn-primary width-lg">
                  Today
                </Link>
              </div>
            </article>

            <article className="timeline-item timeline-item-left">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow-alt"></span>
                  <span className="timeline-icon">
                    <i className="mdi mdi-adjust"></i>
                  </span>
                  <h4 className="mt-0 font-16">1 hour ago</h4>
                  <p className="text-muted">
                    <small>08:25 am</small>
                  </p>
                  <p className="mb-0">
                    Dolorum provident rerum aut hic quasi placeat iure tempora
                    laudantium ipsa ad debitis unde?{" "}
                  </p>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow"></span>
                  <span className="timeline-icon">
                    <i className="mdi mdi-adjust"></i>
                  </span>
                  <h4 className="mt-0 font-16">2 hours ago</h4>
                  <p className=" text-muted">
                    <small>08:25 am</small>
                  </p>
                  <p className="mb-0">
                    consectetur adipisicing elit. Iusto, optio, dolorum{" "}
                    <Link to="">John deon</Link> provident rerum aut hic quasi
                    placeat iure tempora laudantium
                  </p>
                </div>
              </div>
            </article>

            <article className="timeline-item timeline-item-left">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow-alt"></span>
                  <span className="timeline-icon">
                    <i className="mdi mdi-adjust"></i>
                  </span>
                  <h4 className="mt-0 font-16">10 hours ago</h4>
                  <p className="text-muted">
                    <small>08:25 am</small>
                  </p>
                  <p>3 new photo Uploaded on facebook fan page</p>
                  <div className="timeline-album">
                    <Link to="">
                      <img alt="" src={small1} width={54} height={36} />
                    </Link>
                    <Link to="">
                      <img alt="" src={small2} width={54} height={36} />
                    </Link>
                    <Link to="">
                      <img alt="" src={small3} width={54} height={36} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow"></span>
                  <span className="timeline-icon">
                    <i className="mdi mdi-adjust"></i>
                  </span>
                  <h4 className="mt-0 font-16">14 hours ago</h4>
                  <p className="text-muted">
                    <small>08:25 am</small>
                  </p>
                  <p className="mb-0">
                    Outdoor visit at California State Route 85 with John Boltana
                    & Harry Piterson regarding to setup a new show room.
                  </p>
                </div>
              </div>
            </article>

            <article className="timeline-item  timeline-item-left">
              <div className="timeline-desk">
                <div className="panel">
                  <div className="timeline-box">
                    <span className="arrow-alt"></span>
                    <span className="timeline-icon">
                      <i className="mdi mdi-adjust"></i>
                    </span>
                    <h4 className="mt-0 font-16">19 hours ago</h4>
                    <p className="text-muted">
                      <small>08:25 am</small>
                    </p>
                    <p className="mb-0">
                      Jonatha Smith added new milestone{" "}
                      <span>
                        <Link to="">Pathek</Link>
                      </span>{" "}
                      Lorem ipsum dolor sit amet consiquest dio
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <h2 className="m-0 d-none">&nbsp;</h2>
              <div className="time-show">
                <Link to="" className="btn btn-primary width-lg">
                  Yesterday
                </Link>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-desk">
                <div className="panel">
                  <div className="timeline-box">
                    <span className="arrow"></span>
                    <span className="timeline-icon">
                      <i className="mdi mdi-adjust"></i>
                    </span>
                    <h4 className="mt-0 font-16">07 January 2020</h4>
                    <p className="text-muted">
                      <small>08:25 am</small>
                    </p>
                    <p className="mb-0">
                      Montly Regular Medical check up at Greenland Hospital by
                      the doctor{" "}
                      <span>
                        <Link to=""> Johm meon </Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </article>
            <article className="timeline-item timeline-item-left">
              <div className="timeline-desk">
                <div className="panel">
                  <div className="timeline-box">
                    <span className="arrow-alt"></span>
                    <span className="timeline-icon">
                      <i className="mdi mdi-adjust"></i>
                    </span>
                    <h4 className="mt-0 font-16">07 January 2020</h4>
                    <p className="text-muted">
                      <small>08:25 am</small>
                    </p>
                    <p className="mb-0">
                      Download the new updates of Minton admin dashboard
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-desk">
                <div className="panel">
                  <div className="timeline-box">
                    <span className="arrow"></span>
                    <span className="timeline-icon">
                      <i className="mdi mdi-adjust"></i>
                    </span>
                    <h4 className="mt-0 font-16">07 January 2019</h4>
                    <p className="text-muted">
                      <small>08:25 am</small>
                    </p>
                    <p className="mb-0">
                      Jonatha Smith added new milestone{" "}
                      <span>
                        <Link className="blue" to="">
                          crishtian
                        </Link>
                      </span>{" "}
                      Lorem ipsum dolor sit amet consiquest dio
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <h2 className="m-0 d-none">&nbsp;</h2>
              <div className="time-show">
                <Link to="" className="btn btn-primary width-lg">
                  Last Month
                </Link>
              </div>
            </article>

            <article className="timeline-item timeline-item-left">
              <div className="timeline-desk">
                <div className="panel">
                  <div className="timeline-box">
                    <span className="arrow-alt"></span>
                    <span className="timeline-icon">
                      <i className="mdi mdi-adjust"></i>
                    </span>
                    <h4 className="mt-0 font-16">31 December 2019</h4>
                    <p className="text-muted">
                      <small>08:25 am</small>
                    </p>
                    <p className="mb-0">
                      Download the new updates of Minton admin dashboard
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-desk">
                <div className="panel">
                  <div className="timeline-box">
                    <span className="arrow"></span>
                    <span className="timeline-icon">
                      <i className="mdi mdi-adjust"></i>
                    </span>
                    <h4 className="mt-0 font-16">16 Decembar 2019</h4>
                    <p className="text-muted">
                      <small>08:25 am</small>
                    </p>
                    <p className="mb-0">
                      Jonatha Smith added new milestone{" "}
                      <span>
                        <Link to="">prank</Link>
                      </span>{" "}
                      Lorem ipsum dolor sit amet consiquest dio
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Timeline;
