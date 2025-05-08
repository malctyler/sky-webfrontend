import { Card } from "react-bootstrap";
import { multiRadarChartData } from "@/app/(admin)/charts/apex/data";
import ReactApexChart from "react-apexcharts";
const RadialBarMultipleChart = () => {
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Multiple RadialBars</h5>
                <div className="pt-3">
                    <ReactApexChart options={multiRadarChartData} series={multiRadarChartData.series} type="radialBar" height={350} />
                </div>
            </Card.Body>
        </Card>;
};
export default RadialBarMultipleChart;