import PageBreadcrumb from "@/components/PageBreadcrumb";
import AllButtons from "./AllButtons";
import React from "react";
const Buttons = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/buttons"
    }, {
      label: "Buttons",
      path: "/ui/buttons",
      active: true
    }]} title={"Buttons"} />

      <AllButtons />
    </React.Fragment>;
};
export default Buttons;