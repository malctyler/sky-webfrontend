;
import { Button, Col, Row } from "react-bootstrap";

// components
import { FormInput } from "@/components/Form";

import { AuthLayout } from "@/components";
import { Link } from "react-router-dom";

/* bottom link */
const BottomLink = () => {

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    Back to{" "}
                    <Link to={"/auth/login"} className="text-primary fw-medium ms-1">
                        Log in
                    </Link>
                </p>
            </Col>
        </Row>
    )
}

const ForgetPassword = () => {
    return (
        <>
            <AuthLayout
                helpText="Enter your email address and we'll send you an email with instructions to reset your password."
                bottomLinks={<BottomLink/>}>
                <form>
                    <FormInput
                        label="Email address"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        containerClass={"mb-3"}
                    />

                    <div className="d-grid text-center">
                        <Button type="submit">
                            Reset Password
                        </Button>
                    </div>
                </form>

            </AuthLayout>
        </>
    );
};

export default ForgetPassword;
