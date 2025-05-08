;


import { Link } from "react-router-dom";

// components
import { AuthLayout2 } from "@/components";

import mailSent from "@/assets/images/mail-sent.png";

/* bottom link */
const BottomLink = () => {
  return (
    <footer className="footer footer-alt">
      <p className="text-muted">
        2018 - {new Date().getFullYear()} +  © Minton theme by{" "}
        <Link to="https://coderthemes.com/" className="text-muted" target="_blank">
          Coderthemes
        </Link>
      </p>
    </footer>
  );
};

const Confirm2 = () => {

  return (
    <>
      <AuthLayout2 bottomLinks={<BottomLink />}>
        <div className="text-center">
          <img src={mailSent} alt="mail" height={120} width={120} />
          <h3>Success !</h3>
          <p className="text-muted font-14 mt-2">
            A email has been send to
            <b>youremail@domain.com</b>
            Please check for an email from company and click on the included link to reset your password.

          </p>
          <Link
            to="/auth2/login"
            className="btn w-100 btn-primary waves-effect waves-light mt-3"
          >
            Back to Home{" "}
          </Link>
        </div>
      </AuthLayout2>
    </>
  );
};

export default Confirm2;
