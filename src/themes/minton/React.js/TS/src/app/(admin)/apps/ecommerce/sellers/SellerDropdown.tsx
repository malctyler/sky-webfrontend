
import { Dropdown } from "react-bootstrap"

const SellerDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle as="a" className="text-body cursor-pointer">
        <i className="mdi mdi-dots-vertical font-20"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end">
        <Dropdown.Item>Action</Dropdown.Item>
        <Dropdown.Item>Another Action</Dropdown.Item>
        <Dropdown.Item>Something else here</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SellerDropdown