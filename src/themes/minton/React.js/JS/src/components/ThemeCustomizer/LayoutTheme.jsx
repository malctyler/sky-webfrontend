import { Form } from "react-bootstrap";
import { useLayoutContext } from "@/context/useLayoutContext";
const LayoutTheme = () => {
  const {
    theme,
    changeTheme
  } = useLayoutContext();
  return <>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Color Scheme</h6>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input type="radio" name="data-bs-theme" id="layout-color-light" value="light" onChange={() => changeTheme('light')} checked={theme === 'light'} />
                <Form.Check.Label htmlFor="layout-color-light">
                    Light
                </Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input type="radio" name="data-bs-theme" id="layout-color-dark" value="dark" onChange={() => changeTheme('dark')} checked={theme === 'dark'} />
                <Form.Check.Label htmlFor="layout-color-dark">
                    Dark
                </Form.Check.Label>
            </Form.Check>

        </>;
};
export default LayoutTheme;