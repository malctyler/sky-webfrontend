import { Card, CardBody, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";

// types

const SocialMediaTraffic = ({
  socialMediaTraffic
}) => {
  return <Card>
      <CardBody>
        <div className="clearfix">
          <Link to="" className="p-0 float-end mb-3">
            Export <i className="mdi mdi-download ms-1"></i>
          </Link>
          <h4 className="header-title">Social Media Traffic</h4>
        </div>

        <div className="table-responsive">
          <table className="table table-sm table-centered mb-0 font-14">
            <thead className="table-light">
              <tr>
                <th>Network</th>
                <th>Visits</th>
                <th style={{
                width: "40%"
              }}></th>
              </tr>
            </thead>
            <tbody>
              {(socialMediaTraffic || []).map((item, index) => {
              return <tr key={index}>
                    <td>{item.network}</td>
                    <td>{item.visits}</td>
                    <td>
                      <ProgressBar now={item.progress} style={{
                    height: "3px"
                  }} />
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>;
};
export default SocialMediaTraffic;