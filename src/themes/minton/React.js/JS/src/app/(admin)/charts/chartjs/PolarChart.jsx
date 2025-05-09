import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { Card, CardBody } from "react-bootstrap";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const PolarChart = () => {
  // chart data
  const polarChartData = {
    labels: ["Direct", "Affilliate", "Sponsored", "E-mail"],
    datasets: [{
      data: [251, 135, 48, 154],
      backgroundColor: ["#3bafda", "#f7b84b", "#1abc9c", "#e3eaef"],
      borderColor: "transparent"
    }]
  };

  // default options
  const polarChartOpts = {
    maintainAspectRatio: false,
    scales: {
      r: {
        ticks: {
          backdropColor: "transparent"
        },
        angleLines: {
          color: "rgba(150, 150, 150, 0.1)" // lines radiating from the center
        },
        grid: {
          color: "rgba(150, 150, 150, 0.1)"
        }
      }
    }
  };
  return <Card>
      <CardBody>
        <h4 className="header-title">Polar area Chart</h4>

        <div className="mt-4 chartjs-chart" style={{
        height: "350px"
      }}>
          <PolarArea data={polarChartData} options={polarChartOpts} />
        </div>
      </CardBody>
    </Card>;
};
export default PolarChart;