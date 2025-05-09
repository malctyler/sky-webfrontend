

import {Form} from "react-bootstrap";
import {useLayoutContext} from "@/context/useLayoutContext";

const LayoutWidth = () => {

    const {width, changeLayoutWidth} = useLayoutContext()

    return (
        <>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Width</h6>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input
                    type="radio"
                    name="width"
                    id="fluid-check"
                    value="fluid"
                    onChange={() => changeLayoutWidth('fluid')}
                    checked={width === 'fluid'}
                />
                <Form.Check.Label htmlFor="fluid-check">Fluid</Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input
                    type="radio"
                    name="width"
                    id="boxed-check"
                    value="boxed"
                    onChange={() => changeLayoutWidth('boxed')}
                    checked={width === 'boxed'}
                />
                <Form.Check.Label htmlFor="boxed-check">Boxed</Form.Check.Label>
            </Form.Check>
        </>
    );
};

export default LayoutWidth;
