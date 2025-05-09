import { Card } from "react-bootstrap";
import { mixedChart2Data } from "@/app/(admin)/charts/apex/data";
import ReactApexChart from "react-apexcharts";
const LineColumnAreaChart = () => {
  const options = {
    chart: {
      height: 380,
      type: "line",
      // padding: {
      //     right: 0,
      //     left: 0
      // },
      stacked: false,
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: [0, 2, 4],
      curve: "smooth"
    },
    plotOptions: {
      bar: {
        columnWidth: "50%"
      }
    },
    colors: ["#3bafda", "#1abc9c", "#f672a7"],
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: ["01/01/2003", "02/01/2003", "03/01/2003", "04/01/2003", "05/01/2003", "06/01/2003", "07/01/2003", "08/01/2003", "09/01/2003", "10/01/2003", "11/01/2003"],
    markers: {
      size: 0
    },
    legend: {
      offsetY: 7
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      title: {
        text: "Points"
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        }
      }
    },
    grid: {
      borderColor: "#f1f3fa",
      padding: {
        bottom: 10
      }
    }
  };
  const series = [{
    name: "Team A",
    type: "column",
    data: mixedChart2Data.data1 || []
  }, {
    name: "Team B",
    type: "area",
    data: mixedChart2Data.data2 || []
  }, {
    name: "Team C",
    type: "line",
    data: mixedChart2Data.data3 || []
  }];
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Line, Column & Area Chart</h5>
                <div className="pt-3">
                    <ReactApexChart options={options} series={series} type="line" height={380} />
                </div>
            </Card.Body>
        </Card>;
};
export default LineColumnAreaChart;