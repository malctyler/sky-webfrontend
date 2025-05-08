

import {ApexOptions} from "apexcharts";
import {Card} from "react-bootstrap";


import ReactApexChart from "react-apexcharts";

const colors1 = ["#3e60d5", "#6c757d", "#47ad77", "#fa5c7c", "#e3eaef"];

const PieChart = () => {
    const SimplePieOpt: ApexOptions = {
        chart: {
            height: 320,
            type: "pie",
        },
        series: [44, 55, 41, 17, 15],
        labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
        colors: colors1,
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            // verticalAlign: "middle",
            floating: false,
            fontSize: "14px",
            offsetX: 0,
            offsetY: 7,
        }
    };


    return (
        <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Basic bar chart</h5>
                <div className="pt-3">
                    <ReactApexChart
                        options={SimplePieOpt}
                        series={SimplePieOpt.series}
                        type="pie"
                        height={320}
                        
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default PieChart;
