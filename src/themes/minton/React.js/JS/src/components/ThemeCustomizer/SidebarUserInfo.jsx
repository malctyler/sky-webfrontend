import { Form } from "react-bootstrap";
import { useLayoutContext } from "@/context/useLayoutContext";
const SidebarUserInfo = () => {
  const {
    showUserInfo,
    toggleUserInfo
  } = useLayoutContext();
  return <>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Sidebar User Info</h6>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input type="checkbox" name="leftsidebar-user" id="sidebaruser-check" onChange={toggleUserInfo} checked={showUserInfo} />
                <Form.Check.Label htmlFor="sidebaruser-check">Enable</Form.Check.Label>
            </Form.Check>
        </>;
};
export default SidebarUserInfo;