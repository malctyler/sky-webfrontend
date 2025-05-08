;
import { AuthLayout, SocialLinks } from "@/components";
import { FormInput } from "@/components/Form";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSignIn from "./useSignIn";

/* bottom links */
const BottomLink = () => {
  return <Row className="mt-3">
            <Col xs={12} className="text-center">
                <p className="text-muted">
                    <Link to="/auth/forget-password" className="text-muted ms-1">
                        Forgot your password?
                    </Link>
                </p>
                <p className="text-muted">
                    Don&apos;t have an account?
                    <Link to="/auth/register" className="text-primary fw-bold ms-1">
                        Sign Up
                    </Link>
                </p>
            </Col>
        </Row>;
};
const Login = () => {
  const {
    loading,
    login,
    control
  } = useSignIn();
  return <AuthLayout helpText="Enter your email address and password to access admin panel." bottomLinks={<BottomLink />}>
            <form onSubmit={login}>
                <FormInput type="email" name="email" label="Email address" containerClass={"mb-2"} control={control} defaultValue="user@demo.com" />
                <FormInput label="Password" type="password" name="password" containerClass={"mb-2"} control={control} defaultValue="123456"></FormInput>

                <FormInput type="checkbox" name="checkbox" label="Remember me" containerClass={"mb-3"} defaultChecked control={control} />

                <div className="text-center d-grid">
                    <Button variant="primary" type="submit" disabled={loading}>
                        Log In
                    </Button>
                </div>
            </form>
            <div className="text-center">
                <h5 className="mt-3 text-muted">Sign in with</h5>
                <SocialLinks />
            </div>
        </AuthLayout>;
};
export default Login;