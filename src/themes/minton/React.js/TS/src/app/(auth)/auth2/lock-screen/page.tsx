;

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";
import * as yup from "yup";

// components
import { FormInput, VerticalForm } from "@/components/Form";

import { AuthLayout2 } from "@/components";

// images
import avatar1 from "@/assets/images/users/avatar-1.jpg";
import { Link } from "react-router-dom";


interface UserData {
  password: string;
}

/* bottom link */ 
const BottomLink = () => {

  return (
    <footer className="footer footer-alt">
      <p className="text-muted">
        Not you? return{" "}
        <Link to={"/auth2/login"} className="text-muted ms-1">
          <b>Sign In</b>
        </Link>
      </p>
    </footer>
  );
};

const LockScreen2 = () => {

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      password: yup.string().required("Please enter Password"),
    })
  );

  return (
    <>
      <AuthLayout2 bottomLinks={<BottomLink />}>
        <div className="text-center w-75 m-auto">
          <img
            src={avatar1}
            alt=""
            className="rounded-circle avatar-lg img-thumbnail"
            height={72}
            width={72}
          />
          <h4 className="text-dark-50 text-center mt-3">
            Hi ! Nik Patel
          </h4>
          <p className="text-muted mb-4">
            Enter your password to access the admin.
          </p>
        </div>

        <VerticalForm<UserData> onSubmit={() => { }} resolver={schemaResolver}>
          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            containerClass={"mb-3"}
          />

          <div className="mb-0 text-center d-grid">
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout2>
    </>
  );
};

export default LockScreen2;
