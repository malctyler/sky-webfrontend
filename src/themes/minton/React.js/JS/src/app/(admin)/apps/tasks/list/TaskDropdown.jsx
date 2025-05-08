import { Dropdown } from "react-bootstrap";
const TaskDropdown = () => {
  return <Dropdown align="end">
      <Dropdown.Toggle variant="light">
        <i className="mdi mdi-filter-variant"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Due Date</Dropdown.Item>
        <Dropdown.Item>Added Date</Dropdown.Item>
        <Dropdown.Item>Assignee</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>;
};
export default TaskDropdown;