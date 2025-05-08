import { Dropdown } from "react-bootstrap";
const TaskDetailDropdown = () => {
  return <Dropdown className="float-end" align="end">
      <Dropdown.Toggle as="a" className="cursor-pointer text-muted">
        <i className="mdi mdi-dots-horizontal font-18"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>
          <i className="mdi mdi-attachment me-1"></i>Attachment
        </Dropdown.Item>
        <Dropdown.Item>
          <i className="mdi mdi-pencil-outline me-1"></i>Edit
        </Dropdown.Item>
        <Dropdown.Item>
          <i className="mdi mdi-content-copy me-1"></i>Mark as Duplicate
        </Dropdown.Item>
        <Dropdown.Divider as="div" />
        <Dropdown.Item className="text-danger">
          <i className="mdi mdi-delete-outline me-1"></i>Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>;
};
export default TaskDetailDropdown;