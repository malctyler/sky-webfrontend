;
import { AuthLayout } from "@/components";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const LogoutIcon = () => {
  return <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 161.2 161.2" enableBackground="new 0 0 161.2 161.2"> <path className="logout-path" fill="none" stroke="#d1dee4" strokeMiterlimit="10" d="M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4 c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5 c0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z"></path> <circle className="logout-path" fill="none" stroke="#1abc9c" strokeWidth="4" strokeMiterlimit="10" cx="80.6" cy="80.6" r="62.1"></circle> <polyline className="logout-path" fill="none" stroke="#1abc9c" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="113,52.8 74.1,108.4 48.2,86.4 "></polyline> <circle className="logout-spin" fill="none" stroke="#d1dee4" strokeWidth="4" strokeMiterlimit="10" strokeDasharray="12.2175,12.2175" cx="80.6" cy="80.6" r="73.9"></circle> </svg>;
};

/* bottom link */
const BottomLink = () => {
  return <Row className="mt-3">
            <Col xs={12} className=" text-center">
                <p className="text-muted">
                    Back to{" "}
                    <Link to={"/auth/login"} className="text-primary fw-medium ms-1">
                        Sign In
                    </Link>
                </p>
            </Col>
        </Row>;
};
const Logout = () => {
  return <AuthLayout bottomLinks={<BottomLink />}>
            <div className="text-center">
                <div className="mt-4">
                    <div className="logout-checkmark">
                        <LogoutIcon />
                    </div>
                </div>

                <h3>See you again !</h3>

                <p className="text-muted">
                    {" "}
                    You are now successfully sign out.{" "}
                </p>
            </div>
        </AuthLayout>;
};
export default Logout;