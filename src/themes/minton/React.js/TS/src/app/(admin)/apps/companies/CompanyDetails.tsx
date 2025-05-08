import { Card, Col, Dropdown, Row } from "react-bootstrap";

// dummy data
import { Link } from "react-router-dom";
import { CompanyTypes } from "./data";


interface CompanyDetailsProps {
    companyInfo: CompanyTypes[];
}

const CompanyDetails = ({companyInfo}: CompanyDetailsProps) => {
    return (
        <Row>
            {(companyInfo || []).map((item, index) => {
                return (
                    <Col xl={4} sm={6} key={index}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex align-items-start">
                                    <div className="avatar-md me-3">
                                        <div className="avatar-title bg-light rounded-circle">
                                            <img
                                                src={item.logo}
                                                alt=""
                                                className="avatar-sm rounded-circle"
                                                height={36}
                                                width={36}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="my-1">
                                            <Link to="" className="text-dark">
                                                {item.name}
                                            </Link>
                                        </h4>
                                        <p className="text-muted text-truncate mb-0">
                                            <i className="ri-map-pin-line align-bottom me-1"></i>{" "}
                                            {item.location}
                                        </p>
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            as="a"
                                            className="cursor-pointer text-body"
                                        >
                                            <i className="mdi mdi-dots-vertical font-20"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu align="end">
                                            <Dropdown.Item>Action</Dropdown.Item>
                                            <Dropdown.Item>Another action</Dropdown.Item>
                                            <Dropdown.Item>Something else here</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <hr/>
                                <div className="text-muted">
                                    <Row>
                                        <Col cols={6}>
                                            <p className="text-truncate mb-0">Revenue (USD)</p>
                                            <h5 className="mb-sm-0">{item.revenue}</h5>
                                        </Col>
                                        <Col cols={6}>
                                            <p className="text-truncate mb-0">Number of employees</p>
                                            <h5 className="mb-sm-0">{item.noOfEmployees}</h5>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default CompanyDetails;
