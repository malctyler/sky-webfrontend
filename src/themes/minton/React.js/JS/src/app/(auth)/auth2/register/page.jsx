;
import { Button } from "react-bootstrap";
import { AuthLayout2, SocialLinks } from "@/components";
import { FormInput } from "@/components/Form";
import { Link } from "react-router-dom";

/* bottom link */
const BottomLink = () => {
  return <footer className="footer footer-alt">
            <p className="text-muted">
                Already have account?{" "}
                <Link to={"/auth2/login"} className="text-primary fw-medium ms-1">
                    <b>Sign In</b>
                </Link>
            </p>
        </footer>;
};
const Register2 = () => {
  return <>
            {/* {userSignUp ? <Navigate to={"/auth2/confirm"}></Navigate> : null} */}

            <AuthLayout2 bottomLinks={<BottomLink />}>
                <h4 className="mt-0">Sign Up</h4>
                <p className="text-muted mb-4">
                    Don&apos;t have an account? Create your own account, it takes less than a minute
                </p>

                <form>
                    <FormInput label="Full Name" type="text" name="fullname" placeholder="Enter your name" containerClass={"mb-2"} />
                    <FormInput label="Email address" type="email" name="email" placeholder="Enter your email" containerClass={"mb-2"} />
                    <FormInput label="Password" type="password" name="password" placeholder="Enter your password" containerClass={"mb-2"} />
                    <FormInput label="I accept Terms and Conditions" type="checkbox" name="checkboxsignup" containerClass={"mb-3 text-muted"} />

                    <div className="mb-0 d-grid text-center">
                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </div>

                    <div className="text-center mt-4">
                        <h5 className="text-muted mt-0">Sign up using</h5>
                        <SocialLinks />
                    </div>
                </form>
            </AuthLayout2>
        </>;
};
export default Register2;