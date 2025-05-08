import RevenueChart from "@/app/(admin)/dashboard/crm/RevenueChart";
import CampaignsChart from "@/app/(admin)/dashboard/crm/CampaignChart";

// component
import PageBreadcrumb from "@/components/PageBreadcrumb";

// data
import { performanceDetails, recentLeads } from "./data";
import { Col, Row } from "react-bootstrap";
import Statistics from "./Statistics";
import PerformanceDetails from "./PerformanceDetails";
import RecentLeads from "./RecentLeads";
import { TodoList } from "@/components";
const CRMDashboard = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Dashboards",
      path: "/dashboard/crm"
    }, {
      label: "CRM",
      path: "dashboard/crm",
      active: true
    }]} title={"CRM"} />

      <Statistics />

      <Row>
        <Col xl={4}>
          <CampaignsChart />
        </Col>
        <Col xl={8}>
          <RevenueChart />
        </Col>
      </Row>

      <Row>
        <Col xl={5}>
          <PerformanceDetails performanceDetails={performanceDetails} />
        </Col>
        <Col xl={7}>
          <Row>
            <Col lg={6}>
              <RecentLeads recentLeads={recentLeads} />
            </Col>
            <Col lg={6}>
              <TodoList addTodo={true} height={"292px"} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>;
};
export default CRMDashboard;