// components
import  PageBreadcrumb  from "@/components/PageBreadcrumb";
import KanbanBoard from "@/app/(admin)/apps/tasks/kanban/KanbanBoard";
import { Row } from "react-bootstrap";


// kanban
const Kanban = () => {

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Tasks", path: "apps/tasks/kanban" },
          { label: "Kanban Board", path: "apps/tasks/kanban", active: true },
        ]}
        title={"Kanban Board"}
      />
      <Row>
        <KanbanBoard />
      </Row>
    </>
  );
};

export default Kanban;
