import { Link } from "react-router-dom";

// dummy data
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Col, Row } from "react-bootstrap";
import Company from "./Company";
const Companies = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Apps",
      path: "/apps/companies"
    }, {
      label: "Companies",
      path: "/apps/companies",
      active: true
    }]} title={"Companies"} />
      <Company />

      <Row className="mb-4">
        <Col sm={6}>
          <div>
            <h5 className="font-14 text-body">Showing Page 2 Of 94</h5>
          </div>
        </Col>
        <Col sm={6}>
          <div className="float-sm-end">
            <ul className="pagination pagination-rounded mb-sm-0">
              <li className="page-item disabled">
                <Link className="page-link" to="" aria-label="Previous">
                  <i className="mdi mdi-chevron-left"></i>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  1
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  4
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  5
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="" aria-label="Next">
                  <i className="mdi mdi-chevron-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </>;
};
export default Companies;