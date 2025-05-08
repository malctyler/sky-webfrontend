import GalleryItems from "@/app/(admin)/pages/gallery/GalleryItems";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
const Gallery = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Extra Pages",
      path: "/pages/gallery"
    }, {
      label: "Gallery",
      path: "/pages/gallery",
      active: true
    }]} title={"Gallery"} />
      <GalleryItems />
    </>;
};
export default Gallery;