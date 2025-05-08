;
import { useEffect } from "react";
import { CardBody } from "react-bootstrap";

// images
import LogoDark from "@/assets/images/logo-dark.png";
import LogoLight from "@/assets/images/logo-light.png";
import { Link } from "react-router-dom";
const AuthLayout2 = ({
  bottomLinks,
  children
}) => {
  useEffect(() => {
    if (document.body) document.body.classList.remove("authentication-bg", "authentication-bg-pattern");
    if (document.body) document.body.classList.add("auth-fluid-pages", "pb-0");
    return () => {
      if (document.body) document.body.classList.remove("auth-fluid-pages", "pb-0");
    };
  }, []);
  return <>
      <div className="auth-fluid">
        {/* Auth fluid right content */}
        <div className="auth-fluid-right">
          <div className="auth-user-testimonial">
            <h3 className="mb-3 text-white">
              Very elegant & impressive!
            </h3>
            <p className="lead fw-normal">
              <i className="mdi mdi-format-quote-open"></i>{" "}
              I&apos;ve been using this theme for a while and I must say that whenever I am looking for a design - I refer to this theme for specifics & implementation. With wide arrays of components, designs, charts - I would highly recommend this theme for anyone using it for dashboard or project management usage..
              {" "}
              <i className="mdi mdi-format-quote-close"></i>
            </p>
            <h5 className="text-white">- Admin User</h5>
          </div>
        </div>

        {/* Auth fluid left content */}
        <div className="auth-fluid-form-box">
          <div className="align-items-center d-flex h-100">
            <CardBody>
              {/* logo */}
              <div className="auth-brand text-center text-lg-start">
                <div className="auth-logo">
                  <Link to="/" className="logo logo-dark text-center">
                    <span className="logo-lg">
                      <img src={LogoDark} alt="" height={22} width={119} />
                    </span>
                  </Link>

                  <Link to="/" className="logo logo-light text-center">
                    <span className="logo-lg">
                      <img src={LogoLight} alt="" height={22} width={119} />
                    </span>
                  </Link>
                </div>
              </div>

              {children}

              {/* footer links */}
              {bottomLinks}
            </CardBody>
          </div>
        </div>
      </div>
    </>;
};
export default AuthLayout2;