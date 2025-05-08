import { useState } from "react";
import { Accordion, Button, Card, CardBody, Col, Collapse, Nav, Row, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
const CustomAccordion1 = ({
  item,
  index
}) => {
  return <Accordion.Item eventKey={String(index)}>
      <Accordion.Header>
        <i className="mdi mdi-help-circle me-1 text-primary"></i> {item.title}
      </Accordion.Header>
      <Accordion.Body>{item.text}</Accordion.Body>
    </Accordion.Item>;
};
const CustomAccordion2 = ({
  item,
  index
}) => {
  return <Accordion.Item eventKey={String(index)}>
      <Accordion.Header>Q. {item.title}</Accordion.Header>
      <Accordion.Body>{item.text}</Accordion.Body>
    </Accordion.Item>;
};
const CustomCollapse = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return <>
      <div className="d-flex gap-2 mb-2">
        <Link to="" className="btn btn-primary waves-effect waves-light" onClick={toggle}>
          Link with href
        </Link>

        <Button color="primary" className="waves-effect waves-light ms-1" onClick={toggle}>
          Button with data-bs-target
        </Button>
      </div>
      <Collapse in={isOpen}>
        <div>
          <Card>
            <CardBody>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </CardBody>
          </Card>
        </div>
      </Collapse>
    </>;
};
const HorizontalCollapse = () => {
  const [open, setOpen] = useState(false);
  return <>
      <p>
        <Button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
          Toggle width collapse
        </Button>
      </p>
      <Collapse in={open} dimension="width">
        <div>
          <Card className="card-body mb-0" style={{
          width: "450px"
        }}>
            This is some placeholder content for a horizontal collapse. It&apos;s
            hidden by default and shown when triggered.
          </Card>
        </div>
      </Collapse>
    </>;
};
const AllTabsAndAccordions = () => {
  const tabContents = [{
    id: 1,
    title: "Home",
    icon: "mdi mdi-home-variant",
    text: "Home - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."
  }, {
    id: 2,
    title: "Profile",
    icon: "mdi mdi-account",
    text: "Profile - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."
  }, {
    id: 3,
    title: "Messages",
    icon: "mdi mdi-email-variant",
    text: "Messages - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."
  }, {
    id: 4,
    title: "Settings",
    icon: "mdi mdi-cog",
    text: "Settings - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."
  }];
  const accordianContent = [{
    id: 1,
    title: "Can I use this template for my client?",
    text: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
  }, {
    id: 2,
    title: "Why use Vakal text here?",
    text: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
  }, {
    id: 3,
    title: "How many variations exist?",
    text: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
  }];
  const accordianContent2 = [{
    id: 1,
    title: "Can I use this template for my client?",
    text: " Yup, the marketplace license allows you to use this theme in any end products. For more information on licenses, please refere"
  }, {
    id: 2,
    title: "Can this theme work with Wordpress?",
    text: "No. This is a HTML template. It won't directly with wordpress, though you can convert this into wordpress compatible theme"
  }, {
    id: 3,
    title: "How do I get help with the theme?",
    text: "   Use our dedicated support email (support@coderthemes.com) to send your issues or feedback. We are here to help anytime"
  }, {
    id: 4,
    title: "Will you regularly give updates of Minton ?",
    text: "Yes, We will update the Minton regularly. All the future updates would be available without any cost"
  }];
  return <>
      <Row>
        <Col xl={6}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-4">Default Tabs</h4>

              <Tab.Container defaultActiveKey="Profile">
                <Nav as="ul" variant="tabs">
                  {(tabContents || []).map((tab, index) => {
                  return <Nav.Item as="li" key={index}>
                        <Nav.Link eventKey={tab.title} className="cursor-pointer">
                          <span className="d-inline-block d-sm-none">
                            <i className={tab.icon}></i>
                          </span>
                          <span className="d-none d-sm-inline-block">
                            {tab.title}
                          </span>
                        </Nav.Link>
                      </Nav.Item>;
                })}
                </Nav>

                <Tab.Content>
                  {(tabContents || []).map((tab, index) => {
                  return <Tab.Pane eventKey={tab.title} id={String(tab.id)} key={index}>
                        <p>{tab.text}</p>
                      </Tab.Pane>;
                })}
                </Tab.Content>
              </Tab.Container>
            </CardBody>
          </Card>
        </Col>

        {/* tab justified */}
        <Col xl={6}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-4">Tabs Justified</h4>

              <Tab.Container defaultActiveKey="Profile">
                <Nav as="ul" variant="pills" justify className="navtab-bg">
                  {(tabContents || []).map((tab, index) => {
                  return <Nav.Item as="li" key={index}>
                        <Nav.Link className="cursor-pointer" eventKey={tab.title}>
                          <span className="d-inline-block d-sm-none">
                            <i className={tab.icon}></i>
                          </span>
                          <span className="d-none d-sm-inline-block">
                            {tab.title}
                          </span>
                        </Nav.Link>
                      </Nav.Item>;
                })}
                </Nav>

                <Tab.Content>
                  {(tabContents || []).map((tab, index) => {
                  return <Tab.Pane eventKey={tab.title} id={String(tab.id)} key={index}>
                        <p>{tab.text}</p>
                      </Tab.Pane>;
                })}
                </Tab.Content>
              </Tab.Container>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* vertical tab */}
      <Row>
        <Col xl={6}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-4">Tabs Vertical Left</h4>

              <Row>
                <Tab.Container defaultActiveKey="Home">
                  <Col sm={3}>
                    <Nav as="ul" variant="pills" className="flex-column">
                      {(tabContents || []).map((tab, index) => {
                      return <Nav.Item as="li" key={index}>
                            <Nav.Link className="cursor-pointer" eventKey={tab.title}>
                              {tab.title}
                            </Nav.Link>
                          </Nav.Item>;
                    })}
                    </Nav>
                  </Col>

                  <Col sm={9}>
                    <Tab.Content className="pt-0">
                      {(tabContents || []).map((tab, index) => {
                      return <Tab.Pane eventKey={tab.title} id={String(tab.id)} key={index}>
                            <p>{tab.text}</p>
                          </Tab.Pane>;
                    })}
                    </Tab.Content>
                  </Col>
                </Tab.Container>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col xl={6}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-4">Tabs Vertical Right</h4>

              <Row>
                <Tab.Container defaultActiveKey="Home">
                  <Col sm={9}>
                    <Tab.Content className="pt-0">
                      {(tabContents || []).map((tab, index) => {
                      return <Tab.Pane eventKey={tab.title} id={String(tab.id)} key={index}>
                            <p>{tab.text}</p>
                          </Tab.Pane>;
                    })}
                    </Tab.Content>
                  </Col>
                  <Col sm={3}>
                    <Nav variant="pills" as="ul" className="flex-column nav-pills-tab">
                      {(tabContents || []).map((tab, index) => {
                      return <Nav.Item as="li" key={index}>
                            <Nav.Link className="cursor-pointer" eventKey={tab.title}>
                              {tab.title}
                            </Nav.Link>
                          </Nav.Item>;
                    })}
                    </Nav>
                  </Col>
                </Tab.Container>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Bordered Tabs */}
      <Row>
        <Col xl={6}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-4">Tabs Bordered</h4>

              <Tab.Container defaultActiveKey="Profile">
                <Nav variant="tabs" className="nav-bordered" as="ul">
                  {(tabContents || []).map((tab, index) => {
                  return <Nav.Item key={index} as="li">
                        <Nav.Link className="cursor-pointer" eventKey={tab.title}>
                          <span className="d-inline-block d-sm-none">
                            <i className={tab.icon}></i>
                          </span>
                          <span className="d-none d-sm-inline-block">
                            {tab.title}
                          </span>
                        </Nav.Link>
                      </Nav.Item>;
                })}
                </Nav>

                <Tab.Content>
                  {(tabContents || []).map((tab, index) => {
                  return <Tab.Pane eventKey={tab.title} id={String(tab.id)} key={index}>
                        <Row>
                          <Col sm={12}>
                            <p className="mt-3">{tab.text}</p>
                          </Col>
                        </Row>
                      </Tab.Pane>;
                })}
                </Tab.Content>
              </Tab.Container>
            </CardBody>
          </Card>
        </Col>

        {/* tab justified */}
        <Col xl={6}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-4">Tabs Bordered Justified</h4>

              <Tab.Container defaultActiveKey="Profile">
                <Nav variant="tabs" justify className="nav-bordered" as="ul">
                  {(tabContents || []).map((tab, index) => {
                  return <Nav.Item key={index} as="li">
                        <Nav.Link className="cursor-pointer" eventKey={tab.title}>
                          <span className="d-inline-block d-sm-none">
                            <i className={tab.icon}></i>
                          </span>
                          <span className="d-none d-sm-inline-block">
                            {tab.title}
                          </span>
                        </Nav.Link>
                      </Nav.Item>;
                })}
                </Nav>

                <Tab.Content>
                  {(tabContents || []).map((tab, index) => {
                  return <Tab.Pane eventKey={tab.title} id={String(tab.id)} key={index}>
                        <Row>
                          <Col sm={12}>
                            <p className="mt-3">{tab.text}</p>
                          </Col>
                        </Row>
                      </Tab.Pane>;
                })}
                </Tab.Content>
              </Tab.Container>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* accordions */}
      <Row>
        <Col xl={6}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-3">Accordion Example</h4>

              <Accordion defaultActiveKey="0" id="accordion">
                {(accordianContent || []).map((item, index) => {
                return <CustomAccordion1 key={index} item={item} index={index} />;
              })}
              </Accordion>
            </CardBody>
          </Card>
        </Col>

        <Col xl={6}>
          <Card>
            <CardBody>
              <h4 className="header-title mb-3">Accordion Flush Example</h4>

              <Accordion flush defaultActiveKey="0" id="accordion">
                {(accordianContent2 || []).map((item, index) => {
                return <CustomAccordion2 key={index} item={item} index={index} />;
              })}
              </Accordion>
            </CardBody>
          </Card>
        </Col>

        <Col xl={6}>
          <CustomCollapse />
        </Col>
        <Col xl={6}>
          <HorizontalCollapse />
        </Col>
      </Row>
    </>;
};
export default AllTabsAndAccordions;