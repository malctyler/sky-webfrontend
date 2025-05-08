
import { Tab, Nav, Card, CardBody } from "react-bootstrap";

// components
import { FAQs as FAQ } from "@/components";

// dummy data
import { generalFaqs, privacyFaqs, supportFaqs } from "../data";
const FAQs = () => {
  return (
    <Card>
      <CardBody>
        <Tab.Container defaultActiveKey="general-q">
          <Nav as="ul" variant="pills" className="navtab-bg">
            <Nav.Item as="li">
              <Nav.Link
                eventKey="general-q"
                className="cursor-pointer px-3 py-2"
              >
                <span className="me-1">
                  <i className="mdi mdi-help-circle-outline"></i>
                </span>
                <span className="d-none d-sm-inline-block">
                  General Questions
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                eventKey="privacy-p"
                className="cursor-pointer px-3 py-2"
              >
                <span className="me-1">
                  <i className="mdi mdi-shield-half-full"></i>
                </span>
                <span className="d-none d-sm-inline-block">
                  Privacy Policy
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                eventKey="support"
                className="cursor-pointer px-3 py-2"
              >
                <span className="me-1">
                  <i className="mdi mdi-headset"></i>
                </span>
                <span className="d-none d-sm-inline-block">Support</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="general-q">
              <FAQ rawFaqs={generalFaqs} containerClass={"pt-2"} />
            </Tab.Pane>
            <Tab.Pane eventKey="privacy-p">
              <FAQ rawFaqs={privacyFaqs} containerClass={"pt-2"} />
            </Tab.Pane>
            <Tab.Pane eventKey="support">
              <FAQ rawFaqs={supportFaqs} containerClass={"pt-2"} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </CardBody>
    </Card>
  )
}

export default FAQs