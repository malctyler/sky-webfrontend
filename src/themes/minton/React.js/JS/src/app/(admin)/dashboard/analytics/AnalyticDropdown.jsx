import { Dropdown } from "react-bootstrap";
const AnalyticDropdown = () => {
  return <Dropdown className="float-end" align="end">
    <Dropdown.Toggle as="a" className="arrow-none card-drop cursor-pointer">
      <i className="mdi mdi-dots-horizontal"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Download</Dropdown.Item>
      <Dropdown.Item>Upload</Dropdown.Item>
      <Dropdown.Item>Action</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>;
};
export default AnalyticDropdown;