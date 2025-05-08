import classNames from "classnames";

// component
import PageBreadcrumb from "@/components/PageBreadcrumb";

// icon data
import { REMIX_ICONS_LIST } from "./data";
import { Card, CardBody, CardTitle, Col, Row } from "react-bootstrap";
import React from "react";
const RemixIcons = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Icons",
      path: "/icons/remix"
    }, {
      label: "Remix Icons",
      path: "/icons/remix",
      active: true
    }]} title={"Remix Icons"} />

      <Row>
        <Col xs={12}>
          {(REMIX_ICONS_LIST || []).map((category, index) => {
          return <Card key={index}>
                <CardBody>
                  <CardTitle as={'h4'}>{Object.keys(category)[0]}</CardTitle>
                  {Object.keys(category).includes("Editor") ? <>
                      <p className="card-title-desc mb-2">
                        Use <code>&lt;i className=&quot;ri-bold&quot;&gt;&lt;/i&gt;</code>
                        <span className="badge bg-success">v 2.4.1</span>.
                      </p>
                      <Row className="icons-list-demo">
                        {(Object.keys(category[Object.keys(category)[0]]) || []).map((icon, index) => {
                    return <Col sm={6} lg={4} xl={3} key={index}>
                              <i className={classNames("ri-" + icon)}></i> ri-
                              {icon}
                            </Col>;
                  })}
                      </Row>
                    </> : <>
                      <p className="card-title-desc mb-2">
                        Use{" "}
                        <code>
                          &lt;i className=&quot;ri-home-line&quot;&gt;&lt;/i&gt;
                        </code>{" "}
                        or{" "}
                        <code>
                          &lt;i className=&quot;ri-home-fill&quot;&gt;&lt;/i&gt;
                        </code>{" "}
                        <span className="badge bg-success">v 2.4.1</span>.
                      </p>
                      <Row className="icons-list-demo">
                        {(Object.keys(category[Object.keys(category)[0]]) || []).map((icon, index) => {
                    return <React.Fragment key={icon + index}>
                              <Col sm={6} lg={4} xl={3}>
                                <i className={classNames("ri-" + icon + "-line")}></i>{" "}
                                ri-{icon}-line
                              </Col>
                              <Col sm={6} lg={4} xl={3}>
                                <i className={classNames("ri-" + icon + "-fill")}></i>{" "}
                                ri-{icon}-fill
                              </Col>
                            </React.Fragment>;
                  })}
                      </Row>
                    </>}
                </CardBody>
              </Card>;
        })}
        </Col>
      </Row>
    </>;
};
export default RemixIcons;