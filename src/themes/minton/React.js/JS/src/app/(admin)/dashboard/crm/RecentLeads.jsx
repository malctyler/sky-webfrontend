import { Card, CardBody, Dropdown } from "react-bootstrap";
import classNames from "classnames";
const RecentLeads = ({
  recentLeads
}) => {
  return <>
      <Card>
        <CardBody>
          <Dropdown className="float-end" align="end">
            <Dropdown.Toggle as="a" className=" arrow-none card-drop">
              <i className="mdi mdi-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Action</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <h4 className="header-title mb-4">Recent Leads</h4>

          {(recentLeads || []).map((item, index) => {
          return <div key={index} className={classNames("d-flex", {
            "mt-3": index !== 0
          })}>
                <img className="avatar-sm align-self-center me-3 rounded-circle" src={item.avatar} alt="" height={36} width={36} />
                <div className="flex-1">
                  <span className={classNames("badge", "badge-soft-success", "float-end", {
                "badge-soft-success": item.status === "Won",
                "badge-soft-warning": item.status === "Cold",
                "badge-soft-danger": item.status === "Lost"
              })}>
                    {item.status} lead
                  </span>
                  <h5 className="mt-0 mb-1">{item.name}</h5>
                  <span className="text-muted font-13">{item.email}</span>
                </div>
              </div>;
        })}
        </CardBody>
      </Card>
    </>;
};
export default RecentLeads;