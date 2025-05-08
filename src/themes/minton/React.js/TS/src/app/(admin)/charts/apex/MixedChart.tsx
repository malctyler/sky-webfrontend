

import {ApexOptions} from "apexcharts";
import {Card} from "react-bootstrap";

import {mixedChart1Data} from "@/app/(admin)/charts/apex/data";

import ReactApexChart from "react-apexcharts";

// Mixed chart
const MixedChart = () => {
    // default options
    const apexMixedOpts: ApexOptions = {
        chart: {
            height: 380,
            type: "line",
        },
        stroke: {
            width: [2],
            curve: "smooth",
        },
        fill: {
            type: "solid",
            opacity: [0.35, 1],
        },
        colors: ["#CED4DC", "#3bafda"],
        labels: [
            "Dec 01",
            "Dec 02",
            "Dec 03",
            "Dec 04",
            "Dec 05",
            "Dec 06",
            "Dec 07",
            "Dec 08",
            "Dec 09 ",
            "Dec 10",
            "Dec 11",
        ],
        markers: {
            size: 0,
        },
        legend: {
            offsetY: 7,
        },
        yaxis: [
            {
                title: {
                    text: "Series A",
                },
            },
            {
                opposite: true,
                title: {
                    text: "Series B",
                },
            },
        ],
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;
                },
            },
        },
    };

    // chart data
    const apexMixedData = [
        {
            name: "Team A",
            type: "area",
            data: mixedChart1Data.data1 || [],
        },
        {
            name: "Team B",
            type: "line",
            data: mixedChart1Data.data2 || [],
        },
    ];

    return (
        <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Mixed Chart - Line & Area</h5>
                <div className="pt-3">
                    <ReactApexChart
                        options={apexMixedOpts}
                        series={apexMixedData}
                        type="line"
                        height={380}
                        
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default MixedChart;
