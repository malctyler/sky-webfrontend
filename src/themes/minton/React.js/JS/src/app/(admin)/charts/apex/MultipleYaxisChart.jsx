// components
import { multiYaxisChartData } from "@/app/(admin)/charts/apex/data";
import { Card } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
const MultipleYaxisChart = () => {
  const options = {
    chart: {
      height: 380,
      type: "line",
      stacked: false,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [0, 0, 3]
    },
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
    },
    colors: ["#3bafda", "#ebf2f6", "#f672a7"],
    yaxis: [{
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#675db7"
      },
      labels: {
        style: {
          colors: ["#675db7"]
        }
      },
      title: {
        text: "Income (thousand crores)"
      }
    }, {
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#23b397"
      },
      labels: {
        style: {
          colors: ["#23b397"]
        },
        offsetX: 10
      },
      title: {
        text: "Operating Cashflow (thousand crores)"
      }
    }, {
      opposite: true,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#e36498"
      },
      labels: {
        style: {
          colors: ["#e36498"]
        }
      },
      title: {
        text: "Revenue (thousand crores)"
      }
    }],
    tooltip: {
      followCursor: true,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y + " thousand crores";
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
    },
    legend: {
      offsetY: 7
    }
  };
  const series = [{
    name: "Income",
    type: "column",
    data: multiYaxisChartData.data1
  }, {
    name: "Cashflow",
    type: "column",
    data: multiYaxisChartData.data2
  }, {
    name: "Revenue",
    type: "line",
    data: multiYaxisChartData.data3
  }];
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Multiple Y-Axis Chart</h5>
                <div className="pt-3">
                    <ReactApexChart options={options} series={series} height={380} type="line" />
                </div>
            </Card.Body>
        </Card>;
};
export default MultipleYaxisChart;