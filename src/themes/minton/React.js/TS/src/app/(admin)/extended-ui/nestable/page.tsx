

import NestedList from "./NestedList";

// components
import PageBreadcrumb  from "@/components/PageBreadcrumb";


const NestableList = () => {

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Extended UI", path: "/extended-ui/nestable" },
          {
            label: "Nestable List",
            path: "/extended-ui/nestable",
            active: true,
          },
        ]}
        title={"Nestable List"}
      />

      <NestedList />
    </>
  );
};

export default NestableList;
