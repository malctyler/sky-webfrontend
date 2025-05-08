

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";


const Starter = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Extra Pages", path: "/pages/starter" },
          { label: "Starter", path: "/pages/starter", active: true },
        ]}
        title={"Starter"}
      />
    </>
  );
};

export default Starter;
