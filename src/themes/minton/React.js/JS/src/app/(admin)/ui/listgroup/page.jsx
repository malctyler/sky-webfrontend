// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import AllListGroups from "./AllListGroups";
import React from "react";
const ListGroups = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/listgroups"
    }, {
      label: "List Group",
      path: "/ui/listgroups",
      active: true
    }]} title={"List Group"} />

      <AllListGroups />
    </React.Fragment>;
};
export default ListGroups;