// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import AllGeneralUi from "./AllGeneralUi";
const GeneralUI = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/general"
    }, {
      label: "General UI",
      path: "/ui/general",
      active: true
    }]} title={"General UI"} />
      <AllGeneralUi />
    </>;
};
export default GeneralUI;