import { threeDBubbleChartData } from "@/app/(admin)/charts/apex/data";
import { Card } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
const ThreeDBubbleChart = () => {
  const options = {
    chart: {
      height: 380,
      type: "bubble",
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "gradient"
    },
    xaxis: {
      tickAmount: 12,
      type: "datetime",
      labels: {
        rotate: 0
      }
    },
    colors: ["#3bafda", "#1abc9c", "#6559cc", "#f672a7"],
    yaxis: {
      max: 70
    },
    legend: {
      offsetY: 7
    },
    grid: {
      borderColor: "#f1f3fa",
      padding: {
        bottom: 10
      }
    }
  };
  const series = [{
    name: "Product 1",
    data: threeDBubbleChartData.data1 || []
  }, {
    name: "Product 2",
    data: threeDBubbleChartData.data2 || []
  }, {
    name: "Product 3",
    data: threeDBubbleChartData.data3 || []
  }, {
    name: "Product 4",
    data: threeDBubbleChartData.data4 || []
  }];
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">3D Bubble Chart</h5>
                <div className="pt-3">
                    <ReactApexChart options={options} series={series} type="bubble" height={380} />
                </div>
            </Card.Body>
        </Card>;
};
export default ThreeDBubbleChart;