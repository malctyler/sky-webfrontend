// components
import { scatterChartData } from "@/app/(admin)/charts/apex/data";
import { Card } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
const ScatterChart = () => {
  const options = {
    chart: {
      height: 380,
      type: "scatter",
      zoom: {
        enabled: false
      }
    },
    colors: ["#1abc9c", "#f672a7", "#6c757d"],
    xaxis: {
      tickAmount: 10
    },
    yaxis: {
      tickAmount: 7
    },
    grid: {
      borderColor: "#f1f3fa",
      padding: {
        bottom: 10
      }
    },
    legend: {
      offsetY: 7
    }
  };
  const series = [{
    name: "Sample A",
    data: scatterChartData.data1
  }, {
    name: "Sample B",
    data: scatterChartData.data2
  }, {
    name: "Sample C",
    data: scatterChartData.data3
  }];
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Scatter (XY) Chart</h5>
                <div className="pt-3">
                    <ReactApexChart options={options} series={series} type="scatter" height={380} />
                </div>
            </Card.Body>
        </Card>;
};
export default ScatterChart;