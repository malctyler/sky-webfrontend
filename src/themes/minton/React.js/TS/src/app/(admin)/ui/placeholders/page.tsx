


// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import AllPlaceholders from "./AllPlaceholders";

const Placeholders = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/placeholders" },
          { label: "Placeholders", path: "/ui/placeholders", active: true },
        ]}
        title={"Placeholders"}
      />
      <AllPlaceholders />
    </>
  );
};

export default Placeholders;
