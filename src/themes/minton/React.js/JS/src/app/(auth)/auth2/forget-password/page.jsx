;
import { Button } from "react-bootstrap";

// components
import { FormInput } from "@/components/Form";
import { AuthLayout2 } from "@/components";
import { Link } from "react-router-dom";

/* bottom links */
const BottomLink = () => {
  return <footer className="footer footer-alt">
            <p className="text-muted">
                Back to{" "}
                <Link to={"/auth2/login"} className="text-muted ms-1">
                    <b>Log in</b>
                </Link>
            </p>
        </footer>;
};
const ForgetPassword2 = () => {
  return <>
            <AuthLayout2 bottomLinks={<BottomLink />}>
                <h4 className="mt-0">Recover Password</h4>
                <p className="text-muted mb-4">
                    Enter your email address and we&apos;ll send you an email with instructions to reset your password.
                </p>

                <form>
                    <FormInput label="Email address" type="text" name="email" placeholder="Enter your email" containerClass={"mb-3"} />

                    <div className="text-center d-grid">
                        <Button type="submit">
                            Reset Password
                        </Button>
                    </div>
                </form>
            </AuthLayout2>
        </>;
};
export default ForgetPassword2;