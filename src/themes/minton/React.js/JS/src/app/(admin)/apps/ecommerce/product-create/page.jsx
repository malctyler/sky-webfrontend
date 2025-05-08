import PageBreadcrumb from "@/components/PageBreadcrumb";
import ProductCreateWizard from "@/app/(admin)/apps/ecommerce/product-create/ProductCreateWizard";
import { Card, CardBody } from "react-bootstrap";
const ProductEdit = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Ecommerce",
      path: "/apps/ecommerce/details"
    }, {
      label: "Add / Edit Product",
      path: "/apps/ecommerce/details",
      active: true
    }]} title={"Add / Edit Product"} />

      <Card>
        <CardBody>
          <div id="addproduct-nav-pills-wizard" className="twitter-bs-wizard form-wizard-header">
            <ProductCreateWizard />
          </div>
        </CardBody>
      </Card>
    </>;
};
export default ProductEdit;