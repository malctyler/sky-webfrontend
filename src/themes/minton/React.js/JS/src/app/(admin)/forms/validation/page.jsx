import React from "react";
import AllFormValidation from "./AllFormValidation";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
const FormValidation = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Forms",
      path: "/forms/validation"
    }, {
      label: "Form Validation",
      path: "/forms/validation",
      active: true
    }]} title={"Form Validation"} />

      <AllFormValidation />
    </React.Fragment>;
};
export default FormValidation;