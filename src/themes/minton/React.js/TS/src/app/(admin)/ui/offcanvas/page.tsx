


// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import AllOffcanvas from "./AllOffcanvas";

const Offcanvases = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/offcanvas" },
          { label: "Offcanvas", path: "/ui/offcanvas", active: true },
        ]}
        title={"Offcanvas"}
      />

      <AllOffcanvas />
    </>
  );
};

export default Offcanvases;
