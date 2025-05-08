;
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row } from "react-bootstrap";
import * as yup from "yup";

import { AuthLayout, SocialLinks } from "@/components";
import { FormInput } from "@/components/Form";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

/* bottom links */
const BottomLink = () => {
    return (
        <Row className="mt-3">
            <Col xs={12} className="text-center">
                <p className="text-muted">
                    Already have account?{" "}
                    <Link to={"/auth/login"} className="text-primary fw--medium ms-1">
                        Sign In
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Register = () => {

    const signUpFormSchema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required("Please enter your email"),
        password: yup.string().required("Please enter your password"),
        confirmPassword: yup
            .string()
            .oneOf(
                [yup.ref("password")],
                "Password and confirm password doesn't match"
            ),
    });

    const {control, handleSubmit} = useForm({
        resolver: yupResolver(signUpFormSchema),
    });

    return (
        <>
            <AuthLayout
                helpText={"Don't have an account? Create your own account, it takes less than a minute"}
                bottomLinks={<BottomLink/>}
            >

                <form onSubmit={handleSubmit(() => {
                })}>
                    <FormInput
                        label='Full Name'
                        type="text"
                        name="fullname"
                        placeholder='Enter your name'
                        containerClass={"mb-2"}
                        control={control}
                    />
                    <FormInput
                        label='Email address'
                        type="email"
                        name="email"
                        placeholder='Enter your email'
                        containerClass={"mb-2"}
                        control={control}
                    />
                    <FormInput
                        label='Password'
                        type="password"
                        name="password"
                        placeholder='Enter your password'
                        containerClass={"mb-2"}
                        control={control}
                    />
                    <FormInput
                        label='I accept Terms and Conditions'
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={"mb-3"}
                        control={control}
                    />

                    <div className="text-center d-grid">
                        <Button type="submit">
                            Sign Up
                        </Button>
                    </div>
                </form>

                <div className="text-center">
                    <h5 className="mt-3 text-muted">Sign Up using</h5>
                    <SocialLinks/>
                </div>
            </AuthLayout>
        </>
    );
};

export default Register;
