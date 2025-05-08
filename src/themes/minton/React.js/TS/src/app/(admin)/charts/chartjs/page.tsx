


// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import LineChart from "@/app/(admin)/charts/chartjs/LineChart";
import BarChart from "@/app/(admin)/charts/chartjs/BarChart";
import PieChart from "@/app/(admin)/charts/chartjs/PieChart";
import DonutChart from "@/app/(admin)/charts/chartjs/DonutChart";
import PolarChart from "@/app/(admin)/charts/chartjs/PolarChart";
import RadarChart from "@/app/(admin)/charts/chartjs/RadarChart";
import { Col, Row } from "react-bootstrap";

const ChartJS = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Charts", path: "/charts/chartjs" },
          { label: "Chartjs", path: "/charts/chartjs", active: true },
        ]}
        title={"Chartjs"}
      />

      <Row>
        <Col lg={6}>
          <LineChart />
        </Col>
        <Col lg={6}>
          <BarChart />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <PieChart />
        </Col>
        <Col lg={6}>
          <DonutChart />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <PolarChart />
        </Col>
        <Col lg={6}>
          <RadarChart />
        </Col>
      </Row>
    </>
  );
};

export default ChartJS;
