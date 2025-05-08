import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Card, CardBody } from "react-bootstrap";
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = () => {
  // chart data
  const lineChartData = {
    labels: ["Direct", "Affilliate", "Sponsored", "E-mail"],
    datasets: [{
      data: [300, 135, 48, 154],
      backgroundColor: ["#3bafda", "#1abc9c", "#f7b84b", "#e3eaef"],
      borderColor: "transparent"
    }]
  };

  // chart options
  const lineChartOpts = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };
  return <Card>
            <CardBody>
                <h4 className="header-title">Pie Chart</h4>
                <div style={{
        height: "350px"
      }} className="mt-4 chartjs-chart">
                    <Pie data={lineChartData} options={lineChartOpts} />
                </div>
            </CardBody>
        </Card>;
};
export default PieChart;