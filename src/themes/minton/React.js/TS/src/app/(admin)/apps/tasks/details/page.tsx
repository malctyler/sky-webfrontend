
// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

import Attachments from "./Attachments";
import Comments from "./Comments";
import Task from "./Task";

// dummy data
import { tasks } from "./data";

import { Col, Row } from "react-bootstrap";


// TaskDetails
const TaskDetails = () => {
  const selectedTask = (tasks[0]);

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Tasks", path: "/apps/tasks/details" },
          { label: "Task Detail", path: "/apps/tasks/details", active: true },
        ]}
        title={"Task Detail"}
      />
      <Row>
        <Col xl={8}>
          <Task task={selectedTask} />
          <Attachments />
        </Col>
        <Col xl={4}>
          <Comments />
        </Col>
      </Row>
    </>
  );
};

export default TaskDetails;
