

import {Card} from "react-bootstrap";

import {radarChartData} from "@/app/(admin)/charts/apex/data";

import ReactApexChart from "react-apexcharts";

const RadialBarChart = () => {

    return (

        <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Basic RadialBar Chart</h5>
                <div className="pt-3">
                    <ReactApexChart
                        options={radarChartData}
                        series={radarChartData.series}
                        type="radialBar"
                        height={350}
                        
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default RadialBarChart;
