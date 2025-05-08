import { Card } from "react-bootstrap";
import { bubbleChartData } from "@/app/(admin)/charts/apex/data";
import ReactApexChart from "react-apexcharts";
const BubbleChart = () => {
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
    colors: ["#3bafda", "#1abc9c", "#f672a7"],
    fill: {
      opacity: 0.8
    },
    xaxis: {
      tickAmount: 12,
      type: "category"
    },
    yaxis: {
      max: 70
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
    name: "Bubble 1",
    data: bubbleChartData.data1 || []
  }, {
    name: "Bubble 2",
    data: bubbleChartData.data2 || []
  }, {
    name: "Bubble 3",
    data: bubbleChartData.data3 || []
  }];
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Simple Bubble Chart</h5>
                <div className="pt-3">
                    <ReactApexChart options={options} series={series} type="bubble" height={380} />
                </div>
            </Card.Body>
        </Card>;
};
export default BubbleChart;