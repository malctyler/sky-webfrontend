


// components
import  PageBreadcrumb  from "@/components/PageBreadcrumb";
import AllNotifications from "./AllNotifications";
import React from "react";

const Notifications = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/toasts" },
          { label: "Notifications", path: "/ui/notifications", active: true },
        ]}
        title={"Notifications"}
      />

      {/* toasts */}
      <AllNotifications />
    </React.Fragment>
  );
};

export default Notifications;
