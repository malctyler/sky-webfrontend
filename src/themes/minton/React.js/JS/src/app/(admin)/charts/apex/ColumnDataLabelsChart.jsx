import { Card } from "react-bootstrap";
import { columnChartData } from "@/app/(admin)/charts/apex/data";
import ReactApexChart from "react-apexcharts";
const ColumnDataLabelsChart = () => {
  const options = {
    chart: {
      height: 380,
      type: "bar",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top" // top, center, bottom
        }
      }
    },
    colors: ["#3bafda"],
    dataLabels: {
      enabled: true,
      formatter: val => {
        return val + "%";
      },
      offsetY: -30,
      style: {
        fontSize: "12px",
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      position: "top",
      labels: {
        offsetY: -18
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      tooltip: {
        enabled: true,
        offsetY: -35
      }
    },
    fill: {
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100]
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        formatter: val => {
          return val + "%";
        }
      }
    },
    title: {
      text: "Monthly Inflation in Argentina, 2002",
      floating: true,
      offsetY: 350,
      align: "center",
      style: {
        color: "#444"
      }
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"],
        // takes an array which will be repeated on columns
        opacity: 0.2
      },
      borderColor: "#f1f3fa"
    }
  };
  const series = [{
    name: "Inflation",
    data: columnChartData.data || []
  }];
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Column Chart with Datalabels</h5>
                <div className="pt-3">
                    <ReactApexChart options={options} series={series} type="bar" height={380} />
                </div>
            </Card.Body>
        </Card>;
};
export default ColumnDataLabelsChart;