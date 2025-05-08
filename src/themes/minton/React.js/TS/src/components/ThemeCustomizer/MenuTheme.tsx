

import {Form} from "react-bootstrap";
import {useLayoutContext} from "@/context/useLayoutContext";

const MenuTheme = () => {

    const {menu, changeMenuTheme} = useLayoutContext()

    return (
        <>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Left Sidebar Color</h6>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input
                    type="radio"
                    name="theme"
                    id="light-check"
                    value="light"
                    onChange={() => changeMenuTheme('light')}
                    checked={menu.theme === 'light'}
                />
                <Form.Check.Label htmlFor="light-check">Light</Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input
                    type="radio"
                    name="theme"
                    id="dark-check"
                    value="dark"
                    onChange={() => changeMenuTheme('dark')}
                    checked={menu.theme === 'dark'}
                />
                <Form.Check.Label htmlFor="dark-check">Dark</Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input
                    type="radio"
                    name="theme"
                    id="brand-check"
                    value="brand"
                    onChange={() => changeMenuTheme('brand')}
                    checked={menu.theme === 'brand'}
                />
                <Form.Check.Label htmlFor="brand-check">Brand</Form.Check.Label>
            </Form.Check>

            <Form.Check className="form-check form-switch mb-1">
                <Form.Check.Input
                    type="radio"
                    name="theme"
                    id="gradient-check"
                    value="gradient"
                    onChange={() => changeMenuTheme('gradient')}
                    checked={menu.theme === 'gradient'}
                />
                <Form.Check.Label htmlFor="gradient-check">Gradient</Form.Check.Label>
            </Form.Check>
        </>
    );
};

export default MenuTheme;
