import { Card } from "react-bootstrap";
import { stackedAreaChartData } from "@/app/(admin)/charts/apex/data";
import ReactApexChart from "react-apexcharts";

// StackedAreaChart
const StackedAreaChart = () => {
  // default options
  const apexAreaChart2Opts = {
    chart: {
      id: "apexchart",
      height: 380,
      type: "area",
      stacked: true,
      events: {
        selection: function (_chart, e) {
          console.log(new Date(e.xaxis.min));
        }
      }
    },
    colors: ["#3bafda", "#1abc9c", "#CED4DC"],
    stroke: {
      width: 2,
      curve: "smooth"
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8
      }
    },
    legend: {
      position: "top",
      horizontalAlign: "left"
    },
    xaxis: {
      type: "datetime"
    }
  };

  // chart data
  const apexAreaChart2Data = [{
    name: "South",
    data: stackedAreaChartData.data1 || []
  }, {
    name: "North",
    data: stackedAreaChartData.data2 || []
  }, {
    name: "Central",
    data: stackedAreaChartData.data3 || []
  }];
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Stacked Area</h5>
                <div className="pt-3">
                    <ReactApexChart options={apexAreaChart2Opts} series={apexAreaChart2Data} type="area" height={380} />
                </div>
            </Card.Body>
        </Card>;
};
export default StackedAreaChart;