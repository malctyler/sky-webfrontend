

import {Card} from "react-bootstrap";

import {patternedDonutChartData} from "@/app/(admin)/charts/apex/data";

import ReactApexChart from "react-apexcharts";

const DonutPatternedChart = () => {

    return (
        <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Patterned Donut Chart</h5>
                <div className="pt-3">
                    <ReactApexChart
                        options={patternedDonutChartData}
                        series={patternedDonutChartData.series}
                        type="donut"
                        height={320}
                        
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default DonutPatternedChart;
