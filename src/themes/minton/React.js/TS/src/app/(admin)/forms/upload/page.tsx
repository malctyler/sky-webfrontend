


// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import FileUploader from "@/components/FileUploader";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import React from "react";

const FileUpload = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Forms", path: "/forms/upload" },
          { label: "File Upload", path: "/forms/upload", active: true },
        ]}
        title={"File Upload"}
      />

      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title">Dropzone File Upload</h4>
              <p className="sub-header">
                DropzoneJS is an open source library that provides drag’n’drop
                file uploads with image previews.
              </p>

              <FileUploader />

            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FileUpload;
