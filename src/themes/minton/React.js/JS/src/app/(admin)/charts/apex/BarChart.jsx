import { Card } from "react-bootstrap";
import { basicBarChartData } from "@/app/(admin)/charts/apex/data";
import ReactApexChart from "react-apexcharts";
const BarChart = () => {
  const options = {
    chart: {
      height: 380,
      type: "bar",
      toolbar: {
        show: false
      }
    },
    colors: ["#1abc9c"],
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    states: {
      hover: {
        filter: {
          type: "none"
        }
      }
    },
    grid: {
      borderColor: "#f1f3fa"
    },
    xaxis: {
      categories: ["South Korea", "Canada", "United Kingdom", "Netherlands", "Italy", "France", "Japan", "United States", "China", "Germany"]
    }
  };
  const series = [{
    data: basicBarChartData.data
  }];
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Basic bar chart</h5>
                <div className="pt-3">
                    <ReactApexChart options={options} series={series} type="bar" height={380} />
                </div>
            </Card.Body>
        </Card>;
};
export default BarChart;