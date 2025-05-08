


// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import AllProgressBars from "./AllProgressBars";
import React from "react";

const ProgressBarExamples = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/progressBar" },
          { label: "Progress", path: "/ui/progressBar", active: true },
        ]}
        title={"Progress"}
      />
      <AllProgressBars />
    </React.Fragment>
  );
};

export default ProgressBarExamples;
