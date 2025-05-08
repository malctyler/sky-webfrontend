import { Card } from "react-bootstrap";
import { gradientDonutChartData } from "@/app/(admin)/charts/apex/data";
import ReactApexChart from "react-apexcharts";
const DonutChart = () => {
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Gradient Donut Chart</h5>
                <div className="pt-3">
                    <ReactApexChart options={gradientDonutChartData} series={gradientDonutChartData.series} type="donut" height={320} />
                </div>
            </Card.Body>
        </Card>;
};
export default DonutChart;