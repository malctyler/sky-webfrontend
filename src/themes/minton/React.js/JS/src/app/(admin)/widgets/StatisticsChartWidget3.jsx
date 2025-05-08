import ReactApexChart from "react-apexcharts";
// components
import { ChartStatistics } from "@/components";
import { Card, CardBody, Col, Row } from "react-bootstrap";
const StatisticsChartWidget3 = () => {
  const apexOpts = {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        columnWidth: "65%"
      }
    },
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    stroke: {
      width: 0,
      curve: "smooth"
    },
    colors: ["#3bafda"],
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
  const apexData = [{
    data: [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12]
  }];
  return <Card>
      <CardBody>
        <h4 className="header-title mb-3">Sales Status</h4>

        <div className="widget-chart text-center">
          <ReactApexChart options={apexOpts} series={apexData} type="bar" height={165} width={250} className="apex-charts mt-0" />
          <Row className="mt-3">
            <Col xs={4}>
              <ChartStatistics title="Target" stats="$825" />
            </Col>
            <Col xs={4}>
              <ChartStatistics title="Last week" stats="$423" />
            </Col>
            <Col xs={4}>
              <ChartStatistics title="Last Month" stats="$806" />
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>;
};
export default StatisticsChartWidget3;