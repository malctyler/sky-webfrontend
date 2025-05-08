import { Form } from "react-bootstrap";
import { useLayoutContext } from "@/context/useLayoutContext";
const MenuSize = () => {
  const {
    menu,
    changeMenuSize
  } = useLayoutContext();
  return <>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Left Sidebar Size</h6>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input type="radio" name="leftsidebar-size" id="default-check" value="default" onChange={() => changeMenuSize('default')} checked={menu.size === 'default'} />
                <Form.Check.Label htmlFor="default-check">Default</Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input type="radio" name="leftsidebar-size" id="condensed-check" value="condensed" onChange={() => changeMenuSize('condensed')} checked={menu.size === 'condensed'} />
                <Form.Check.Label htmlFor="condensed-check">
                    Condensed <small>(Extra Small size)</small>
                </Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input type="radio" name="leftsidebar-size" id="compact-check" value="compact" onChange={() => changeMenuSize('compact')} checked={menu.size === 'compact'} />
                <Form.Check.Label htmlFor="compact-check">
                    Compact <small>(Small size)</small>
                </Form.Check.Label>
            </Form.Check>
        </>;
};
export default MenuSize;