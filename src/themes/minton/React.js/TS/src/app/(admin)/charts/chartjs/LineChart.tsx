

import {Line} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { Card } from "react-bootstrap";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const LineChart = () => {
    // chart data
    const lineChartData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Current Week",
                backgroundColor: "rgba(59,175,218,0.3)",
                borderColor: "rgb(59,175,218)",
                data: [32, 42, 42, 62, 52, 75, 62],
                tension: 0.4,
                fill: {
                    target: "origin",
                    above: "rgba(59,175,218,0.3)",
                },
            },
            {
                label: "Previous Week",
                fill: true,
                backgroundColor: "transparent",
                borderColor: "#f672a7",
                borderDash: [5, 5],
                data: [42, 58, 66, 93, 82, 105, 92],
                tension: 0.4,
            },
        ],
    };

    // chart options
    const lineChartOpts = {
        bezierCurve: false,
        maintainAspectRatio: false,
        hover: {
            intersect: true,
        },
        plugins: {
            filler: {
                propagate: false,
            },
            legend: {
                display: false,
            },
            tooltip: {
                intersect: false,
            },
        },
        zeroLineColor: () => "rgba(150, 150, 150, 0.9)",
        scales: {
            x: {
                display: true,
                grid: {
                    color: () => "rgba(150, 150, 150, 0.1)",
                    drawBorder: false,
                },
            },
            y: {
                ticks: {
                    stepSize: 20,
                },
                display: true,
                borderDash: [5, 5],
                grid: {
                    color: () => "rgba(0,0,0,0)",
                    drawBorder: false,
                    fontColor: "#fff",
                },
            },
        },
    };

    return (
        <Card>
            <Card>
                <h4 className="header-title">Line Chart</h4>
                <div style={{height: "350px"}} className="mt-4 chartjs-chart">
                    <Line data={lineChartData} options={lineChartOpts}/>
                </div>
            </Card>
        </Card>
    );
};

export default LineChart;
