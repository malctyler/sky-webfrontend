import { Fragment } from "react";

// components
import CarouselSliders from "@/app/(admin)/ui/carousel/CarouselSliders";
import PageBreadcrumb from "@/components/PageBreadcrumb";
const Carousels = () => {
  return <Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/carousel"
    }, {
      label: "Carousel",
      path: "/ui/carousel",
      active: true
    }]} title={"Carousel"} />

      <CarouselSliders />

    </Fragment>;
};
export default Carousels;