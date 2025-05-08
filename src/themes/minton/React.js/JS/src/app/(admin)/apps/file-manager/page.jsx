// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import FileList from "./FileList";
const FileManager = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Apps",
      path: "/apps/file-manager"
    }, {
      label: "File Manager",
      path: "/apps/file-manager",
      active: true
    }]} title={"File Manager"} />

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <div className="fileupload btn btn-success waves-effect waves-light mb-3">
                <span>
                  <i className="mdi mdi-cloud-upload me-1"></i> Upload Files
                </span>
                <input type="file" className="upload" />
              </div>
              <FileList />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default FileManager;