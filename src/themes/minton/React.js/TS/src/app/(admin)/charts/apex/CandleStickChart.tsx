

import {ApexOptions} from "apexcharts";
import {Card} from "react-bootstrap";

import {candleStickChartData1} from "@/app/(admin)/charts/apex/data";

import ReactApexChart from "react-apexcharts";

const CandleStickChart = () => {
    const options: ApexOptions = {
        chart: {
            height: 400,
            type: "candlestick",
            toolbar: {
                show: false,
            },
        },
        colors: ["#3bafda", "#1abc9c"],
        plotOptions: {
            candlestick: {
                colors: {
                    upward: "#3bafda",
                    downward: "#1abc9c",
                },
            },
        },
        stroke: {
            show: true,
            colors: ["#f1f3fa"],
            width: 1,
        },
        xaxis: {
            type: "datetime",
        },
        grid: {
            borderColor: "#f1f3fa",
        },
    };

    const series = [
        {
            data: candleStickChartData1.data || [],
        },
    ];

    return (
        <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Simple Candlestick Chart</h5>
                <div className="pt-3">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="candlestick"
                        height={400}
                        
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default CandleStickChart;
