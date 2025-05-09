

import React from "react";
import { Dropdown, ButtonGroup, Button, Row, Col } from "react-bootstrap";

const colors = [
  {
    name: "Primary",
    color: "primary",
  },
  {
    name: "Secondary",
    color: "secondary",
  },
  {
    name: "Success",
    color: "success",
  },
  {
    name: "Info",
    color: "info",
  },
  {
    name: "Warning",
    color: "warning",
  },
  {
    name: "Danger",
    color: "danger",
  },
];

const SingleButtonDropdown = () => {
  return (
    <div>
      <h5>Single button dropdowns</h5>
      <p className="text-muted font-13 mb-2">
        You can use <code>DropdownButton</code> to create a simple dropdown.
        Also, you can use prop <code>as</code> to create custom element typeof
        dropdown.
      </p>
      <Row>
        <Col xs={6}>
          <Dropdown className="mt-2">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Dropdown Button <i className="mdi mdi-chevron-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={6}>
          <Dropdown className="mt-2">
            <Dropdown.Toggle as="a" variant="light" className="btn btn-light">
              Dropdown link <i className="mdi mdi-chevron-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

const ColorVariantButtonDropdown = () => {
  return (
    <div className="mt-5">
      <h5 className="mb-1">Variant</h5>
      <p className="text-muted font-13 mb-2">
        The best part is you can do this with any button variant, too:
      </p>

      {(colors || []).map((color, index) => {
        return (
          <Dropdown key={index} as={ButtonGroup} className="mt-2 me-1">
            <Dropdown.Toggle variant={color.color}>
              {color.name} <i className="mdi mdi-chevron-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="">Action</Dropdown.Item>
              <Dropdown.Item href="">Another action</Dropdown.Item>
              <Dropdown.Item href="">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="">Separated link</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      })}
    </div>
  );
};

const DropendVariationDropdowns = () => {
  return (
    <div className="mt-5">
      <h5 className="mb-1">Dropend variation</h5>
      <p className="text-muted font-13 mb-2">
        Trigger dropdown menus right of their toggle elements, with the{" "}
        <code>drop</code> prop.
      </p>
      <Dropdown as={ButtonGroup} className="mt-2 me-1" drop="end">
        <Dropdown.Toggle variant="primary" className="waves-effect waves-light">
          Dropend <i className="mdi mdi-chevron-right"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="">Action</Dropdown.Item>
          <Dropdown.Item href="">Another action</Dropdown.Item>
          <Dropdown.Item href="">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="">Separated link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as={ButtonGroup} className="mt-2 me-1" drop="end">
        <Button variant="light" className="waves-effect">
          Split Dropend
        </Button>
        <Dropdown.Toggle variant="light" className="waves-effect">
          <i className="mdi mdi-chevron-right"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const DropupVariationDropdowns = () => {
  return (
    <div className="mt-5">
      <h5 className="mb-1">Dropup variation</h5>
      <p className="text-muted font-13 mb-2">
        Trigger dropdown menus above of their toggle elements, with the{" "}
        <code>drop</code> prop.
      </p>
      <Dropdown as={ButtonGroup} className="mt-2 me-1" drop="up">
        <Dropdown.Toggle variant="purple">
          Dropup <i className="mdi mdi-chevron-up"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="">Action</Dropdown.Item>
          <Dropdown.Item href="">Another action</Dropdown.Item>
          <Dropdown.Item href="">Something else here</Dropdown.Item>
          <Dropdown.Divider as="div" />
          <Dropdown.Item href="">Separated link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as={ButtonGroup} className="mt-2 me-1" drop="up">
        <Button variant="light">Split Dropup</Button>
        <Dropdown.Toggle variant="light">
          <i className="mdi mdi-chevron-up"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="">Action</Dropdown.Item>
          <Dropdown.Item href="">Another action</Dropdown.Item>
          <Dropdown.Item href="">Something else here</Dropdown.Item>
          <Dropdown.Divider as="div" />
          <Dropdown.Item href="">Separated link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const ActiveItemDropdown = () => {
  return (
    <div className="mt-5">
      <h5 className="mb-1">Active Item</h5>
      <p className="text-muted font-13 mb-2">
        Add <code>active</code> prop to item in the dropdown to{" "}
        <strong>style them as active</strong>.
      </p>

      <Dropdown as={ButtonGroup} className="mt-2">
        <Dropdown.Toggle variant="secondary">
          Active Item <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Regular link</Dropdown.Item>
          <Dropdown.Item active>Active link</Dropdown.Item>
          <Dropdown.Item>Another link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const DropdownWithHeader = () => {
  return (
    <div className="mt-5">
      <h5 className="mb-1">Headers</h5>

      <p className="text-muted font-13 mb-2">
        Add a header to label sections of actions.
      </p>

      <Dropdown as={ButtonGroup} className="mt-2">
        <Dropdown.Toggle variant="secondary">
          Header <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Header>Dropdown header</Dropdown.Header>
          <Dropdown.Item>Action</Dropdown.Item>
          <Dropdown.Item>Another action</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const CustomDropdown = () => {
  return (
    <div className="mt-5">
      <h5 className="mb-1">Forms</h5>
      <p className="text-muted font-13 mb-2">
        Put a form within a dropdown menu, or make it into a dropdown menu, and
        use margin or padding utilities to give it the negative space you
        require.
      </p>

      <Dropdown className="mt-2">
        <Dropdown.Toggle variant="secondary">
          Form <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <form className="px-4 py-3">
            <div className="mb-2">
              <label htmlFor="exampleDropdownFormEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleDropdownFormEmail1"
                placeholder="email@example.com"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="exampleDropdownFormPassword1"
                className="form-label"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleDropdownFormPassword1"
                placeholder="Password"
              />
            </div>
            <div className="mb-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="dropdownCheck"
                />
                <label className="form-check-label" htmlFor="dropdownCheck">
                  Remember me
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4">New around here? Sign up</Dropdown.Item>
          <Dropdown.Item eventKey="4">Forgot password?</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const SplitColorVariantButtonDropdown = () => {
  return (
    <div className="mt-5 mt-xl-0">
      <h5 className="mb-1">Split button dropdowns</h5>
      <p className="text-muted font-13 mb-2">
        You can split button dropdowns by adding <code>SplitButton</code>.
      </p>
      {(colors || []).map((color, index) => {
        return (
          <Dropdown key={index} as={ButtonGroup} className="me-1 mt-2">
            <Button variant={color.color}>{color.name} </Button>

            <Dropdown.Toggle split variant={color.color}>
              <i className="mdi mdi-chevron-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="1">Action</Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      })}
    </div>
  );
};

const ButtonDropdownSizes = () => {
  const sizes = [
    {
      size: "lg",
      name: "Large button",
      variant: "primary",
    },
    {
      size: "sm",
      name: "Small button",
      variant: "success",
    },
  ];
  return (
    <div className="mt-5">
      <p className="mb-1 h5 mt-5">Sizing</p>
      <p className="text-muted font-13 mb-2">
        Button dropdowns work with buttons of all sizes, including default and
        split dropdown buttons.
      </p>
      {(sizes || []).map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Dropdown as={ButtonGroup} size={item.size} className="mt-2 me-1">
              <Dropdown.Toggle variant={item.variant}>
                {item.name} <i className="mdi mdi-chevron-down"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="">Action</Dropdown.Item>
                <Dropdown.Item href="">Another action</Dropdown.Item>
                <Dropdown.Item href="">Something else here</Dropdown.Item>
                <Dropdown.Divider as="div" />
                <Dropdown.Item href="">Separated link</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={ButtonGroup} size={item.size} className="mt-2 me-1">
              <Button variant="light">{item.name}</Button>
              <Dropdown.Toggle variant="light">
                <i className="mdi mdi-chevron-down"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="">Action</Dropdown.Item>
                <Dropdown.Item href="">Another action</Dropdown.Item>
                <Dropdown.Item href="">Something else here</Dropdown.Item>
                <Dropdown.Divider as="div" />
                <Dropdown.Item href="">Separated link</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const DropstartVariationDropdowns = () => {
  return (
    <div className="mt-5">
      <h5 className="mb-1">Dropstart variation</h5>
      <p className="text-muted font-13 mb-2">
        Trigger dropdown menus left of their toggle elements, with the{" "}
        <code>drop</code> prop.
      </p>
      <Dropdown as={ButtonGroup} className="mb-2 me-1" drop="start">
        <Dropdown.Toggle variant="info">
          <i className="mdi mdi-chevron-left"></i>Dropstart
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="">Action</Dropdown.Item>
          <Dropdown.Item href="">Another action</Dropdown.Item>
          <Dropdown.Item href="">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="">Separated link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as={ButtonGroup} className="mb-2" drop="start">
        <Dropdown.Toggle variant="secondary">
          <i className="mdi mdi-chevron-left"></i>
        </Dropdown.Toggle>
        <Button variant="secondary">Split dropstart</Button>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const DropdownMenuAlignment = () => {
  return (
    <div className="mt-5">
      <p className="mb-1 h5 mt-5">Menu alignment</p>
      <p className="text-muted font-13 mb-2">
        Passing <code>right</code> to the <code>menuAligh</code> prop on the
        <code> DropdownButton</code> to right align the dropdown menu.
      </p>

      <Dropdown as={ButtonGroup} className="mt-2" align="end">
        <Dropdown.Toggle variant="light">
          Right-aligned <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="">Action</Dropdown.Item>
          <Dropdown.Item href="">Another action</Dropdown.Item>
          <Dropdown.Item href="">Something else here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const DisabledItemDropdown = () => {
  return (
    <div className="mt-5">
      <h5 className="mb-1">Disabled Item</h5>

      <p className="text-muted font-13 mb-2">
        Add <code>disabled</code> prop to item in the dropdown to{" "}
        <strong>style them as disabled</strong>.
      </p>

      <Dropdown as={ButtonGroup} className="mt-2">
        <Dropdown.Toggle>
          Disabled <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Regular link</Dropdown.Item>
          <Dropdown.Item disabled>Disabled link</Dropdown.Item>
          <Dropdown.Item>Another link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const DropdownWithText = () => {
  return (
    <div className="mt-5">
      <h5 className="mb-1">Text</h5>
      <p className="text-muted font-13 mb-2">
        Place any freeform text within a dropdown menu with text and use spacing
        utilities. Note that you’ll likely need additional sizing styles to
        constrain the menu width.
      </p>

      <Dropdown as={ButtonGroup} className="mt-2">
        <Dropdown.Toggle>
          Text Dropdown <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="p-3 text-muted" style={{ maxWidth: "200px" }}>
          <p>Some example text that&apos;s free-flowing within the dropdown menu.</p>
          <p className="mb-0">And this is more example text.</p>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
const AllDropdowns = () => {
  return (
    <Row>
      <Col xl={6}>
        <SingleButtonDropdown />
        <ColorVariantButtonDropdown />
        <DropendVariationDropdowns />
        <DropupVariationDropdowns />
        <ActiveItemDropdown />
        <DropdownWithHeader />
        <CustomDropdown />
      </Col>

      <Col xl={6}>
        <SplitColorVariantButtonDropdown />
        <ButtonDropdownSizes />
        <DropstartVariationDropdowns />
        <DropdownMenuAlignment />
        <DisabledItemDropdown />
        <DropdownWithText />
      </Col>
    </Row>
  )
}

export default AllDropdowns