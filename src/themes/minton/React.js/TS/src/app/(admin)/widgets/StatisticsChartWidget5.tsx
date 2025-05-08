

import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

// components
import { ChartStatistics } from "@/components";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const StatisticsChartWidget5 = () => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
      width: [1],
    },
    grid: {
      padding: {
        left: -9,
        right: 0,
      },
    },
    fill: {
      type: "solid",
    },
    colors: ["#f672a7", "#3bafda"],
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  const series = [
    {
      type: "line",
      data: [0, 23, 43, 35, 44, 45, 56, 37, 40],
    },
    {
      type: "line",
      data: [25, 23, 26, 24, 25, 32, 30, 24, 19],
    },
  ];

  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">Total Revenue</h4>

        <div className="widget-chart text-center">
          <ReactApexChart
            type="line"
            options={options}
            series={series}
            height={165}
            className="apex-charts mt-0"
          />

          <Row className="mt-3">
            <Col xs={4}>
              <ChartStatistics title="Target" stats="$943" />
            </Col>
            <Col xs={4}>
              <ChartStatistics title="Last week" stats="$624" />
            </Col>
            <Col xs={4}>
              <ChartStatistics title="Last Month" stats="$904" />
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatisticsChartWidget5;
