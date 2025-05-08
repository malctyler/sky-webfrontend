import { Link } from "react-router-dom";
import PageBreadcrumb from "@/components/PageBreadcrumb";

import { Card, CardBody, Col, Row } from "react-bootstrap";
import TaskDropdown from "./TaskDropdown";
import AllTask from "./AllTask";

// Task List
const TaskList = () => {

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Tasks", path: "/apps/tasks/list" },
          { label: "Tasks List", path: "/apps/tasks/list", active: true },
        ]}
        title={"Tasks List"}
      />
      <Row>
        <Col lg={12}>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  {/* cta */}
                  <Row>
                    <Col sm={3}>
                      <Link
                        to=""
                        className="btn btn-primary waves-effect waves-light"
                      >
                        <i className="fe-plus me-1"></i>Add New
                      </Link>
                    </Col>
                    <Col sm={9}>
                      <div className="float-sm-end mt-3 mt-sm-0">
                        <div className="d-flex align-items-start flex-wrap">
                          <div className="mb-3 mb-sm-0 me-sm-2">
                            <form>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search..."
                                />
                              </div>
                            </form>
                          </div>
                          <TaskDropdown />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <AllTask />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TaskList;
