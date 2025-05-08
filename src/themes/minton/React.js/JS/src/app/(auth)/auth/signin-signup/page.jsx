;
import { Button, Col, Row } from "react-bootstrap";

// components
import { FormInput } from "@/components/Form";
import { AuthLayout } from "@/components";
import { Link } from "react-router-dom";
const SignInSignUp = () => {
  return <>
            <AuthLayout isCombineForm={true}>
                <Row className="mt-4">
                    <Col lg={6}>
                        <div className="p-sm-3">
                            <h4 className="mt-0">Sign In</h4>
                            <p className="text-muted mb-4">
                                Enter your email address and password to access account.
                            </p>

                            <form>
                                <FormInput type="email" name="email" label="Email address" placeholder="hello@coderthemes.com" containerClass={"mb-3"} />
                                <FormInput label="Password" type="password" name="loginpassword" placeholder="Enter your password" containerClass={"mb-3"}>
                                    <Link to="/auth/forget-password" className="text-muted float-end">
                                        <small>Forgot your password?</small>
                                    </Link>
                                </FormInput>

                                <div className="mb-3">
                                    <Button variant="primary" type="submit" className="btn btn-primary float-sm-end">
                                        Log In
                                    </Button>
                                    <FormInput label="Remember me" type="checkbox" name="checkbox" />
                                </div>
                            </form>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className="p-sm-3">
                            <h4 className="mt-0">Free Sign Up</h4>
                            <p className="text-muted mb-4">
                                Don&apos;t have an account? Create your account, it takes less than a minute
                            </p>

                            <form>
                                <FormInput label="Full Name" type="text" name="fullname" placeholder="Enter your name" containerClass={"mb-3"} />
                                <FormInput label="Email address" type="email" name="email2" placeholder="Enter your email" containerClass={"mb-3"} />
                                <FormInput label="Password" type="password" name="password" placeholder="Enter your password" containerClass={"mb-3"} />

                                <div className="mb-0">
                                    <Button variant="success" type="submit" className="btn btn-success float-sm-end">
                                        Sign Up
                                    </Button>
                                    <FormInput label="I accept Terms and Conditions" type="checkbox" name="checkboxsignup" containerClass={"pt-1"} />
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </AuthLayout>
        </>;
};
export default SignInSignUp;