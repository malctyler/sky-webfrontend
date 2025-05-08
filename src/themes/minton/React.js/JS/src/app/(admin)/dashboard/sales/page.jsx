import RevenueChart from "@/app/(admin)/dashboard/crm/RevenueChart";
import SalesChart from "@/app/(admin)/dashboard/sales/SalesChart";
import MarketingChart from "@/app/(admin)/dashboard/sales/MarketingChart";
import RevenueChartByLocation from "@/app/(admin)/dashboard/sales/RevenueChartByLocation";
import PerformanceChart from "@/app/(admin)/dashboard/sales/PerformanceChart";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

// dummy data
import { products, revenueHistory } from "./data";
import { Col, Row } from "react-bootstrap";
import Statistics from "./Statistics";
import TopSellingProducts from "./TopSellingProducts";
import RevenueHistory from "./RevenueHistory";
const SalesDashboard = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Dashboards",
      path: "/dashboard/sales"
    }, {
      label: "Sales",
      path: "/dashboard/sales",
      active: true
    }]} title={"Sales"} />

      <Statistics />

      <Row>
        <Col xl={4} lg={6}>
          <RevenueChart />
        </Col>
        <Col xl={4} lg={6}>
          <SalesChart />
        </Col>
        <Col xl={4}>
          <MarketingChart />
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <RevenueChartByLocation />
        </Col>
        <Col xl={6}>
          <TopSellingProducts products={products} />
        </Col>
      </Row>

      <Row>
        <Col xl={8}>
          <RevenueHistory revenueHistory={revenueHistory} />
        </Col>
        <Col xl={4}>
          <PerformanceChart />
        </Col>
      </Row>
    </>;
};
export default SalesDashboard;