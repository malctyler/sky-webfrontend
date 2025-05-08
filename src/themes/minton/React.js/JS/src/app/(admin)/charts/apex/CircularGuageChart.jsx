import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { gaugeChartData } from "@/app/(admin)/charts/apex/data";
const CircularGuageChart = () => {
  return <Card>
        <Card.Body>
          <h5 className="header-title mb-0">Stroked Circular Guage</h5>
          <div className="pt-3">
            <ReactApexChart options={gaugeChartData} series={gaugeChartData.series} type="radialBar" height={375} />
          </div>
        </Card.Body>
      </Card>;
};
export default CircularGuageChart;