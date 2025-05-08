import AllTabsAndAccordions from "./AllTabsAndAccordions";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
const TabsAccordions = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/tabs-accordions"
    }, {
      label: "Tabs & Accordions",
      path: "/ui/tabs-accordions",
      active: true
    }]} title={"Tabs & Accordions"} />
      <AllTabsAndAccordions />
    </>;
};
export default TabsAccordions;