import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import CompanyDetails from "./CompanyDetails";
import { companyInfo as data } from "./data";
const Company = () => {
  const [companyInfo, setCompanyInfo] = useState(data);

  /*
   * search on data
   */
  const onSearchData = value => {
    if (value === "") setCompanyInfo(data);else {
      let modifiedProducts = [...data];
      modifiedProducts = modifiedProducts.filter(item => item.name.toLowerCase().includes(value) || item.location.toLowerCase().includes(value));
      setCompanyInfo(modifiedProducts);
    }
  };
  return <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="justify-content-between">
                                <Col lg={8}>
                                    <form className="d-flex flex-wrap align-items-center">
                                        <div className="d-flex flex-wrap align-items-center">
                                            <label htmlFor="inputPassword2" className="visually-hidden">
                                                Search
                                            </label>
                                            <input type="search" className="form-control" id="inputPassword2" placeholder="Search..." onChange={e => onSearchData(e.target.value)} />
                                        </div>
                                        <div className="d-flex flex-wrap align-items-center mx-sm-3">
                                            <label htmlFor="status-select" className="me-2">
                                                Sort By
                                            </label>
                                            <div>
                                                <select defaultValue="Name" className="form-select">
                                                    <option value="Select">Select</option>
                                                    <option value="Date">Date</option>
                                                    <option value="Name">Name</option>
                                                    <option value="Revenue">Revenue</option>
                                                    <option value="Employees">Employees</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </Col>
                                <Col lg={4} sm={6}>
                                    <div className="d-flex gap-2 justify-content-lg-end mt-3 mt-lg-0">
                                        <Button variant="success" className="waves-effect waves-light me-1">
                                            <i className="mdi mdi-cog"></i>
                                        </Button>
                                        <Button variant="danger" className="waves-effect waves-light">
                                            <i className="mdi mdi-plus-circle me-1"></i> Add New
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <CompanyDetails companyInfo={companyInfo} />
        </>;
};
export default Company;