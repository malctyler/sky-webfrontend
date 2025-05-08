// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import AllModals from "./AllModals";
import React from "react";
const Modals = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/modals"
    }, {
      label: "Modals",
      path: "/ui/modals",
      active: true
    }]} title={"Modals"} />

      <AllModals />
    </React.Fragment>;
};
export default Modals;