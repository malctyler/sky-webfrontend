

import {ApexOptions} from "apexcharts";
import {Card} from "react-bootstrap";

import ReactApexChart from "react-apexcharts";

// simple line chart
const LineChart = () => {
    // default options
    const apexLineChartWithLables: ApexOptions = {
        chart: {
            height: 380,
            type: "line",
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#3bafda", "#1abc9c"],
        stroke: {
            width: [3, 3],
            curve: "smooth",
        },
        title: {
            text: "Average High & Low Temperature",
            align: "left",
            style: {
                fontSize: "14px",
                color: "#666",
            },
        },
        grid: {
            row: {
                colors: ["transparent", "transparent"],
                opacity: 0.2,
            },
            borderColor: "#f1f3fa",
        },
        markers: {
            size: 6,
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            title: {
                text: "Month",
            },
        },
        yaxis: {
            title: {
                text: "Temperature",
            },
            min: 5,
            max: 40,
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    };

    // chart data
    const apexLineChartWithLablesData = [
        {
            name: "High - 2018",
            data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
            name: "Low - 2018",
            data: [12, 11, 14, 18, 17, 13, 13],
        },
    ];

    return (
        <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Line with Data Labels</h5>
                <div className="pt-3">
                    <ReactApexChart
                        options={apexLineChartWithLables}
                        series={apexLineChartWithLablesData}
                        type="line"
                        height={380}

                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default LineChart;
