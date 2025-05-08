;
import { Button } from "react-bootstrap";


// components
import { AuthLayout2, SocialLinks } from "@/components";
import { FormInput } from "@/components/Form";
import { Link } from "react-router-dom";

/* bottom link */
const BottomLink = () => {

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                Don&apos;t have an account?{" "}
                <Link to={"/auth2/register"} className="text-muted ms-1">
                    <b>Sign Up</b>
                </Link>
            </p>
        </footer>
    );
};

const Login2 = () => {

    return (
        <AuthLayout2 bottomLinks={<BottomLink/>}>
            <h4 className="mt-0">Sign In</h4>
            <p className="text-muted mb-4">
                Enter your email address and password to access admin panel.
            </p>

            <form>
                <FormInput
                    type="email"
                    name="email"
                    label="Email address"
                    placeholder="hello@coderthemes.com"
                    containerClass={"mb-2"}
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    containerClass={"mb-2"}
                >
                    <Link to="/auth2/forget-password" className="text-muted float-end">
                        <small>Forgot your password?</small>
                    </Link>
                </FormInput>

                <FormInput
                    label="Remember me"
                    type="checkbox"
                    name="checkbox"
                    containerClass={"mb-3"}
                />

                <div className="d-grid text-center">
                    <Button type="submit">
                        Log In
                    </Button>
                </div>

                {/* social links */}
                <div className="text-center mt-4">
                    <h5 className="mt-0 text-muted">Sign in with</h5>
                    <SocialLinks/>
                </div>
            </form>
        </AuthLayout2>
    );
};

export default Login2;
