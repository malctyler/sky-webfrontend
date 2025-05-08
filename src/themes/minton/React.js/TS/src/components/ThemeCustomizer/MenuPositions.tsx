

import {Form} from "react-bootstrap";
import {useLayoutContext} from "@/context/useLayoutContext";

const MenuPositions = () => {

    const {menu, changeMenuPosition} = useLayoutContext()

    return (
        <>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">
                Menus (Leftsidebar and Topbar) Position
            </h6>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input
                    type="radio"
                    name="menus-position"
                    id="fixed-check"
                    value="fixed"
                    onChange={() => changeMenuPosition('fixed')}
                    checked={menu.position === 'fixed'}
                />
                <Form.Check.Label htmlFor="fixed-check">Fixed</Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input
                    type="radio"
                    name="menus-position"
                    id="scrollable-check"
                    value="scrollable"
                    onChange={() => changeMenuPosition('scrollable')}
                    checked={menu.position === 'scrollable'}
                />
                <Form.Check.Label htmlFor="scrollable-check">
                    Scrollable
                </Form.Check.Label>
            </Form.Check>
        </>
    );
};

export default MenuPositions;
