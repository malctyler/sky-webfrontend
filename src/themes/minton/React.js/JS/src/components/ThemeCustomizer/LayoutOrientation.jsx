import { Form } from "react-bootstrap";
import { useLayoutContext } from "@/context/useLayoutContext";
const LayoutOrientation = () => {
  const {
    orientation,
    changeLayoutOrientation
  } = useLayoutContext();
  return <>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Layout</h6>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input type="radio" onChange={() => changeLayoutOrientation('vertical')} name="layout-type" value="vertical" id="vertical-layout" checked={orientation === 'vertical'} />
                <Form.Check.Label htmlFor="vertical-layout">
                    Vertical Layout
                </Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input type="radio" onChange={() => changeLayoutOrientation('horizontal')} name="layout-type" value="horizontal" id="horizontal-layout" checked={orientation === 'horizontal'} />
                <Form.Check.Label htmlFor="horizontal-layout">
                    Horizontal Layout
                </Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input type="radio" onChange={() => changeLayoutOrientation('detached')} name="layout-type" value="detached" id="detached-layout" checked={orientation === 'detached'} />
                <Form.Check.Label htmlFor="detached-layout">
                    Detached Layout
                </Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input type="radio" onChange={() => changeLayoutOrientation('two-column')} name="layout-type" value="two-column" id="two-column-layout" checked={orientation === 'two-column'} />
                <Form.Check.Label htmlFor="two-column-layout">
                    Two Column Layout
                </Form.Check.Label>
            </Form.Check>
        </>;
};
export default LayoutOrientation;