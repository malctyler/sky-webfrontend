import ReactApexChart from "react-apexcharts";

// components
import { ChartStatistics } from "@/components";
import { Card, CardBody, Col, Row } from "react-bootstrap";
const StatisticsChartWidget4 = () => {
  const options = {
    chart: {
      type: "pie",
      sparkline: {
        enabled: true
      }
    },
    colors: ["#e3eaef", "#3bafda", "#1abc9c", "#f1556c"],
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => {
            return "";
          }
        }
      },
      marker: {
        show: false
      }
    }
  };
  const series = [20, 40, 30, 10];
  return <Card>
      <CardBody>
        <h4 className="header-title mb-3">Sales Status</h4>

        <div className="widget-chart text-center">
          <ReactApexChart type="pie" options={options} series={series} height={168} className="apex-charts mt-0" />

          <Row className="mt-3">
            <Col xs={4}>
              <ChartStatistics title="Target" stats="$982" />
            </Col>
            <Col xs={4}>
              <ChartStatistics title="Last week" stats="$525" />
            </Col>
            <Col xs={4}>
              <ChartStatistics title="Last Month" stats="$937" />
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>;
};
export default StatisticsChartWidget4;