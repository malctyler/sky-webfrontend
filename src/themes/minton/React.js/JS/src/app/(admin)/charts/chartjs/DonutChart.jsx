import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardBody } from "react-bootstrap";
ChartJS.register(ArcElement, Tooltip, Legend);
const DonutChart = () => {
  // chart data
  const donutChartData = {
    labels: ["Direct", "Affilliate", "Sponsored"],
    datasets: [{
      data: [128, 78, 48],
      backgroundColor: ["#3bafda", "#1abc9c", "#e3eaef"],
      borderColor: "transparent"
    }]
  };

  // default options
  const donutChartOpts = {
    maintainAspectRatio: false,
    cutoutPercentage: 60,
    plugins: {
      legend: {
        display: false
      }
    }
  };
  return <Card>
      <CardBody>
        <h4 className="header-title">Donut Chart</h4>

        <div className="mt-4 chartjs-chart" style={{
        height: "350px"
      }}>
          <Doughnut data={donutChartData} options={donutChartOpts} />
        </div>
      </CardBody>
    </Card>;
};
export default DonutChart;