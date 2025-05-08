import { useState } from "react";
import { Alert } from "react-bootstrap";
const DismissableAlert = () => {
  const [showAlert, setShowAlert] = useState(true);
  return <Alert show={showAlert} variant="info" className="mb-3" onClose={() => setShowAlert(false)} dismissible>
      Property MN7xx is not receiving hits. Either your site is not
      receiving any sessions.
    </Alert>;
};
export default DismissableAlert;