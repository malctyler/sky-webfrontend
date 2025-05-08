// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import ResultList from "@/app/(admin)/pages/search-results/ResultList";
import { Card, CardBody, Col, Row } from "react-bootstrap";
const SearchResults = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Extra Pages",
      path: "/pages/search-results"
    }, {
      label: "Search Results",
      path: "/pages/search-results",
      active: true
    }]} title={"Search Results"} />

      <Row>
        <Col>
          <Card className="search-result-box">
            <CardBody>
              <Row>
                <Col md={8} className="offset-md-2">
                  <div className="pt-3 pb-4">
                    <div className="input-group">
                      <input type="text" className="form-control" defaultValue="Admin Dashboard" />
                      <button type="button" className="input-group-text btn waves-effect waves-light btn-purple">
                        <i className="fa fa-search me-1"></i> Search
                      </button>
                    </div>
                    <div className="mt-3 text-center">
                      <h4>Search Results For &quot;Admin Dashboard&quot;</h4>
                    </div>
                  </div>
                </Col>
              </Row>
              <ResultList />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default SearchResults;